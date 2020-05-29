export default function prepareLog(text, timestamp = false) {
    if (typeof text !== "string")
        return [text];
    const colors = [];
    let replacedText = text.replace(/(!!|\?\?([^]))\w+/g, (value) => {
        value[0] === '!' ? colors.push('color: red') : colors.push('color: aqua');
        colors.push('color: white');
        return `%c${value.substr(2)}%c`;
    });
    if (timestamp) {
        const timestampString = `%c[${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}]%c `;
        replacedText = timestampString + replacedText;
        colors.unshift('color: green', 'color: white');
    }
    return [replacedText, ...colors];
}
//# sourceMappingURL=logger.js.map