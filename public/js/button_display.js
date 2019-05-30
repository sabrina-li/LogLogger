// eslint-disable-next-line no-unused-vars
class ButtonDisplay extends React.Component {
  render() {
    return React.createElement("div", {
      class: "add-button"
    }, React.createElement("div", {
      id: "waterAddBtn",
      class: "sub-button tl",
      "data-target": "modalWater"
    }, React.createElement("i", {
      class: "fas fa-tint ",
      "data-target": "modalWater"
    })), React.createElement("div", {
      id: "stoolAddBtn",
      class: "sub-button tr",
      "data-target": "modalStool"
    }, React.createElement("i", {
      class: "fas fa-poo ",
      "data-target": "modalStool"
    })));
  }

}

ReactDOM.render(React.createElement(ButtonDisplay, null), document.getElementById("button-display"));