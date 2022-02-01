import React, { Component } from 'react';
import Modal from './Modal.js';

class List extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    const data0=this.props.data
    
    this.state = {
      requiredItem: 0,
      // brochure: data0
      brochure: [
        {
          registration: "Gold",
          flight_number:"5",
          station: "24k Bracelet"
        }, {
          registration: "Silver",
          flight_number:"4",
          station: "Necklace"
        }, {
          registration: "Diamond",
          flight_number:"3",
          station: "Ring"
        }
      ]
    }
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    tempbrochure[requiredItem] = item;
    this.setState({ brochure: tempbrochure });
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }



  render() {   
    console.log( "data",this.props.data) 
    const brochure = this.state.brochure.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.registration}</td>
          <td>{item.flight_number}</td>
          <td>{item.station}</td>
          <td>
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
              onClick={() => this.replaceModalItem(index)}>edit</button> {" "}
            <button className="btn btn-danger" onClick={() => this.deleteItem(index)}>remove</button>
          </td>
        </tr>
      )
    });
    
    const requiredItem = this.state.requiredItem;
    let modalData = this.state.brochure[requiredItem];
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>Editable Bootstrap Modal In React</h1>
          <h6>Bootstrap 4.0.0-beta.3</h6>
        </div>
        <table className="table table-striped">
          <tbody>
            {brochure}
          </tbody>
        </table>
        <Modal
          registration={modalData.registration}
          flight_number={modalData.flight_number}
          station={modalData.station}
          saveModalDetails={this.saveModalDetails}
        />
      </div>
    );
  }
}

export default List;
