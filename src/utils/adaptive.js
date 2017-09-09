// 设计稿宽度 750px
const DESIGN_WIDTH = 750;

let doc = window.document;
let docEl = doc.documentElement;
let viewport = doc.querySelector('meta[name="viewport"]');
let fontSize = docEl.getBoundingClientRect().width / DESIGN_WIDTH * 100;

// 设置 viewport
if (!viewport) {
	viewport = doc.createElement('meta');
	viewport.setAttribute('name', 'viewport');
	viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale = 1.0, user-scalable=0')
	doc.head.appendChild(viewport);
} else {
	viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale = 1.0, user-scalable=0')
}

function adaptive() {
	fontSize = docEl.getBoundingClientRect().width / DESIGN_WIDTH * 100;
  docEl.setAttribute('style', 'font-size: ' + fontSize + 'px !important');
}

adaptive();

window.addEventListener('resize', adaptive, false);
