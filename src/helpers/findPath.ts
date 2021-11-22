import * as Phaser from 'phaser';

const toKey = (x: number, y: number) => `${x}x${y}`;
const fromKey = (key: string) => [+key.split('x')[0], +key.split('x')[1]];

// For better understanding, check out the Breath-first search algorithm
const findPath = (
  startCoords: { x: number, y: number },
  targetCoords: { x: number, y: number },
  groundLayer: Phaser.Tilemaps.TilemapLayer,
  wallsLayer: Phaser.Tilemaps.TilemapLayer,
) => {
  const startTile = groundLayer.worldToTileXY(startCoords.x, startCoords.y);
  const startKey = toKey(startTile.x, startTile.y);
  const targetTile = groundLayer.worldToTileXY(targetCoords.x, targetCoords.y);
  const targetKey = toKey(targetTile.x, targetTile.y);

  // check if the selected tile is a valid ground tile for the object to walk on
  if (!groundLayer.getTileAt(targetTile.x, targetTile.y)) {
    console.error(`Cant find path between ${startKey} and ${targetKey} - target is not walkable`);
    return [];
  }

  if (wallsLayer.getTileAt(targetTile.x, targetTile.y)) {
    console.error(`Cant find path between ${startKey} and ${targetKey} - target is a wall`);
    return [];
  }

  let queue: string[] = [];
  const parentForKey: { [key: string]: string } = {};

  queue.push(startKey);

  while (queue.length > 0) {
    const currentKey = queue.shift();
    const [x, y] = fromKey(currentKey);

    const neighbors = [
      { x, y: y - 1 }, // top
      { x: x + 1, y }, // right
      { x, y: y + 1 }, // bottom
      { x: x - 1, y }, // left
    ];

    for (let i = 0; i < neighbors.length; i += 1) {
      const neighbor = neighbors[i];
      const neighborKey = toKey(neighbor.x, neighbor.y);
      const isNeighborGround = !!groundLayer.getTileAt(neighbor.x, neighbor.y);
      const isNeighborWall = !!wallsLayer.getTileAt(neighbor.x, neighbor.y);
      const isNeighborAlreadyChecked = !!parentForKey[neighborKey];

      if (isNeighborGround && !isNeighborWall && !isNeighborAlreadyChecked) {
        parentForKey[neighborKey] = currentKey;
        if (neighborKey === targetKey) {
          // we found the target, meaning that we have all what we need, lets drop the queue and continue
          queue = [];
        } else {
          queue.push(neighborKey);
        }
      }
    }
  }

  if (!parentForKey[targetKey]) {
    console.error(`Cant find path between ${startKey} and ${targetKey}`);
    return [];
  }

  let currentKey = targetKey;
  const path = [];

  while (currentKey !== startKey) {
    const [x, y] = fromKey(currentKey);
    const pos = groundLayer.tileToWorldXY(+x, +y);
    pos.x += groundLayer.tilemap.tileWidth * 0.5;
    pos.y += groundLayer.tilemap.tileHeight * 0.5;
    path.push({ x: pos.x, y: pos.y });
    currentKey = parentForKey[currentKey];
  }

  return path.reverse();
};

export default findPath;
