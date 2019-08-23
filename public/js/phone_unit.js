window.devicePixelRatio;
// dpr 像素密度 用scale 进行统一
var scale = 1 / window.devicePixelRatio;
// use-scalable=no 禁止用户缩放页面
// document.write 直接将内容输出到页面
document.write(`
    <meta name="viewport" content="width=device-width, initial-scale=${scale} , maximum-scale= ${scale}, minimum-scale=${scale}, use-scalable=no">
`);
{
  /* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> */
}

// rem 单位根据根元素的font-size 决定
// 将页面统一分割成750份,设置自定义的单位 1rem =  (100 * unit) px
var unit = window.innerWidth / 750;
document.write(`
    <style>
        html {
            font-size: ${100 * unit}px;
        }
    </style>
`);
