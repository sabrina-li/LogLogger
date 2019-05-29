$(document).ready(_ => {

    $(document).ready(function () {
        $('.datepicker').datepicker();
        // $('.tooltipped').tooltip();
    });
    $(document).ready(function () {
        $('select').formSelect();
    });

    $(".sub-button").on("mouseover", function (event) {
        $('.modal').modal();
        $(this).addClass("modal-trigger");
    });

    $("#stool-slider").on('input',function(event){
        const val = $(this).val();
        const html = `<img src="/images/${val}.png" width="400px">`;
        $('.tooltipped').tooltip({delay: 50, html: html});
        $('.tooltipped').tooltip('close');
        $('.tooltipped').tooltip('open');
    });

    const handleSuccess = res=>{
        location.reload();
    };
    const HandleError = res =>{
        console.log(res.status,res.responseText);
        $("#error").empty();
        $("#error").append("Error Occurred: ",res.status," ",res.responseText);
    };

    const options = { 
        success:handleSuccess,  // post-submit callback 
        error: HandleError
    }; 
    $('.addForm').ajaxForm(options);
    
});

