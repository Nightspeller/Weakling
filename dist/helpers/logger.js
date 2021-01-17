// This function gets text for console.log and colors every word with starting with !! into red(e.g. !!IamRed)
// and every word starting with ?? into aqua (e.g. ??IamAqua).
// It returns an array to be deconstructed into console.log call, like:
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // console.log(...prepareLog(`Please, color this word !!RED and this ??AQUA`));
    // Set timestamp to true to add timestamp before the log.
    function prepareLog(text, timestamp = false) {
        if (typeof text !== 'string')
            return [text];
        const colors = [];
        let replacedText = text.replace(/(!!|\?\?([^]))(\w|'|-)*/g, (value) => {
            if (value[0] === '!') {
                colors.push('color: red');
            }
            else {
                colors.push('color: aqua');
            }
            colors.push('color: auto');
            return `%c${value.substr(2)}%c`;
        });
        if (timestamp) {
            const timestampString = `%c[${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]%c `;
            replacedText = timestampString + replacedText;
            colors.unshift('color: green', 'color: auto');
        }
        return [replacedText, ...colors];
    }
    exports.default = prepareLog;
});
//# sourceMappingURL=logger.js.map