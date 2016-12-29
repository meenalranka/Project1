

$(document).ready(function() {

	var ul2 = $(".sliderT ul");        
	var slide_count2 = ul2.children().length;          // counter how many slides we've got 
	ul2.css({width:(100*slide_count2) + "%"});     // set our width of our slider to number of slides   , simply: 100* number of slides * %  , because width of  our sliderContainer is 100%
	var slide_width_pc2 = 100.0 / slide_count2;    // get width of each slides   simply: 100 / number of slides 
	var slide_index2 = 5;                                        // slide_index is needed to know wich slide is curently displayed                             
	var myVar = setInterval(function(){ slideTwo(slide_index2+1); slide_index2++; }, 5000);  // in that line our slider start  doing interval simply 
	var first_slide = ul2.find("li:first-child");     
	var last_slide = ul2.find("li:last-child");
	var timer, timer2, timer3;
	var  ThisSlidePrep, ThisSlideApp;
	
	
	
	for (i =1 ; i<= slide_count2; i++)
	{
		ThisSlideApp = ul2.find("li:nth-child("+i+")");     
		ThisSlideApp.clone().appendTo(ul2);
	}
	
	for (i =1 ; i<= slide_count2; i++)
	{
		ThisSlideApp = ul2.find("li:nth-child("+i+")");     
		ThisSlideApp.clone().appendTo(ul2);
	}


	

    ul2.css("margin-left", "-600%");

	
	ul2.find("li").each(function(indx2) {                       // here we are setting left position and width  of each slides
			var left_percent2 = (slide_width_pc2 * indx2) + "%";
			$(this).css({"left":left_percent2});
			$(this).css({width:(100 / slide_count2) + "%"});
	});

																				





	function slideTwo(new_slide_index2) {			// Here is our slider engine :)  

			var margin_left_pc2 = (new_slide_index2 * (-100) - 100) + "%";

			ul2.animate({"margin-left": margin_left_pc2},  1400, "easeInOutCubic" , function() {    // as  you see sliders are animated by margin-left css attribute		
					if(new_slide_index2 < 6) {									// If new slide is before first slide...		  		  
							ul2.css("margin-left", ((slide_count2) * (-100)) + "%");
							new_slide_index2 = slide_count2 - 1;
					}else if(new_slide_index2 >= (slide_count2*2)) {      // If new slide is after last slide...		  		  
							ul2.css("margin-left", "-700%");
							new_slide_index2 = 6;								
					}	  	
					slide_index2 = new_slide_index2;
			});
  }





	$(".sliderT > ul").find('li').each(function(i){  // here we have simply, nice and clear code to set slider position after click on thumb
        
		
		x = i+1;
		if  (x == 1) {
			$(this).click(function(){
				slideTwo(i);
				$(this).effect
			});		
		} else {
			$(this).click(function(){

				if   (pausePlayIndex == 0){    // if it is Play Mode  clear current and set new Interval with new chosen slide at the begining
					clearInterval(myVar);
					myVar = setInterval(function(){ slideTwo(slide_index2+1); slide_index2++; }, 5000);}
					
					
			    if ((i>=0)&& (i<=6)) {  var x = i +6-1; slideTwo(x);}
				if ((i>=7)&&(i<=12)) {  slideTwo(i-1);}
				if ((i>=13)&& (i<=18)) {  var x = i - 6-1; slideTwo(x);}

			});
		}
	});
	
});
