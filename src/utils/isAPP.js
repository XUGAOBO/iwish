
const getUrlQueryString = (name, search) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = (search || window.location.search.substr(1)).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    } else {
        return null;
    }
}
const getCookie = (name) => {
    var arrStr = document.cookie.split('; ');
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split('=');
        if (temp[0] === name) return decodeURIComponent(temp[1]);
    }
}
const isAppByCookie = () => {
    if ((getCookie('from') || '').indexOf('app_') >= 0) {
        return true;
    } else return false;
}
const isAppByUrl = () => {
    var app = false;
    var clientType = getUrlQueryString('clientType') || getUrlQueryString('clienttype');
    if (clientType && clientType.toLocaleLowerCase() !== 'm') app = true;
    return app;
}
const isAppByUserAgent = () => {
    return (new RegExp('JDIDAN', 'gi')).test(window.navigator.userAgent);
}

export function isApp() {
    var app = isAppByUrl();
    if (!app) app = isAppByCookie();
    if (!app) app = isAppByUserAgent();

    return app;
}
export function isWX() {
    return /micromessenger/i.test(navigator.userAgent)
}

export function isAndroid() {
    let UA = navigator.userAgent;
    let isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
    return isAndroid;
}

export function isiOS() {
    let UA = navigator.userAgent;
    let isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
}