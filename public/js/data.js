$(document).ready(_ => {

    $(document).ready(function () {
        $('.datepicker').datepicker();
        // $('.tooltipped').tooltip();
    });
    $(document).ready(function () {
        $('select').formSelect();
    });

    $('.modal').modal();

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

//Materialize with vanilla js
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});