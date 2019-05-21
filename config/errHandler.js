module.exports = {
    handle: function (err) {
        console.error("There was an error performing the operation");
        console.log(err);
        console.log(err.code);
        return console.error(err.message);
    }
};