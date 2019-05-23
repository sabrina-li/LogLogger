$(window).on("scroll",event=>{
    scrollTop = $(window).scrollTop();
    $('.text').css('transform','translate3d(0px, '+scrollTop+'px, 0px)');
});