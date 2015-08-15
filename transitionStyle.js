
/*
	属性渐变效果实现
 */

function transitionStyle(from, to, duration, framesPerSecond, callback) {

	var totalFrames = framesPerSecond * duration;//计算总的帧数
	var step = function(curStyle, frame) {
		var time = (frame / totalFrames) * duration * 1000;
		setTimeout(function(){
			callback(curStyle);
		}, time);
	}; //设置每一帧的动作

	var frame = 1;
	from = parseInt(from);
	to = parseInt(to);
	var stepLen = (to - from) / totalFrames;
	while(frame < totalFrames) {
		var curStyle = Math.ceil(from + stepLen * frame);
		step(curStyle,frame);
		frame++;
	}//设置中间帧
	step(from,0);//设置第一帧
	step(to,totalFrames);//设置最后一帧
}

// window.addEventListener('load', function() {
// 	var test = document.querySelector('#test');
// 	var testStyle = document.defaultView.getComputedStyle(test);
// 	var width = testStyle.getPropertyValue('top');
// 	var from = parseInt(width);
// 	var to = from + 100;
// 	var callback = function(curS) {
// 		curS = curS + 'px';
// 		test.style.setProperty('top', curS);
// 	}
// 	transitionStyle(from, to, 2, 20, callback);
// }, false);

window.addEventListener('load',function(){
	var totalImages = 12;
	var count = 0;
	var toL = document.querySelector('#toLeft');
	var toR = document.querySelector('#toRight');
	var abs = document.querySelector('#absWrap');
	var callback = function(curS) {
		curS = curS + 'px';
		abs.style.setProperty('left', curS);
	}
	var doToL = function(){
		count++;
		if(count > totalImages) {
			alert('到达末尾');
			return;			
		}
		var left = document.defaultView.getComputedStyle(abs).getPropertyValue('left');
		var from = parseInt(left);		
		var to = from - 80;
		console.log(from + ' ' + to);
		transitionStyle(from,to,1,36,callback);			

	};
	var doToR = function() {
		count--;
		if(count < 0) {
			alert('到达末尾');
			return;			
		}
		var left = document.defaultView.getComputedStyle(abs).getPropertyValue('left');
		var from = parseInt(left);
		var to = from + 80;
		transitionStyle(from,to,1,36,callback);
	};
	toL.addEventListener('click',doToL,false);
	toR.addEventListener('click',doToR,false);
},false);