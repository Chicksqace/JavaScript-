window.addEventListener('load', function() {
	// 1.获取元素
	var focus=document.querySelector('.focus');
	var ul=focus.children[0];
	var ol=focus.children[1];
	var w=focus.offsetWidth;
	// 2.利用定时器自动轮播图图片
	var index=0;
	var timer=setInterval(function(){
		index++;
		var translatex=-index*w;
		// 延迟3秒
		ul.style.transition='all .3s';
		ul.style.transform='translateX('+translatex+'px)';
	},2000);
	// 等我们过渡完成之后，再去判断，监听过渡完成的事件 transitionend
	ul.addEventListener('transitionend',function(){
		// console.log(index)
		// 无缝滚动
		if(index>=3){
			index=0;
			// 去掉过渡效果，这可以让我们快速跳到目标位置
			ul.style.transition='none';
			// 利用最新的索引号乘以宽度，去滚动图片
			var translatex=-index*w;
			ul.style.transform='translateX('+translatex+'px)'
		}else if(index<0){
			index=2;
			ul.style.translatex=-index*w;
			ul.style.transform='translateX('+translatex+'px)'
		}
		// 3.小圆点跟随变化
		// 离除所有licurrent类名选出来，然后去掉类名
		ol.querySelector('li.current').classList.remove('current');
		// 让当前索引号 的小li 加上current add
		ol.children[index].classList.add('current');
	});
	// 手指滑动轮播图
	var startX=0;
	var moveX=0;//后面要使用这个移动距离所有要定义一个全局变量
	var flag=false;
	ul.addEventListener('touchstart',function(e){
		startX=e.targetTouches[0].pageX;
		clearInterval(timer);
		// 手指移动就停止定时器
	})
	ul.addEventListener('touchmove',function(e){
		moveX=e.targetTouches[0].pageX-startX;
		var translatex=-index*w+moveX;
		// 手指移动不需要过渡动画
		ul.style.transition='none';
		ul.style.transform='translateX('+translatex+'px)'
		flag=true ;//如果用户手指移动过，就去判断
		e.preventDefault();
	})
	
	// 手指离开 根据移动距离去判断是回弹还是播放上一张下一张
	ul.addEventListener('touchend',function(e){
		if(flag){
			// (1)如果移动距离大于50px就播放上一张或下一张
			if(Math.abs(moveX)>50){
				// 如果是右滑 播放上一张 moveX就是正值
				if(moveX>0){
					index--;
				}else{
					// 如果是左滑 播放下一张 moveX就负值
					index++;
				}
				var translatex=-index*w;
				ul.style.transition='all .3s';
				ul.style.transform='translateX('+translatex+'px)'
			}else{
				var translatex=-index*w;
				ul.style.transition='all .3s';
				ul.style.transform='translateX('+translatex+'px)'
			}
		}
		// 当手指离开时候后重新开启定时器
		clearInterval(timer)
		timer=setInterval(function(){
			index++;
			var translatex=-index*w;
			// 延迟3秒
			ul.style.transition='all .3s';
			ul.style.transform='translateX('+translatex+'px)';
		},2000);
	})
	
	
	
	
	// 返回顶部模块制作
	var goBack=document.querySelector('.goBack');
	var nav=document.querySelector('nav')
	window.addEventListener('scroll',function(){
		if(window.pageYOffset>=nav.offsetTop){
			goBack.style.display='block';
		}else{
			goBack.style.display='none';
		}
	})
	goBack.addEventListener('click',function(){
		window.scroll(0,0)
	})
})
