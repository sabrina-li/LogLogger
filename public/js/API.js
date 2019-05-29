const API = {
    login: (userCreds)=> {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/login",
            data: JSON.stringify(userCreds)
        });
    },
    signup: (userCreds)=> {
        return $.ajax({
            url: "api/signup",
            type: "POST",
            data: JSON.stringify(userCreds)
        });
    },
    getAllData: _=>{
        return $.ajax({
            url: "/api/alldata",
            type: "get",
        });
    }
};
