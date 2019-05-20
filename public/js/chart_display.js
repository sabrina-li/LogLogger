"use strict";

const e = React.createElement;

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

}

const domContainer = document.querySelector("#chart_display");
ReactDOM.render(e(Chart), domContainer);