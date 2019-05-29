// eslint-disable-next-line no-unused-vars
class ButtonDisplay extends React.Component {
    render () {
        return (
            <div class="add-button">
                <div id="waterAddBtn" class="sub-button tl" data-target="modalWater"><i class="fas fa-tint "
                    data-target="modalWater"></i></div>
                <div id="stoolAddBtn" class="sub-button tr" data-target="modalStool"><i class="fas fa-poo "
                    data-target="modalStool"></i></div>
            </div>
        );
    }
}

ReactDOM.render(<ButtonDisplay />, document.getElementById("button-display"));