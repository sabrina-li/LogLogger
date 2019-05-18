$(document).ready(_=>{
    const $waterAddBtn = $(".waterAddBtn");
    const $stoolAddBtn = $(".stoolAddBtn");
    

    $("#waterAddBtn").on("click",function(){
        console.log("clicked");
        console.log($(this).attr("id"));
    });


    $(".sub-button").on("mouseover",function(event){
        $('.modal').modal();
        console.log("hover");
        $(this).addClass("modal-trigger");
    });
});