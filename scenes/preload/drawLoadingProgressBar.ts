import {Scene} from "phaser";

export function drawLoadingProgressBar(preloadScene: Scene) {
    const progressBar = preloadScene.add.graphics();
    const progressBox = preloadScene.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = preloadScene.cameras.main.width;
    const height = preloadScene.cameras.main.height;
    const loadingText = preloadScene.make.text({
        x: width / 2,
        y: height / 2 - 70,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            color: '#ffffff'
        }
    }).setOrigin(0.5, 0.5);

    const percentText = preloadScene.make.text({
        x: width / 2,
        y: height / 2 - 25,
        text: '0%',
        style: {
            font: '18px monospace',
            color: '#ffffff'
        }
    }).setOrigin(0.5, 0.5);

    const assetText = preloadScene.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
            font: '18px monospace',
            color: '#ffffff'
        }
    }).setOrigin(0.5, 0.5);

    preloadScene.load.on('progress', function (value) {
        percentText.setText(Math.floor(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });

    preloadScene.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
    });

    preloadScene.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
    });
}
