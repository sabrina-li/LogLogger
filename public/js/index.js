$(document).ready(_=>{
    const $loginoutBtn = $(".loginoutBtn");
    $loginoutBtn.on("click",function(event){
        if($(this).attr("data")==="Logout"){
            $.ajax({
                method: "GET",
                url: "/logout"
            }).then(res=>{
                console.log(res);
            });
        }
    });
});
