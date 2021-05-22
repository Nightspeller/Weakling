/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-903cc191'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/audio/fishing/fishing-bait.ogg",
    "revision": "486b022fdb020e14c527b3da772aac8a"
  }, {
    "url": "assets/audio/fishing/fishing-missed.wav",
    "revision": "154d2ee6bedf3334dfd1f6d7ab028ff5"
  }, {
    "url": "assets/audio/fishing/fishing-success.wav",
    "revision": "35f94ea9f728fdc346ff660f145bda8f"
  }, {
    "url": "assets/audio/intro.ogg",
    "revision": "66579eb675dc2281ac5c33c88bfc4f30"
  }, {
    "url": "assets/audio/labyrinth-of-lost-dreams.mp3",
    "revision": "3e8480c7aa42ce5bd68e661a8a411f58"
  }, {
    "url": "assets/audio/ui/paper-scroll-close.wav",
    "revision": "e77d86d20f5b9c4893d0547f46001438"
  }, {
    "url": "assets/audio/ui/paper-scroll-open.wav",
    "revision": "1c8600bf33ba5574a588ecae5b99c227"
  }, {
    "url": "assets/bitmap-fonts/bitmapArial16.fnt",
    "revision": "440a57f77e5525f3f629c6fd32ba2baf"
  }, {
    "url": "assets/bitmap-fonts/bitmapArial16.png",
    "revision": "b84c6ab532b097d01ef2825f13a77a1d"
  }, {
    "url": "assets/exported-maps/atmospheric-animations.json",
    "revision": "8c29ea6fe7770f18900b4fcfa8f92e5f"
  }, {
    "url": "assets/exported-maps/backCave.json",
    "revision": "5f61a2347d3447535adf6e11f92c9238"
  }, {
    "url": "assets/exported-maps/betweenVillageAndCaltor.json",
    "revision": "24caf9220573112b231545bb801e65cd"
  }, {
    "url": "assets/exported-maps/betweenVillageAndDungeon.json",
    "revision": "99aca89b537fac40412aded3345896f8"
  }, {
    "url": "assets/exported-maps/booksStore.json",
    "revision": "593b8e758019c15497f4610bd343fce8"
  }, {
    "url": "assets/exported-maps/caltor.json",
    "revision": "894d88db0e23106e07fe68458530613e"
  }, {
    "url": "assets/exported-maps/crypt.json",
    "revision": "d35ef37befd6f7398ef6eacd58bb6ebf"
  }, {
    "url": "assets/exported-maps/dungeon.json",
    "revision": "a1ea0db4d528b8a5af62f254dc66dcf3"
  }, {
    "url": "assets/exported-maps/dungeonLevel1.json",
    "revision": "f3713fe4e14e27212ba40c9a55f71a92"
  }, {
    "url": "assets/exported-maps/eldersCave.json",
    "revision": "8871e039f25a05c129f70e0df51d3d32"
  }, {
    "url": "assets/exported-maps/fight.json",
    "revision": "ef06a8dc74382ceb278e7a647dea3e6f"
  }, {
    "url": "assets/exported-maps/forest.json",
    "revision": "89da36fbb9345f6312ede1b5940369fd"
  }, {
    "url": "assets/exported-maps/greatPlains.json",
    "revision": "2a3c0ffd5bbfa0b63b6c685b34c0bf40"
  }, {
    "url": "assets/exported-maps/hargkakhsCave.json",
    "revision": "d8c3c4081ac1ed58249ebdff28370d20"
  }, {
    "url": "assets/exported-maps/hermitsTower.json",
    "revision": "343658448512d709280332ec2bbab754"
  }, {
    "url": "assets/exported-maps/honeywood.json",
    "revision": "3b2866be3837cb5b6537b39be161b482"
  }, {
    "url": "assets/exported-maps/house.json",
    "revision": "ddc6f03854c6a34cf53017bbfd175b80"
  }, {
    "url": "assets/exported-maps/interface.json",
    "revision": "723b12011ddee0510585cb4043fac8e8"
  }, {
    "url": "assets/exported-maps/nahkhasCave.json",
    "revision": "331d860a33017de0a0746b4c86b96abd"
  }, {
    "url": "assets/exported-maps/tavern.json",
    "revision": "b8eaf825c92c3cb037a0e330ffff5231"
  }, {
    "url": "assets/exported-maps/village.json",
    "revision": "d494742e5c354938a579ae61cdac9e9b"
  }, {
    "url": "assets/exported-maps/weaklingsCave.json",
    "revision": "f85234fbeccc21694252930742900eb3"
  }, {
    "url": "assets/exported-maps/windmill.json",
    "revision": "53c9e1eb9816b29f71c3c8de1dcd2bb6"
  }, {
    "url": "assets/images-extruded/animations/butterflies.json",
    "revision": "432501c98649ceda90f45a570d64a0e7"
  }, {
    "url": "assets/images-extruded/animations/butterflies.png",
    "revision": "f664de8d3d0a1a836ee5c910079f7e8c"
  }, {
    "url": "assets/images-extruded/animations/fire.png",
    "revision": "5fa56f1c3363c9cd1ad4da0f4e6719c6"
  }, {
    "url": "assets/images-extruded/animations/firefly.png",
    "revision": "9e7a213c1eecbd10bb949ecfd6eca58c"
  }, {
    "url": "assets/images-extruded/animations/paper-scrolls.json",
    "revision": "6fa97ec1e82d2598ab6b111b30f78058"
  }, {
    "url": "assets/images-extruded/animations/paper-scrolls.png",
    "revision": "0b5f452ad792001bd61c6ac2e968a596"
  }, {
    "url": "assets/images-extruded/animations/windmill.json",
    "revision": "3ee6d63bd3c959e688e673885428c144"
  }, {
    "url": "assets/images-extruded/animations/windmill.png",
    "revision": "b32a9f5d4bb06c05f41a840db8550255"
  }, {
    "url": "assets/images-extruded/characters/battle/enemies/rat/rat-battle.json",
    "revision": "8983616dfad047ebc3bedca38f8b17e4"
  }, {
    "url": "assets/images-extruded/characters/battle/enemies/rat/rat-battle.png",
    "revision": "8c8f89039c1962773f9df0d0c5940bef"
  }, {
    "url": "assets/images-extruded/characters/battle/party/weakling/weakling-battle-old.json",
    "revision": "8be015a7350979502cc3e8f95084dd44"
  }, {
    "url": "assets/images-extruded/characters/battle/party/weakling/weakling-battle-old.png",
    "revision": "d75c4ef3c4d888fc894f70360e15e933"
  }, {
    "url": "assets/images-extruded/characters/battle/party/weakling/weakling-battle.json",
    "revision": "5627425196d44b8b59c3902afc25808c"
  }, {
    "url": "assets/images-extruded/characters/battle/party/weakling/weakling-battle.png",
    "revision": "66ee7fa7e4b95569e07dfdf2e9b9a273"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/cat-1.png",
    "revision": "d2b95e26a0a12c240640cf4a3c814d56"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/cat-2.png",
    "revision": "c25781156588b77cf9fc6d81abe0f2e7"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/cat-3.png",
    "revision": "f140d03c65cdcf04526fe41122abb7f6"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/dog-1.png",
    "revision": "e687416bd413b134a3b269018c3bb347"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/dog-2.png",
    "revision": "6d758bcdab0915abcfbeed908a03a9d7"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/dog-3.png",
    "revision": "d3ee787c2270db223042e3bf9cffddd2"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female05-4.png",
    "revision": "73070516c1d1587fdfa16e2d7e1c4bfa"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female17-1.png",
    "revision": "471c1997dce47f5d392db8879134e496"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female17-2.png",
    "revision": "e5dd5f5e604ad2f8e85616b989c6e3db"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female18-4.png",
    "revision": "de4ecd2fbc0a2103c0da01edcdd4f1f8"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female19-1.png",
    "revision": "32b4726717fc3dc7a12dc34499cba2e5"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female19-3.png",
    "revision": "cf3bb790c45998728786c766a2d6b9a3"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female20-3.png",
    "revision": "086bdb2e569481efa177ff7e7832c0b1"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/female22-2.png",
    "revision": "93c754f88a52c7ee865a7afc36baa72a"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male10-1.png",
    "revision": "1babacf31d5c7ce666c30baf4e8f6751"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male10-2.png",
    "revision": "164f564fbaa180a65a44f80231cd5758"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male12-1.png",
    "revision": "6e1fa0e4c82ee8ab0ffbe639a45c3eb9"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male13-1.png",
    "revision": "ae603e8b1d5073ed5c5e18c624a17e64"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male14-2.png",
    "revision": "16082fbf9cca733b757a6ece6c32df16"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male16-1.png",
    "revision": "1891ab3dcd93758ff4034dceef77e37a"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male16-2.png",
    "revision": "6268962fbc6ca82b05b31e11220bead0"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male17-3.png",
    "revision": "88ed67cb9b9549f1d47b018901cc6f48"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male17-4.png",
    "revision": "e35a4383873b5222dd01318ae78dc440"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male3-1.png",
    "revision": "0dca3501a486cdbbceadbe432f2a3afc"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male9-1.png",
    "revision": "5537f3383bc3e13d01371604e3b28215"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male9-2.png",
    "revision": "1f45d11f773fe2ad5d5b089d18789322"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male9-3.png",
    "revision": "2d0c686a000f9ae81c20abeed22ea432"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/male9-4.png",
    "revision": "a971379b468d8ff0621227456f2e818c"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/soldier04-3.png",
    "revision": "4a8c997c6cfd439514f439194088fe8d"
  }, {
    "url": "assets/images-extruded/characters/world-map/neutral/soldier06-1.png",
    "revision": "ce7e79304d88bdca43d7e19989de76a6"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/jeremy-blond.png",
    "revision": "b8b1d9cc8f306acbe414ca998076b4de"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/jeremy-green-edit.png",
    "revision": "4029fd02e6654510d0328530ae64932f"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/jeremy-green.png",
    "revision": "6b649ac261242cc8d63424785f2ba9d3"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/jeremy-pink.png",
    "revision": "3e7166e9b244512a4930c6b9685ebd52"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/martha-blond.png",
    "revision": "3feef817c8c28ed254dc64b335452a80"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/martha-green.png",
    "revision": "4d53b90f5068d8a4898d62552c8a7db2"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/martha-pink.png",
    "revision": "8d03e4e6563a3cf3bd3c3acd8369668d"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/weakling-world.json",
    "revision": "efec8f7490f90992b97541b7b282ee63"
  }, {
    "url": "assets/images-extruded/characters/world-map/party/weakling-world.png",
    "revision": "6d5a96cf38945500734119288823b0ab"
  }, {
    "url": "assets/images-extruded/characters/world-map/shadows/shadow-1.png",
    "revision": "64021408fc0a89882a3e26f5552acd1d"
  }, {
    "url": "assets/images-extruded/interface/icon-farming-set.png",
    "revision": "657b392a62713e7ee87af3c9fa12f368"
  }, {
    "url": "assets/images-extruded/interface/icon-item-set.png",
    "revision": "aa59768e617de326db4263a02298dc3f"
  }, {
    "url": "assets/images-extruded/interface/interface-24x19.png",
    "revision": "3ec22bb96b778d5e70e01e6e09479108"
  }, {
    "url": "assets/images-extruded/interface/interface-tiles.png",
    "revision": "930fefca64725cba6ecdd17dcd031ba7"
  }, {
    "url": "assets/images-extruded/tilesets/base-addition.png",
    "revision": "d50e9e20dba2c7cef09fc34f91966266"
  }, {
    "url": "assets/images-extruded/tilesets/base.png",
    "revision": "523c247ccf981b243f18bfa9a24ffbfc"
  }, {
    "url": "assets/images-extruded/tilesets/castle.png",
    "revision": "b8af9ab9cb230a07a4efc3cb5a8d7408"
  }, {
    "url": "assets/images-extruded/tilesets/caves-decoration-animated-b.png",
    "revision": "367d2a63703c5e788a4cb4c860605ea6"
  }, {
    "url": "assets/images-extruded/tilesets/caves-grassland-entrance.png",
    "revision": "007dfdd79d5c0cf1a90b7f69a3c55e3e"
  }, {
    "url": "assets/images-extruded/tilesets/caves-marshland-entrance.png",
    "revision": "1ad07b5f14a3af4f70e483f9555798ea"
  }, {
    "url": "assets/images-extruded/tilesets/caves.png",
    "revision": "3b66244df40b6cd6d86d5c8e7c0813a2"
  }, {
    "url": "assets/images-extruded/tilesets/dirt1-dirt2.png",
    "revision": "fd852d814ee2f49b680611eba5deebd7"
  }, {
    "url": "assets/images-extruded/tilesets/dirt1.png",
    "revision": "870a8982508afd526d7c75f6022ff0ce"
  }, {
    "url": "assets/images-extruded/tilesets/dirt2.png",
    "revision": "373f37352fc0f85fbe7bba6f2051942b"
  }, {
    "url": "assets/images-extruded/tilesets/dirt3.png",
    "revision": "edf13368066a7c73973d64883c95415e"
  }, {
    "url": "assets/images-extruded/tilesets/dirt4.png",
    "revision": "60a1235a16c05871800f335f3da60836"
  }, {
    "url": "assets/images-extruded/tilesets/doors1.png",
    "revision": "027a70c5d23d8ce5ddc47df41f6b76f9"
  }, {
    "url": "assets/images-extruded/tilesets/doors2.png",
    "revision": "f215be67852e4925dfc0c558753aed10"
  }, {
    "url": "assets/images-extruded/tilesets/doors3.png",
    "revision": "74ecf9550053f3c8d13f29e3a87582c4"
  }, {
    "url": "assets/images-extruded/tilesets/flowers.png",
    "revision": "fd161c7c9b89d13765677ccf5c32f4dd"
  }, {
    "url": "assets/images-extruded/tilesets/grass1-dirt1.png",
    "revision": "8e4baed79d5f522f2941e82adaef546b"
  }, {
    "url": "assets/images-extruded/tilesets/grass1-dirt2.png",
    "revision": "eaabc9b3d19d516297d74ce25e3f1d21"
  }, {
    "url": "assets/images-extruded/tilesets/grass1-dirt4.png",
    "revision": "73ee003178fad7ec75577e86799c3162"
  }, {
    "url": "assets/images-extruded/tilesets/grass1.png",
    "revision": "958950554b537304eadaf1f7f0ba17b6"
  }, {
    "url": "assets/images-extruded/tilesets/grass2.png",
    "revision": "1f4d802c522c9682f814f231cc746ea4"
  }, {
    "url": "assets/images-extruded/tilesets/grass3.png",
    "revision": "4a8f613c9280360e263d5a596c388b70"
  }, {
    "url": "assets/images-extruded/tilesets/grass4.png",
    "revision": "ff88ae18b6150618a468958f7b5c0f9e"
  }, {
    "url": "assets/images-extruded/tilesets/grassland.png",
    "revision": "d7721ef1faaf27a6c6a15f3f54805559"
  }, {
    "url": "assets/images-extruded/tilesets/houses.png",
    "revision": "74a8bed912a58a47a5f819d4830a73e4"
  }, {
    "url": "assets/images-extruded/tilesets/long-grass.png",
    "revision": "a7321d152560a86a3604b2a03b58a129"
  }, {
    "url": "assets/images-extruded/tilesets/tree-beige-bushy.png",
    "revision": "d0efea7bf01d883c20a8d385c23fffd4"
  }, {
    "url": "assets/images-extruded/tilesets/tree-beige-thin.png",
    "revision": "559b7ab5edb9c651e352577f139d6d82"
  }, {
    "url": "assets/images-extruded/tilesets/tree-beige-wide.png",
    "revision": "fb898a3365138ac295c1a2d836117ad8"
  }, {
    "url": "assets/images-extruded/tilesets/tree-emerald-thin.png",
    "revision": "e18831726ea9b6dc4b318654f4754fab"
  }, {
    "url": "assets/images-extruded/tilesets/tree-emerald-wide.png",
    "revision": "6916c994396bde43f800f1bd53aa9cc1"
  }, {
    "url": "assets/images-extruded/tilesets/tree-green-bushy.png",
    "revision": "bf79a2362d6386e50941a677b7aa9052"
  }, {
    "url": "assets/images-extruded/tilesets/tree-green-thin.png",
    "revision": "f321b5ffcac03e5c9a8a08c80c929ad0"
  }, {
    "url": "assets/images-extruded/tilesets/tree-green-wide-edit.png",
    "revision": "a67ee50ef10892f027e23f516b02415f"
  }, {
    "url": "assets/images-extruded/tilesets/tree-green-wide.png",
    "revision": "19422d35f4f7a5a4dc25e5a07af7fcee"
  }, {
    "url": "assets/images-extruded/tilesets/tree-green-willow.png",
    "revision": "59720b5d69499fcac91c2a822cd78e4c"
  }, {
    "url": "assets/images-extruded/tilesets/tree-red-bushy.png",
    "revision": "7b7b88a46c3db28fddeb63ce551e4a75"
  }, {
    "url": "assets/images-extruded/tilesets/tree-red-thin.png",
    "revision": "7ce02bce70aaaa36d40d216a19e37c49"
  }, {
    "url": "assets/images-extruded/tilesets/tree-red-wide.png",
    "revision": "c4765fd7ed6088d1cdb71f581b49f1d4"
  }, {
    "url": "assets/images-extruded/tilesets/wall-up.png",
    "revision": "7aadf52ce42b3db5efa6f8288d658555"
  }, {
    "url": "assets/images-extruded/tilesets/water2.png",
    "revision": "4379afe4678469ab0d664f98194b7046"
  }, {
    "url": "assets/images/animations/atmospheric-animations.png",
    "revision": "c54c97f31949c9c92a5076d6331e605f"
  }, {
    "url": "assets/images/animations/fireball.png",
    "revision": "5694f8eb1d6f85d87a4623634ba0a186"
  }, {
    "url": "assets/images/animations/green-blast.png",
    "revision": "dccadbeac70932d2ad65e1d41bb051bd"
  }, {
    "url": "assets/images/animations/hit.png",
    "revision": "80b60b0690175b3309ba87521cea0643"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-blue-back.png",
    "revision": "3a5fe7369c321426c9c3454e38fe93ce"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-blue-front.png",
    "revision": "ce0a6a48160b29884b3d8dab3c1254c6"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-blue.png",
    "revision": "6a82c1fe75916148a22d20d8b1e46e3f"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-purple-back.png",
    "revision": "ab3039732ba6219adfd95c08068a7d1d"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-purple-front.png",
    "revision": "b0dbee0a5f6b87832f23154c65beb87e"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-purple.png",
    "revision": "7bed1d444c347cf0b86bed1981fc4dab"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-yellow-back.png",
    "revision": "412892f2b60c04850c7c96ba30094dc5"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-yellow-front.png",
    "revision": "2ca4f52bc41e95aa16ad58a7a326c699"
  }, {
    "url": "assets/images/animations/light-pillar/light-pillar-yellow.png",
    "revision": "c07f99020bcf27400ffe848d63cf18a0"
  }, {
    "url": "assets/images/characters/battle/dead-character.png",
    "revision": "9f4b75694570cbbeb890780a6754fa2e"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Attack1.png",
    "revision": "1b37d71e6613877ee1bca1e157f22067"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Attack2.png",
    "revision": "9a3201b9bd1a03679287ba60a23494c1"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Death.png",
    "revision": "5f7683d03534f5b66116f6b84c2ce02f"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Fall.png",
    "revision": "510e20702fb41b8becac4952ee97fe67"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Hit.png",
    "revision": "53981dafa29fb690237cd788320b24f7"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Idle.png",
    "revision": "6df18543cb030d749707737d1dad3599"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Jump.png",
    "revision": "4bca07882620ce34d7fa811a8a3aa463"
  }, {
    "url": "assets/images/characters/battle/enemies/Wizard/Run.png",
    "revision": "baa5be88f044a0c8b1795393ad2ac382"
  }, {
    "url": "assets/images/characters/battle/enemies/boar.png",
    "revision": "3b01f7225c6ff99529898ee445a8662c"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Attack1.png",
    "revision": "919f5e631f72d06d8e28a4d6152a92c1"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Attack2.png",
    "revision": "c46b4d2245c898885e1b4f40a1780a49"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Death.png",
    "revision": "5114cf4f8e82473bbcd0c644229c06aa"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Fall.png",
    "revision": "7b69c1ca1962e5d356ee50282d2a1aae"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Hit.png",
    "revision": "1f56d745498f25e4cda4c87121af6d86"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Idle.png",
    "revision": "94e0929833de588eed394c1360d568fe"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Jump.png",
    "revision": "5e16e393c1ece486baf8106bdcd90152"
  }, {
    "url": "assets/images/characters/battle/enemies/ghost-knight/Run.png",
    "revision": "1a3e5431b2d40a70e929858164ee1924"
  }, {
    "url": "assets/images/characters/battle/enemies/green-ooze/attack.png",
    "revision": "5aaf43f30f21769f4a9a7668fff1c55e"
  }, {
    "url": "assets/images/characters/battle/enemies/green-ooze/death.png",
    "revision": "55c7d3ba250e4e45ff66b74ab9693c50"
  }, {
    "url": "assets/images/characters/battle/enemies/green-ooze/hit.png",
    "revision": "0608687cd7681038288832b09ecd330b"
  }, {
    "url": "assets/images/characters/battle/enemies/green-ooze/idle.png",
    "revision": "b94985d7945eaba7de9a7bdd5e151b95"
  }, {
    "url": "assets/images/characters/battle/enemies/green-ooze/move.png",
    "revision": "87d2beeab8a70a29973ebcb17b2441da"
  }, {
    "url": "assets/images/characters/battle/enemies/rat/rat and bat spritesheet calciumtrice.png",
    "revision": "2ac71c0f2d37b991cc2c8104a90d4d85"
  }, {
    "url": "assets/images/characters/battle/enemies/skeleton/Attack.png",
    "revision": "d71cbed98afa0e56cdb149f093a24810"
  }, {
    "url": "assets/images/characters/battle/enemies/skeleton/Death.png",
    "revision": "9706c79119fb2a53b66ed8cb40cb4dfa"
  }, {
    "url": "assets/images/characters/battle/enemies/skeleton/Idle.png",
    "revision": "7533e38841f677c3b26efd998c370ae5"
  }, {
    "url": "assets/images/characters/battle/enemies/skeleton/Shield.png",
    "revision": "7e9eb4fc87cfe6f617de16a33eddba39"
  }, {
    "url": "assets/images/characters/battle/enemies/skeleton/Take Hit.png",
    "revision": "7f72c713201c151c6a42c4469d4eaf99"
  }, {
    "url": "assets/images/characters/battle/enemies/skeleton/Walk.png",
    "revision": "cc401ab1a57271cb3598cb44346603c0"
  }, {
    "url": "assets/images/characters/battle/party/elder.png",
    "revision": "9235bb1d31e6fff3058d7b0cfc492652"
  }, {
    "url": "assets/images/characters/battle/party/eyeball/Attack.png",
    "revision": "e1106fe653e8b41da7727eb9803a75eb"
  }, {
    "url": "assets/images/characters/battle/party/eyeball/Death.png",
    "revision": "4217101ba835fac4f879346ff76a07bc"
  }, {
    "url": "assets/images/characters/battle/party/eyeball/Flight.png",
    "revision": "fdddab58259f6be90b849d15442b744f"
  }, {
    "url": "assets/images/characters/battle/party/eyeball/Hit.png",
    "revision": "7bddad04c1dd7a84696a3e4874b6f945"
  }, {
    "url": "assets/images/interface/action-points.png",
    "revision": "cedbdc531d97341dc4551d264b5b13c0"
  }, {
    "url": "assets/images/interface/cave-background.png",
    "revision": "1e1bae70aada409386fd78dc22ff0539"
  }, {
    "url": "assets/images/interface/doll.png",
    "revision": "238ce0f03a0fe8685a725c8f1a69549a"
  }, {
    "url": "assets/images/interface/field-background.png",
    "revision": "723a47efa03e74465600f2a9bddc8dfa"
  }, {
    "url": "assets/images/interface/fishing-background.png",
    "revision": "0c639a06ea8b9534e23fddab6c5ec2ce"
  }, {
    "url": "assets/images/interface/inventory-slot.png",
    "revision": "f1ded47b1e99b0c5cf94d19e08c20a4c"
  }, {
    "url": "assets/images/interface/main-menu-background.jpg",
    "revision": "303ffce3b26234b4a9306873dcec9a40"
  }, {
    "url": "plugins/AnimatedTiles.js",
    "revision": "05f11f651be4669c9992474645eed1d3"
  }, {
    "url": "plugins/AnimatedTiles.min.js",
    "revision": "94f551098f6d96cbf5867a4f36fff4ca"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
