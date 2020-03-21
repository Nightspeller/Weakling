export const questsData = {
    'bigCaltorTrip': {
        questId: 'bigCaltorTrip',
        questName: 'Big Caltor trip',
        questDescriptions: [`Today is the big day! It is time to gather all what your Village produced this season and take it to Caltor! And of course you overslept!.. \nSo now it is time to hurry and meet Elder Guarthh and hit the road! He usually can be found either at his home or at the center of the Village.`,
            `Elder Guarthh asks you to collect goods for sale from fellow villagers: minerals dug out by uncle Hargkakh and baskets from auntie Nahkha.`,
            `You obtained minerals from uncle Hargkakh`,
            `You obtained baskets from auntie Nahkha`,
            `You and Elder Gaurthh are ready for the trip to Caltor. He insists on you just following the road and get there as fast as possible. \nIn the Caltor find the trader Bodger - he might be willing to buy your goods.`,
            `You sold the goods to the Bodger - now it is time to go back, Mitikhha must be waiting with the longshroom stew by now!`,
            `Your big journey is complete!`],
        questReward: { items: [{ itemId: 'copper-pieces', quantity: 5 }], xp: 10 },
        questState: { state: 'started', descriptions: [0] }
    },
    'helpTheTareth': {
        questId: 'helpTheTareth',
        questName: 'Help the Tareth',
        questDescriptions: [`Your friend, Tareth, struggles with the task he got from the Elder - he needs to carry harvested supplies to the stockpile, but the baskets are too heavy. You don't have time to do it for him, so there must be other way to help him.`],
        questReward: { items: [{ itemId: 'copper-pieces', quantity: 5 }], xp: 10 },
        questState: { state: 'started', descriptions: [0] }
    },
    'theSelflessSpirit': {
        questId: 'theSelflessSpirit',
        questName: 'The Selfless Spirit',
        questDescriptions: [`You found the grave of a brave hero, with the spirit sword next to it. The engraving says:\n
    Here lays the great hero of Caltor,
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath
    And be blessed with his power to continue his course.`],
        questReward: { items: [{ itemId: 'copper-pieces', quantity: 5 }], xp: 10 },
        questState: { state: 'started', descriptions: [0] }
    }
};
//# sourceMappingURL=questsData.js.map