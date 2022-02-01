import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            registration: '',
            flight_number:'',
            station: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            registration: nextProps.registration,
            flight_number:nextProps.flight_number,
            station: nextProps.station,
        });
    }

    registrationHandler(e) {
        this.setState({ registration: e.target.value });
    }
    stationHandler(e) {
        this.setState({ flight_number: e.target.value });
    }
    stationHandler(e) {
        this.setState({ station: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails(item)
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-registration" id="exampleModalLabel">Edit QCM</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><span className="modal-lable">registration:</span><input value={this.state.registration} onChange={(e) => this.registrationHandler(e)} /></p>
                            <p><span className="modal-lable">flight_number:</span><input value={this.state.flight_number} onChange={(e) => this.stationHandler(e)} /></p>
                            <p><span className="modal-lable">station:</span><input value={this.state.station} onChange={(e) => this.stationHandler(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;