"use strict";

const e = React.createElement;

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
}

const domContainer = document.querySelector("#login_btn");
ReactDOM.render(e(Buttons), domContainer);