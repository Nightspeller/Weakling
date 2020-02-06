export const announcementsDialog = [{
        id: 'firstAnnouncement',
        text: `Help needed! Boars are running wild on my fields and ruining my crops! 20 copper pieces to anybody who will chase the foul beasts away!`,
        replies: [{
                text: 'Hmm..may be I should give it a try..',
                callbackParam: 'questAccepted'
            }, {
                text: 'Probably not - if I try, I think I might be the one who will be chased away...',
                callbackParam: 'fastEnd'
            }]
    }];
export const announcementsEmptyDialog = [{
        id: 'firstAnnouncement',
        text: `(No new announcements for now, maybe I should try come back later.)`,
        replies: [{
                text: '(Maybe)',
                callbackParam: 'fastEnd'
            }]
    }];
//# sourceMappingURL=announcementsDialog.js.map