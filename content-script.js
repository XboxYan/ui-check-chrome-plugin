const imglist = [
    'https://imgservices-1252317822.image.myqcloud.com/image/20200701/obiovu02uy.jpg',
    'https://imgservices-1252317822.image.myqcloud.com/image/20200701/f0tutqgdiv.jpg',
    'https://imgservices-1252317822.image.myqcloud.com/image/20200701/zh6l6azztp.jpg',
    'https://imgservices-1252317822.image.myqcloud.com/image/20200701/8dzh5p5jg7.jpg',
    'https://imgservices-1252317822.image.myqcloud.com/image/20200701/scmo69275p.jpg',
    'https://imgservices-1252317822.image.myqcloud.com/image/20200701/c5g6yl6np0.jpg',
    'https://imgservices-1252317822.image.myqcloud.com/image/20200701/73dajixpc6.jpg'
]

const text_nodes = [];
const img_nodes = [];

const map = function (nodes) {
    nodes.childNodes.forEach(function (el) {
        if (el.nodeType === Node.TEXT_NODE) {
            if (el.data.trim()) {
                text_nodes.push(el);
            }
        } else if (el.nodeType === Node.ELEMENT_NODE) {
            if (el.tagName === 'IMG') {
                img_nodes.push(el);
            } else {
                map(el);
            }
        }
    })
}
const randomImg = function () {
    const len = imglist.length;
    return imglist[Math.floor(Math.random() * len)];
}


// 文本过多
const overflow = function () {
    map(document.body)
    text_nodes.forEach(function (el) {
        if (!el.bak) {
            el.bak = el.data;
        }
        el.data = el.bak.repeat(4);
    })
    img_nodes.forEach(function (el) {
        if (!el.bak) {
            el.bak = el.src;
        }
        el.src = randomImg();
    })
}

// 文本为空
const empty = function () {
    map(document.body);
    text_nodes.forEach(function (el) {
        if (!el.bak) {
            el.bak = el.data;
        }
        el.data = '';
    })
    img_nodes.forEach(function (el) {
        if (!el.bak) {
            el.bak = el.src;
        }
        el.src = '';
    })
}

// 随机
const random = function () {
    map(document.body);
    text_nodes.forEach(function (el) {
        if (!el.bak) {
            el.bak = el.data;
        }
        el.data = el.bak.repeat(Math.floor(Math.random() * 5));
    })
    img_nodes.forEach(function (el) {
        if (!el.bak) {
            el.bak = el.src;
        }
        el.src = Math.random() > .5 ? randomImg() : null;
    })
}

// 正常
const normal = function () {
    map(document.body);
    text_nodes.forEach(function (el) {
        if (el.bak) {
            el.data = el.bak;
        }
    })
    img_nodes.forEach(function (el) {
        if (el.bak) {
            el.src = el.bak;
        }
    })
}

const fn = { overflow, empty, random, normal };

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	fn[request]();
});