export const questsData: { [key: string]: Quest } = {
    'bigCaltorTrip': {
        questId: 'bigCaltorTrip',
        questName: 'Big Caltor trip',
        questReward: {items: [{itemId: 'copper-pieces', quantity: 5}], xp: 10},
        availableStates: {
            started: `Today is the big day! It is time to gather all what your Village produced this season and take it to Caltor! And of course you overslept!.. \nSo now it is time to hurry and meet Elder Guarthh and hit the road! He usually can be found either at his home or at the center of the Village.`,
            talkedToElder: `Elder Guarthh asks you to collect goods for sale from fellow villagers: minerals dug out by uncle Hargkakh and baskets from auntie Nahkha.`,
            mineralsObtained: `You obtained minerals from uncle Hargkakh`,
            basketsObtained: `You obtained baskets from auntie Nahkha`,
            readyToGo: `You and Elder Gaurthh are ready for the trip to Caltor. He insists on you just following the road and get there as fast as possible. \nIn the Caltor find the trader Bodger - he might be willing to buy your goods.`,
            goodsSold: `You sold the goods to the Bodger - now it is time to go back, Mitikhha must be waiting with the longshroom stew by now!`,
            completed: `Your big journey is complete!`
        },
        currentStates: ['started']
    },
    'scaredyBat': {
        questId: 'scaredyBat',
        questName: 'Scaredy Eyeball',
        questReward: {items: [{itemId: 'copper-pieces', quantity: 5}], xp: 10},
        availableStates: {
            started: `I found Eyeball, our favorite cyclops bat, hiding in the cave next to the Village entrance. A few days ago Whiskers gave him some hard time after drinking my experimental strength potion.\nNow Eyeball does not want to go outside anymore, even though Whiskers is back to normal. I wonder if there is something I can do to cheer him up.`,
            signRead: `It seems like Eyeball is a big fan of Purplecup mushrooms - if I happen to find one, that might be just a thing to lure him outside!`,
            completed: `It worked, Eyeball feels better now and ready to leave the cave!`
        },
        currentStates: ['started']
    },
    'bonesPicking': {
        questId: 'bonesPicking',
        questName: 'Bones picking',
        questReward: {items: [{itemId: 'copper-pieces', quantity: 5}], xp: 10},
        availableStates: {
            started: `My friend Moorsh asked me to bring him 12 portions of bone dust so he could make his mushrooms to spore. I should be able to recover the necessary bones from the Old Dungeon.`,
            completed: `I got the mushroom spores! With it I can grow my own crop in no time!`
        },
        currentStates: ['started']
    },
    'helpTheTareth': {
        questId: 'helpTheTareth',
        questName: 'Help the Tareth',
        questReward: {items: [{itemId: 'copper-pieces', quantity: 5}], xp: 10},
        availableStates: {
            started: `Your friend, Tareth, struggles with the task he got from the Elder - he needs to carry harvested supplies to the stockpile, but the baskets are too heavy. You don't have time to do it for him, so there must be other way to help him.`,
            potionToMake: `I might be able to help if I make some empowering potion for poor Tareth.`,
            potionGiven: `I gave the potion to Tareth, let's hope this time it will work!`,
            completed: 'Strength potion worked like a charm! Tareth does look a little bit more orange though, but that must be the sun.'
        },
        currentStates: ['started']
    },
    'theSelflessSpirit': {
        questId: 'theSelflessSpirit',
        questName: 'The Selfless Spirit',
        questReward: {items: [{itemId: 'copper-pieces', quantity: 5}], xp: 10},
        availableStates: {
            started: `You found the grave of a brave hero, with the spirit sword next to it. The engraving says:\n
    Here lays the great hero of Caltor,
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath
    And be blessed with his power to continue his course.`,
            falseNameLearned: `You learned the name of the founder and protector of the Caltor: Sir Jeremy von Caltor`,
            falseNameCalled: `You called the hero by the name of Sir Jeremy von Caltor, but was immediately attacked by the angry spirit. Something must be terribly wrong here.`,
            trueNameLearned: `You learned the name of the hero - he is known as Jeremaya the Bandit.`,
            trueNameCalled: `You called the hero by the name of Jeremaya the Bandit. Solemn silence got even deeper.`,
            deedsGlorified: `You glorified the deeds of sir Jeremaya the Bandit.`,
            oathLearned: `You learned the oath of Jeremaya the Bandit from his biography.`,
            deathMoaned: `You moaned the hero's fall by planting Primulas on his grave.`
        },
        currentStates: ['started']
    },
    'boarsAtTheFields': {
        questId: 'boarsAtTheFields',
        questName: `Boars at the Fields`,
        questReward: {items: [{itemId: 'copper-pieces', quantity: 5}], xp: 10},
        availableStates: {
            started: `You read the announcement on the board near the tavern, that help is needed to get rid of the boars ravaging farmer Joe's fields.`
        },
        currentStates: ['started']
    },
    'gregsBucket': {
        questId: 'gregsBucket',
        questName: `Greg's bucket`,
        questReward: {items: [{itemId: 'copper-pieces', quantity: 5}], xp: 10},
        availableStates: {
            started: `Greg the garlic farmer asked you for help - his bucket got a hole in it and can't be used any longer.`
        },
        currentStates: ['started']
    }
};
