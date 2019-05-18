$(document).ready(_=>{
<<<<<<< HEAD
    const $loginBtn = $("#loginBtn");
    const $signupBtn = $("#example-signupBtn");
=======
    var $loginBtn = $("#loginBtn");
    var $signupBtn = $("#example-signupBtn");
>>>>>>> f1b70bc638ff6b8969795a8bb01ca9b420d3c7e0

    $loginBtn.on('click',event=>{
        event.preventDefault();
        const user = {
            username:$("#username").val(),
            password:$("#password").val()
        };
        API.login(user).then(result =>{
            console.log(result);
        });
    });
    $signupBtn.on('click',event=>{
        event.preventDefault();
        const user = {
            username:$("#username").val(),
            password:$("#password").val()
        };
        API.signup(user).then(result =>{
            console.log(result);
        });
    });
});
