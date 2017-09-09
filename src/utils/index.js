// import { isiOS } from './isAPP';
// import { STATIC_URL } from './constants'

// const iframeLoad = src => {
//     let iframe = document.createElement('iframe')
//     iframe.style.display = 'none'
//     iframe.src = src
//     document.body.appendChild(iframe)
//     iframe.addEventListener('load', function () {
//         setTimeout(function () {
//             iframe.remove()
//         }, 0)
//     })
// }

export const setTitle = title => {
    document.title = title;
    // if (isiOS()) {
    //     iframeLoad(`${STATIC_URL}/gray/yinger.jpg`);
    // }
}

export const isEamil = (text) => /^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(text)
export const isTel = (text) => /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/.test(text)
export const isMobile = (text) => /^1[3-9]\d{9}$/.test(text)