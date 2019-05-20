"use strict";

const e = React.createElement;

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
}

const domContainer = document.querySelector("#button_display");
ReactDOM.render(e(Buttons), domContainer);