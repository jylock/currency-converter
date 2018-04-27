/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Modal, Button, Popover, Tooltip, OverlayTrigger, Glyphicon, Table  } from 'react-bootstrap';

import axios from 'axios';
import data from '../parser/currencies.json';

class CustomModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      currencies: {}
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleAdd(key) {
    this.props.onCurrencyAdd(key);
  }

  componentDidMount() {
    this.setState({currencies: data});
  }

  render() {
    let currencies = this.props.currencies;
    let myCurrencies = this.state.currencies;

    const tableItems = !myCurrencies ? null : Object.keys(myCurrencies).map((key) => {
      if(!currencies.hasOwnProperty(key)){
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{myCurrencies[key]}</td>
            <td>
              <Glyphicon glyph="glyphicon glyphicon-plus-sign text-success" onClick={(e) => this.handleAdd([key, myCurrencies[key]], e)}/>
            </td>
          </tr>
        )
      }
    });

    return (
      <div>

        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Add
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Currency</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Country</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableItems}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CustomModal;
