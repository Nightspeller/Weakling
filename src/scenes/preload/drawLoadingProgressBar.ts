import { Scene } from 'phaser';
import { GAME_H, GAME_W } from '../../config/constants';

export default function drawLoadingProgressBar(preloadScene: Scene) {
  const progressBarWidth = GAME_W / 2.5;
  const progressBarHeight = GAME_H / 10;
  const progressBarX = (GAME_W - progressBarWidth) / 2;
  const progressBarY = (GAME_H - progressBarHeight) / 2;
  const progressBar = preloadScene.add.graphics();
  const progressBox = preloadScene.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

  const loadingText = preloadScene.make.text({
    x: GAME_W / 2,
    y: GAME_H / 2 - 70,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      color: '#ffffff',
    },
  })
    .setOrigin(0.5, 0.5);

  const percentText = preloadScene.make.text({
    x: GAME_W / 2,
    y: GAME_H / 2,
    text: '0%',
    style: {
      font: '18px monospace',
      color: '#ffffff',
    },
  })
    .setOrigin(0.5, 0.5);

  const assetText = preloadScene.make.text({
    x: GAME_W / 2,
    y: GAME_H / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      color: '#ffffff',
    },
  })
    .setOrigin(0.5, 0.5);

  preloadScene.load.on('progress', (value: number) => {
    percentText.setText(`${Math.floor(value * 100)}%`);
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(progressBarX + 10, progressBarY + 10, (progressBarWidth - 20) * value, progressBarHeight - 20);
  });

  preloadScene.load.on('fileprogress', (file: any) => {
    assetText.setText(`Loading asset: ${file.key}`);
  });

  preloadScene.load.on('complete', () => {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
  });
}
