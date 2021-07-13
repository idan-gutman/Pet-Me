
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    timeSince
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function timeSince(date, addedStr = '') {
    var seconds = Math.floor((new Date() - date) / 1000);
    if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 365.25)) + ' years ' + addedStr;
    else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1) return '1 year ' + addedStr;
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 30.4)) + ' months ' + addedStr;
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1) return '1 month ' + addedStr;
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 7)) + ' weeks ' + addedStr;
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return '1 week ' + addedStr;
    else if (Math.round(seconds / (60 * 60 * 24)) >= 2) return Math.round(seconds / (60 * 60 * 24)) + ' days ' + addedStr;
    else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return '1 day ' + addedStr;
    else if (Math.round(seconds / (60 * 60)) >= 2) return Math.round(seconds / (60 * 60)) + ' hours ' + addedStr;
    else if (Math.round(seconds / (60 * 60)) >= 1) return '1 hour ' + addedStr;
    else if (Math.round(seconds / 60) >= 2) return Math.round(seconds / 60) + ' minutes ' + addedStr;
    else if (Math.round(seconds / 60) >= 1) return '1 minute ' + addedStr;
    else if (seconds >= 2) return seconds + ' seconds ' + addedStr;
    else return seconds + '1 second ' + addedStr;
}