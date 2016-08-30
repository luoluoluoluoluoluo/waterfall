$(window).on('load',function(){
	waterfall();
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    $(window).on('scroll',function(){
    	if(checkscrollside()){
    		$.each(dataInt.data,function(key,value){
    			var $oPin=$('<div>').addClass('pin').appendTo($('#main'));
    			var $oBox=$('<div>').addClass('box').appendTo($oPin);
    			$('<img>').attr('src','./images/'+$(value).attr('src')).appendTo($oBox);
    		});
    		waterfall();
    	}
    });
});

function waterfall(){
	var $boxs=$('#main>div');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin','0 auto');

	var hArr=[];
	$boxs.each(function(index,value){
		if(index<cols){
			hArr[index]=$boxs.eq(index).outerHeight();
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':w*minHIndex+'px'
			});
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	});
}

function checkscrollside(){
	var $lastBox=$('#main>div').last();
	var lastBoxH=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return (lastBoxH<scrollTop+documentH)?true:false;
}