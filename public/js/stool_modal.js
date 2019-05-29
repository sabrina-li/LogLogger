// eslint-disable-next-line no-unused-vars
class StoolModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: "",
      date: "",
      hour: "1",
      ampm: "am"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "text";
    const name = target.value;
    this.setState({
      [name]: value
    });
  }

  handleSelectChange(event) {
    const target = event.target;
    const value = target.type === "dropdown" ? target.selected : target.value;
    this.setState({
      [value]: value
    });
  }

  render() {
    return React.createElement("div", {
      id: "modalStool",
      className: "modal"
    }, React.createElement("div", {
      className: "modal-content"
    }, React.createElement("h4", null, "Add Stool"), React.createElement("form", {
      action: "/api/stool",
      method: "POST",
      className: "addForm"
    }, React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "input-field col s12"
    }, React.createElement("input", {
      name: "score",
      id: "stoolInput",
      type: "text",
      className: "validate",
      required: "",
      "aria-required": "true"
    }), React.createElement("label", {
      htmlFor: "stoolInput"
    }, "Bristol Score(1-7)"))), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "input-field col s5"
    }, React.createElement("input", {
      name: "date",
      id: "stoolDatePicker",
      type: "text",
      className: "datepicker"
    }), React.createElement("label", {
      htmlFor: "stoolDatePicker"
    }, "Choose Date")), React.createElement("div", {
      className: "input-field col s4"
    }, React.createElement("select", {
      name: "hour"
    }, React.createElement("option", {
      value: "",
      disabled: true,
      selected: true
    }, "Choose Hour"), React.createElement("option", {
      value: "1"
    }, "01"), React.createElement("option", {
      value: "2"
    }, "02"), React.createElement("option", {
      value: "3"
    }, "03"), React.createElement("option", {
      value: "4"
    }, "04"), React.createElement("option", {
      value: "5"
    }, "05"), React.createElement("option", {
      value: "6"
    }, "06"), React.createElement("option", {
      value: "7"
    }, "07"), React.createElement("option", {
      value: "8"
    }, "08"), React.createElement("option", {
      value: "9"
    }, "09"), React.createElement("option", {
      value: "10"
    }, "10"), React.createElement("option", {
      value: "11"
    }, "11"), React.createElement("option", {
      value: "12"
    }, "12")), React.createElement("label", null, "Time")), React.createElement("div", {
      className: "input-field col s3"
    }, React.createElement("select", {
      name: "ampm"
    }, React.createElement("option", {
      value: "AM"
    }, "AM"), React.createElement("option", {
      value: "PM"
    }, "PM")), React.createElement("label", null, "AM"))), React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "input-field col s12"
    }, React.createElement("input", {
      name: "comment",
      id: "stoolComment",
      type: "text"
    }), React.createElement("label", {
      htmlFor: "stoolComment"
    }, "Comment"))), React.createElement("div", {
      className: "modal-footer"
    }, React.createElement("button", {
      type: "submit",
      name: "submit",
      className: "btn waves-effect waves-green"
    }, "Submit")), React.createElement("div", {
      id: "error"
    }))));
  }

}

ReactDOM.render(React.createElement(StoolModal, null), document.getElementById("stool-modal"));