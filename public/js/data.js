$(document).ready(_=>{
    const $waterAddBtn = $(".waterAddBtn");
    const $stoolAddBtn = $(".stoolAddBtn");
    $('.modal').modal();

    $("#waterAddBtn").on("click",function(){
        console.log("clicked");
        console.log($(this).attr("id"));
        // $('#modalWater').modal("open");
    });
});