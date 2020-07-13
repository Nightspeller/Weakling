export const announcementsDialog = [{
        id: 'firstAnnouncement',
        text: `    Help needed! Boars are running wild on my fields and ruining my crops! Valuable life experience and the thrill of battle guaranteed, so what are you waiting for?!
    ——Farmer Joe`,
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