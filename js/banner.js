//获得窗口的对象，用它来获得每一次轮播的距离
var wins = document.getElementsByClassName("window")[0];
//获得大的容器的对象
var box = document.getElementsByClassName("box")[0];
//获取按钮的集合
var btns = document.querySelectorAll(".btns li");


// 即时完成 
//如何获得窗口的大小
// console.log(window.innerWidth);
// console.log(document.documentElement.clientWidth);


//获得轮播的运动长度
var winW = parseInt(getComputedStyle(wins, null).width);

var num = 0;
//运动函数
function move() {
    //每次轮播都要加一
    num++;
    //当运动到最后一张的处理逻辑
    if (num > btns.length - 1) {
        //当运动完最后一张，需要即时回到第一张
        animate(box, {
            "margin-left": -num * winW
        }, 300, Tween.Expo, function() {
            // num = 0;
            box.style.marginLeft = 0;
        })
        //将位置再回拨到第一张
        num = 0;
    } else {
        //除了最后一张的运动方式
        animate(box, {
            "margin-left": -num * winW
        }, 300)
    }

    //按钮随着轮播的变化而变化
    for (var i = 0; i < btns.length; i++) {
        btns[i].style.background = "#d3d3d3"
    }
    btns[num].style.background = "red";

}

//每隔3s运动一次
var t = setInterval(move, 3000);
//按钮轮播
//按钮进行切换
for (let i = 0; i < btns.length; i++) {
    //给每个按钮添加事件
    btns[i].onclick = function() {
        num = i;//将当前点击的按钮和轮播的值进行关联
        //点击的时候的运动方式
        animate(box, {
            "margin-left": -num * winW
        }, 300)

        //按钮点击的时候的变化
        for (var j = 0; j < btns.length; j++) {
            btns[j].style.background = "#d3d3d3"
        }
        btns[num].style.background = "red";
    }
}

// 鼠标的移入移出  事件里面最复杂的一个事件
//鼠标移入的时候 停止轮播
wins.onmouseover = function() {
    clearInterval(t);
}
//鼠标离开的时候 继续动画
wins.onmouseout = function() {
    t = setInterval(move, 3000);
}