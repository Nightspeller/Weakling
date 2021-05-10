import BattleScene from './battle';
import GeneralCharacter from '../../characters/generalCharacter';
import Adventurer from '../../characters/adventurers/adventurer';
import { BATTLE_CHAR_WIDTH } from '../../config/constants';
import { SpriteParameters } from '../../types/my-types';

function getTargetCoords(battleScene: BattleScene, attacker: GeneralCharacter, targets: GeneralCharacter[]) {
  const isAnimatingAdventurer = attacker instanceof Adventurer;
  if (targets.length === 1) {
    const targetDrawer = battleScene.charToDrawerMap.get(targets[0]);
    return {
      x: targetDrawer.position.x + (isAnimatingAdventurer ? -BATTLE_CHAR_WIDTH : BATTLE_CHAR_WIDTH),
      y: targetDrawer.position.y,
    };
  }
  if (attacker instanceof Adventurer) {
    return { x: 600, y: 320 };
  }
  return { x: 200, y: 320 };
}

function animateHitOnTargets(battleScene: BattleScene, targets: GeneralCharacter[], succeeded: boolean[]) {
  return Promise.all(targets.map(async (target, index: number) => {
    const targetDrawer = battleScene.charToDrawerMap.get(target);
    if (succeeded[index]) {
      if (target.isAlive === false) {
        await targetDrawer.playHitAnimation();
        return targetDrawer.playDeathAnimation();
      }
      return targetDrawer.playHitAnimation();
    }
    return targetDrawer.playMissAnimation();
  }));
}

export async function animateMeleeSequence(
  battleScene: BattleScene, attacker: GeneralCharacter, targets: GeneralCharacter[], succeeded: boolean[], type: 'meleeAttack' | 'meleeCast',
) {
  const targetCoords = getTargetCoords(battleScene, attacker, targets);
  const attackerDrawer = battleScene.charToDrawerMap.get(attacker);
  await attackerDrawer.playMoveAnimation(targetCoords.x, targetCoords.y);
  if (type === 'meleeAttack') {
    await attackerDrawer.playMeleeAttackAnimation();
  } else {
    await attackerDrawer.playMeleeCastAnimation();
  }
  await Promise.all([
    animateHitOnTargets(battleScene, targets, succeeded),
    attackerDrawer.playMoveAnimation(attackerDrawer.position.x, attackerDrawer.position.y),
  ]);
  if (!attacker.isAlive) {
    await attackerDrawer.playDeathAnimation();
  }
}

export async function animateRangedSequence(
  battleScene: BattleScene, attacker: GeneralCharacter, targets: GeneralCharacter[], succeeded: boolean[], projectile: SpriteParameters, type: 'rangedAttack' | 'rangedCast',
) {
  const targetCoords = getTargetCoords(battleScene, attacker, targets);
  const attackerDrawer = battleScene.charToDrawerMap.get(attacker);
  if (type === 'rangedAttack') {
    await attackerDrawer.playRangedAttackAnimation();
  } else {
    await attackerDrawer.playRangedCastAnimation();
  }
  await attackerDrawer.playRangedProjectileAnimation(targetCoords.x, targetCoords.y, projectile);
  await animateHitOnTargets(battleScene, targets, succeeded);
  if (!attacker.isAlive) {
    await attackerDrawer.playDeathAnimation();
  }
}

export async function animateBuffSequence(
  // eslint-disable-next-line no-unused-vars
  battleScene: BattleScene, attacker: GeneralCharacter, targets: GeneralCharacter[], succeeded: boolean[], type: 'physicalBuff' | 'castBuff',
) {
  const attackerDrawer = battleScene.charToDrawerMap.get(attacker);
  await attackerDrawer.playCastBuffAnimation();
}
