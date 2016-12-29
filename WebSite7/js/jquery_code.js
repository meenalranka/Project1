

$(document).ready(function() {

	var ul2 = $(".slider ul");        
	var slide_count2 = ul2.children().length;          // counter how many slides we've got 
	var doubleSlideCount2, tripleSlideCount2;
	doubleSlideCount2 =  slide_count2*2;
	tripleSlideCount2 = slide_count2*3;
	ul2.css({width:(100*slide_count2) + "%"});     // set our width of our slider to number of slides   , simply: 100* number of slides * %  , because width of  our sliderContainer is 100%
	var slide_width_pc2 = 100.0 / slide_count2;    // get width of each slides   simply: 100 / number of slides 
	var slide_index2 = 0;                                        // slide_index is needed to know wich slide is curently displayed
	var pausePlayIndex = 0;                                  // pausePlayIndex is needed to know if it is Pause or Play mode , 0 means Play Mode , 1 means Pause Mode
	var myVar = setInterval(function(){ slideTwo(slide_index2+1); slide_index2++; }, 5000, function(){});  // in that line our slider start  doing interval  
	var first_slide = ul2.find("li:first-child");     
	var last_slide = ul2.find("li:last-child");
	var timer, timer2, timer3;
	last_slide.clone().prependTo(ul2); 					    // Clone the last slide and add as first li element  
	first_slide.clone().appendTo(ul2);						 // Clone the first slide and add as last li element
    ul2.css("margin-left", "-100%");
	/* >>>>>>>>>>>>>>> VARIABLES NEEDED FOR THUMBS START<<<<<<<<<<<<<<<<*/
	var ul2T = $(".sliderT ul");        
	var slide_count2T = ul2T.children().length;          // counter how many slides we've got 
	ul2T.css({width:(100*slide_count2T) + "%"});     // set our width of our slider to number of slides   , simply: 100* number of slides * %  , because width of  our sliderContainer is 100%
	var slide_width_pc2T = 100.0 / slide_count2T;    // get width of each slides   simply: 100 / number of slides 
	var slide_index2T = slide_count2-1;                                        // slide_index is needed to know wich slide is curently displayed                             
	var myVarT = setInterval(function(){ slideTwoT(slide_index2T+1); slide_index2T++; }, 5000);  // in that line our thumbs start  doing interval
	var timerT, timer2T, timer3T;
	var  ThisSlidePrep, ThisSlideApp;
   /*>>>>>>>>>>>>>>>>>VARIABLES NEEDED FOR THUMBS STOP>>>>><<<<<<<<<<<*/
   
	ul2.find("li").each(function(indx2) {                       // here we are setting left position and width  of each slides
			var left_percent2 = (slide_width_pc2 * indx2) + "%";
			$(this).css({"left":left_percent2});
			$(this).css({width:(100 / slide_count2) + "%"});
	});
																				
	$(".slider .prev").click(function() {
			console.log("prev button clicked");				// Listen for click of prev button
		
			slideTwo(slide_index2 - 1); 						// If so set silde to current - 1 
	     	slideTwoT(slide_index2T-1);
	
			if   (pausePlayIndex == 0){						// if it is Play Mode  clear current and set new Interval with new chosen slide at the begining
				clearInterval(myVar);		
				clearInterval(myVarT);
				myVar = setInterval(function(){ slideTwo(slide_index2+1); slide_index2++; }, 5000);
				myVarT = setInterval(function(){ slideTwoT(slide_index2T+1); slide_index2T++; }, 5000);
			}
				
	});


	$(".slider .next").click(function() {		
			console.log("next button clicked");			// Listen for click of next button
			slideTwo(slide_index2 + 1);					// If so set silde to current + 1 
			slideTwoT(slide_index2T+1);
			if   (pausePlayIndex == 0){					// if it is Play Mode  clear current and set new Interval with new chosen slide at the begining
				clearInterval(myVar);		
				clearInterval(myVarT);
				myVar = setInterval(function(){ slideTwo(slide_index2+1); slide_index2++; }, 5000);
				myVarT = setInterval(function(){ slideTwoT(slide_index2T+1); slide_index2T++; }, 5000);
			}
	});
	


	function slideTwo(new_slide_index2) {			// Here is our slider engine :)  
			var margin_left_pc2 = (new_slide_index2 * (-100) - 100) + "%";
			ul2.animate({"margin-left": margin_left_pc2},  900, "easeInOutCubic" , function() {    // as  you see sliders are animated by margin-left css attribute		
					if(new_slide_index2 < 0) {									// If new slide is before first slide...		  		  
							ul2.css("margin-left", ((slide_count2) * (-100)) + "%");
							new_slide_index2 = slide_count2 - 1;
					}else if(new_slide_index2 >= slide_count2) {      // If new slide is after last slide...		  		  
							ul2.css("margin-left", "-100%");
							new_slide_index2 = 0;								
					}  	
					slide_index2 = new_slide_index2;
					
					
					y = slide_index2+1; 
			});
  }





	/*   on mouseenter on sliderTwoContainer show pause/play button after 1000ms with opacity animation*/
	$("body").on("mouseenter", ".slider ul", function(){
		if (pausePlayIndex == 0){
			timer3 = setTimeout(function () {
				$(".pause").css("display","block");
				$(".pause").animate({opacity: '0.6'} , 1000)
				}, 1000); }
		if (pausePlayIndex == 1){
			timer3 = setTimeout(function () {
				$(".play").css("display","block");
				$(".play").animate({opacity: '0.6'} , 1000)
				}, 1000); }
	/*   on mouseleave from sliderTwoContainer  hide pause/play button after 1000ms with opacity animation*/	
	}).on("mouseleave", ".slider ul", function(){
		if (pausePlayIndex == 0){
			clearTimeout(timer3);
			$(".pause").animate({opacity: '0'} , 1000);
			setTimeout(function(){
				$(".pause").css("display","none");
			},1000);}
		if (pausePlayIndex == 1){
			clearTimeout(timer3);
			$(".play").animate({opacity: '0'} , 1000);
			setTimeout(function(){
				$(".play").css("display","none");
			},1000);}
	});


	$(".pause").click(function(){	
		 clearInterval(myVar);	
		 clearInterval(myVarT);
	    $(".pause").css("display","none");	
		$(".play").css("display","block");
		$(".play").css("opacity","0.6");
		pausePlayIndex = 1;

	});
	$(".play").click(function(){	
		   myVar = setInterval(function(){ slideTwo(slide_index2+1); slide_index2++; }, 5000);
		   myVarT = setInterval(function(){ slideTwoT(slide_index2T+1); slide_index2T++; }, 5000); 
		   $(".play").css("display","none");
		   $(".pause").css("display","block");
		  pausePlayIndex = 0;

	});


	
	
	/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
	/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
	
	

	
	
	
	for (i =1 ; i<= slide_count2T; i++){
		ThisSlideApp = ul2T.find("li:nth-child("+i+")");     
		ThisSlideApp.clone().appendTo(ul2T);
	}
	
	for (i =1 ; i<= slide_count2T; i++){
		ThisSlideApp = ul2T.find("li:nth-child("+i+")");     
		ThisSlideApp.clone().appendTo(ul2T);
	}

	var setThumbStartPosition = (slide_count2 * (-100))+'%';
	
	$(".sliderT li:nth-child(7) > img").css({"border": "1px solid white"});
    ul2T.css('margin-left', setThumbStartPosition);

	
	ul2T.find("li").each(function(indx2) {                       // here we are setting left position and width  of each Thumbs
			var left_percent2T = (slide_width_pc2T * indx2) + "%";
			$(this).css({"left":left_percent2T});
			$(this).css({width:(100 / slide_count2T) + "%"});
	});

																			

	function slideTwoT(new_slide_index2) {			// Here is our slider engine :)  

			var margin_left_pc2T = (new_slide_index2 * (-100) - 100) + "%";
			$(".sliderT > ul").find('li').each(function(i){  
				$(this).css({"padding": "1%"});
				$(this).find("img").css({"border": "1px solid black"});
			});
			ul2T.animate({"margin-left": margin_left_pc2T},  900, "easeInOutCubic" , function() {    // as  you see sliders are animated by margin-left css attribute		
			
			var setBeforeFirstPosition	= ((slide_count2*2)-1)*(-100);
			var setAfterLastPosition	= (slide_count2+1)*(-100);
				   setBeforeFirstPosition = setBeforeFirstPosition+"%";
				   setAfterLastPosition = setAfterLastPosition+"%";			
			
			
			if(new_slide_index2 < (slide_count2-1)) {									// If new slide is before first slide...		  		  
							ul2T.css("margin-left", setBeforeFirstPosition);					
				            new_slide_index2 = (slide_count2*2)-2 ;					
		
			}
			
			if(new_slide_index2 >= (slide_count2T*2)) {      // If new slide is after last slide...		  		  
							ul2T.css("margin-left", setAfterLastPosition);
							
							new_slide_index2 = slide_count2;			
						
			}	  	
					
					x =  new_slide_index2+2;
					y = x - 1;
					$(".sliderT li:nth-child("+y+") > img").css({"border": "1px solid black"});
					$(".sliderT li:nth-child("+x+") > img").css({"border": "1px solid white"});
					$(".sliderT li:nth-child("+y+")").css({"padding": "1%"});
					$(".sliderT li:nth-child("+x+")").css({"padding": "0px"});
					slide_index2T = new_slide_index2;
					
			});
  }

	$(".sliderT > ul").find('li').each(function(i){  // here we have simply, nice and clear code to set slider position after click on thumb
    		
		x = i+1;
		if  (x == 1) {
			$(this).click(function(){
				slideTwo(i);
				if ((i>=0)&& (i<=slide_count2)) {  var x = i +slide_count2-1; slideTwoT(x);slideTwo(i);}
				if ((i>=(slide_count2+1))&&(i<=(slide_count2*2))) {  slideTwoT(i-1);slideTwo(i-slide_count2);}
				if ((i>=((slide_count2*2)+1))&& (i<=(slide_count2*3))) {  var x = i - slide_count2-1; slideTwoT(x);slideTwo(i-(slide_count2*2));}
				$(this).effect
			});		
		} else {
			$(this).click(function(){
			$(this).css({"padding": "0%"});

				if   (pausePlayIndex == 0){    // if it is Play Mode  clear current and set new Interval with new chosen slide at the begining
						clearInterval(myVarT);
						clearInterval(myVar);
						myVarT = setInterval(function(){ slideTwoT(slide_index2T+1); slide_index2T++; }, 5000);			
						myVar = setInterval(function(){ slideTwo(slide_index2+1); slide_index2++; }, 5000);					
					}
					
				if ((i>=0)&& (i<=slide_count2)) {  var x = i +slide_count2-1; slideTwoT(x);slideTwo(i);}
				if ((i>=(slide_count2+1))&&(i<=(slide_count2*2))) {  slideTwoT(i-1); slideTwo(i-slide_count2);}
				if ((i>=((slide_count2*2)+1))&& (i<=(slide_count2*3))) {  var x = i - slide_count2-1; slideTwoT(x);slideTwo(i-(slide_count2*2));}
			});
		}
	});
	
});
