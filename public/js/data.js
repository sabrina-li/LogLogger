$(document).ready(_ => {
    const $waterAddBtn = $(".waterAddBtn");
    const $stoolAddBtn = $(".stoolAddBtn");
    $(document).ready(function () {
        $('.datepicker').datepicker();
    });
    $(document).ready(function () {
        $('select').formSelect();
    });


    // $("#waterAddBtn").on("click", function () {
    //     console.log("clicked");
    //     console.log($(this).attr("id"));
    // });


    $(".sub-button").on("mouseover", function (event) {
        $('.modal').modal();
        console.log("hover");
        $(this).addClass("modal-trigger");
    });

});