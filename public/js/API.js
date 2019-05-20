const API = {
    login: function(userCreds) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "api/login",
            data: JSON.stringify(userCreds)
        });
    },
    signup: function(userCreds) {
        return $.ajax({
            url: "api/signup",
            type: "POST",
            data: JSON.stringify(userCreds)
        });
    }
};
