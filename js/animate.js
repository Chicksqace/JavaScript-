function animate(obj,target,callBack){
				// console.log(callBack);callBack=function(){}  调用的时候 callback()
				// 当我们不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
				// 解决方案就是让我们只有一个定时器执行 
				// 先清除以前的定时器，只有一个定时器
				clearInterval(obj.timer)
				obj.timer=setInterval(function(){
					// 步长值写到定时器的里面
					// 把步长改为整数 不要出现小数的问题
					var step=(target-obj.offsetLeft)/10;
					step=step>0 ? Math.ceil(step) :Math.floor(step);
					if(obj.offsetLeft==target){
						// 停止动画 本质是停止定时器
						clearInterval(obj.timer);
						// 回调函数写到定时器结束后面
						if(callBack){
							// 调用函数
							callBack();
						}
					}else{
						// 把1改为步长(目标值 - 现在的位置 ) / 10 做为每次移动的距离 步长
						obj.style.left=obj.offsetLeft+step+'px';
					}		
				},15)
			}