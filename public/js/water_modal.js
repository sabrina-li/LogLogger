// eslint-disable-next-line no-unused-vars
class WaterModal extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      intake: "",
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
      id: "modalWater",
      className: "modal"
    }, React.createElement("div", {
      className: "modal-content"
    }, React.createElement("h4", null, "Add Water"), React.createElement("form", {
      action: "/api/water",
      method: "POST",
      className: "addForm"
    }, React.createElement("div", {
      class: "row"
    }, React.createElement("div", {
      class: "input-field col s12"
    }, React.createElement("input", {
      name: "intake",
      id: "waterInput",
      type: "text",
      className: "validate",
      required: "",
      "aria-required": "true",
      value: this.state.intake,
      onChange: this.handleInputChange
    }), React.createElement("label", {
      htmlFor: "waterInput"
    }, "Water Intake(ml)"))), React.createElement("div", {
      class: "row"
    }, React.createElement("div", {
      class: "input-field col s5"
    }, React.createElement("input", {
      name: "date",
      id: "waterDatePicker",
      type: "text",
      className: "datepicker",
      value: this.state.date,
      onChange: this.handleInputChange
    }), React.createElement("label", {
      htmlFor: "waterDatePicker"
    }, "Choose Date")), React.createElement("div", {
      className: "input-field col s4"
    }, React.createElement("select", {
      name: "hour",
      value: this.state.hour,
      onChange: this.handleSelectChange
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
      name: "ampm",
      value: this.state.ampm,
      onChange: this.handleSelectChange
    }, React.createElement("option", {
      value: "AM"
    }, "AM"), React.createElement("option", {
      value: "PM"
    }, "PM")), React.createElement("label", null, "AM"))), React.createElement("div", {
      class: "modal-footer"
    }, React.createElement("button", {
      type: "submit",
      name: "submit",
      className: "btn waves-effect waves-green"
    }, "Submit")), React.createElement("div", {
      id: "error"
    }))));
  }

}

ReactDOM.render(React.createElement(WaterModal, null), document.getElementById("water-modal"));