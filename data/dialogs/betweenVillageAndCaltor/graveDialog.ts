export const graveDialog: DialogTree = [{
    id: 'grave1',
    text: `(Walking through the woods, you find yourself on the little glade, brightly lit by the sun. Flowers under your feet are bright and soft, the air is fresh and clean and the surroundings are filled with piece and sorrow. 
    In the middle of the glade, you see a lonely grave, old, but mostly untouched by the time. In front of it there is a sword, stuck into the dirt. The light reflects from it's edge, but also passing through, leaving very little shade.)`,
    replies: [{
        text: `Let's see...`,
        successTriggers: 'grave2'
    }]
}, {
    id: 'grave2',
    text: `    The engraving says:
    
    Here lays the great hero of Caltor, 
    Defender of the weak and protector of destitute.
    Call his name, glorify his deeds, moan his fall, swear his oath 
    And be blessed with his power to continue his course.`,
    replies: [{
        text: `Leave`,
        callbackParam: 'fastEnd'
    }]
}];

