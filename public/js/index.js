$(document).ready(_=>{
    var $loginBtn = $("#loginBtn");
    var $signupBtn = $("#example-signupBtn");   
    
    $loginBtn.on('click',event=>{
        event.preventDefault();
        const user = {
            username:$("#username").val(),
            password:$("#password").val()
        }
        API.login(user).then(result =>{
            console.log(result);
        })
    });
    $signupBtn.on('click',event=>{
        event.preventDefault();
        const user = {
            username:$("#username").val(),
            password:$("#password").val()
        }
        API.signup(user).then(result =>{
            console.log(result);
        })
    })

})
