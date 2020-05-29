export default function drawLine(scene: Phaser.Scene, startX: number, startY: number, endX: number, endY: number) {
    const arrowGraphics = scene.add.graphics();
    const headLength = 20;
    const dx = endX - startX;
    const dy = endY - startY;
    const angle = Math.atan2(dy, dx);
    arrowGraphics.lineStyle(3, 0x000000, 1);
    arrowGraphics.lineBetween(startX, startY,endX, endY);
    arrowGraphics.lineBetween(endX, endY,endX - headLength * Math.cos(angle - Math.PI / 6), endY - headLength * Math.sin(angle - Math.PI / 6));
    arrowGraphics.lineBetween(endX, endY,endX - headLength * Math.cos(angle + Math.PI / 6), endY - headLength * Math.sin(angle + Math.PI / 6));
}
