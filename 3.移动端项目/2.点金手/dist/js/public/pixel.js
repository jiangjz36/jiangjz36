var pixelRatio = 1/window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,initial-scale='+pixelRatio+',minimum-scale='+pixelRatio+',maximum-scale='+pixelRatio+'">');
var html = document.getElementsByTagName('html')[0];
var pageWidth = html.getBoundingClientRect().width;
html.style.fontSize = pageWidth/25+'px';
