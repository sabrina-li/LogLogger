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
        return (
            <div id="modalWater" className="modal">
                <div className="modal-content">
                    <h4>Add Water</h4>
                    <form action="/api/water" method="POST" className="addForm">
                        <div class="row">
                            <div class="input-field col s12">
                                <input
                                    name="intake"
                                    id="waterInput"
                                    type="text"
                                    className="validate"
                                    required=""
                                    aria-required="true"
                                    value={this.state.intake}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="waterInput">Water Intake(ml)</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s5">
                                <input
                                    name="date"
                                    id="waterDatePicker"
                                    type="text"
                                    className="datepicker"
                                    value={this.state.date}
                                    onChange={this.handleInputChange} />
                                <label htmlFor="waterDatePicker">Choose Date</label>
                            </div>
                            <div className="input-field col s4">
                                <select name="hour" value={this.state.hour} onChange={this.handleSelectChange}>
                                    <option value="" disabled selected>Choose Hour</option>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                    <option value="5">05</option>
                                    <option value="6">06</option>
                                    <option value="7">07</option>
                                    <option value="8">08</option>
                                    <option value="9">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <label>Time</label>
                            </div>
                            <div className="input-field col s3">
                                <select name="ampm" value={this.state.ampm} onChange={this.handleSelectChange}>
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                                <label>AM</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" name="submit" className="btn waves-effect waves-green">Submit</button>
                        </div>
                        <div id="error"></div>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<WaterModal />, document.getElementById("water-modal"));