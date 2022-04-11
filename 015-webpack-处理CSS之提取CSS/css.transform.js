module.exports = function (css) {
    console.log(css);
    console.log(window.innerWidth);

    // 根据页面宽度来做css形变
    if (window.innerWidth >= 768)
        return css.replace("center", "left");
    else
        return css;
}