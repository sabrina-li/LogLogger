$(document).ready(_ => {

    $(document).ready(function () {
        $('.datepicker').datepicker();
    });
    $(document).ready(function () {
        $('select').formSelect();
    });

    $(".sub-button").on("mouseover", function (event) {
        $('.modal').modal();
        $(this).addClass("modal-trigger");
    });


    const handleSuccess = res=>{
        location.reload();
    };
    const HandleError = res =>{
        console.log(res.status,res.responseText);
        const errorDiv = $("div");
        $(".modal-footer").append("Error Occurred: ",res.status," ",res.responseText);
        // errorDiv.css.color = "red";
        // errorDiv.text("Error Occurred: ",res.status," ",res.responseText);
    };

    const options = { 
        success:handleSuccess,  // post-submit callback 
        error: HandleError
    }; 
    $('.addForm').ajaxForm(options);
    
});

