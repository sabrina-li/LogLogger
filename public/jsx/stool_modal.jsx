// eslint-disable-next-line no-unused-vars
class StoolModal extends React.Component {
    constructor(props){
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
        return (
            <div id="modalStool" className="modal">
                <div className="modal-content">
                    <h4>Add Stool</h4>
                    <form action="/api/stool" method="POST" className="addForm">
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="score" id="stoolInput" type="text" className="validate" required="" aria-required="true" />
                                <label htmlFor="stoolInput">Bristol Score(1-7)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s5">
                                <input name="date" id="stoolDatePicker" type="text" className="datepicker" />
                                <label htmlFor="stoolDatePicker">Choose Date</label>
                            </div>
                            <div className="input-field col s4">
                                <select name="hour">
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
                                <select name="ampm">
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                                <label>AM</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="comment" id="stoolComment" type="text" />
                                <label htmlFor="stoolComment">Comment</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" name="submit" className="btn waves-effect waves-green">Submit</button>
                        </div>
                        <div id="error"></div>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<StoolModal />, document.getElementById("stool-modal"));