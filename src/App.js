import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

// bootstrap
import * as BS from 'react-bootstrap';

// Modal
import CustomModal from './components/CustomModal';

// Use your own currencylayer api-key
import key from "./cred/api-key";
let base = 'http://apilayer.net/api/';


class App extends Component {
  constructor() {
    super();
    this.state = {
      source : '',
      currencies: {
        "USD":"United States Dollar",
        "CNY":"Chinese Yuan",
        "JPY":"Japanese Yen",
        "EUR":"Euro",
        "HUF":"Hungarian Forint",
        "CAD":"Canadian Dollar",
        "GBP":"British Pound Sterling"},
      quotes: {},
      from: 'USD',
      to: '',
      format: 1,
      amount: 1
    };
  }

  // Axios call to fetch data
  fetchData = (newCurrencies) => {
    let currencies = Object.keys(newCurrencies).join(',');
    currencies = "&currencies=" + currencies;

    console.log(base + 'live?' + key + currencies);
    axios.get(base + 'live?' + key + currencies)
      .then(res => {
        this.setState({
          quotes: res.data.quotes,
          currencies: newCurrencies
        });
        console.log(this.state.quotes);
      });
  }

  componentDidMount() {
    this.fetchData(this.state.currencies);
  }



  // Action / Handle functions


  // delete a currency (table row)
  handleDelete = (key) => {
    let tmp = "USD" + key;
    let quotes = Object.assign({}, this.state.quotes);
    delete quotes[tmp];

    let currencies = Object.assign({}, this.state.currencies);
    delete currencies[key];

    this.setState({
      quotes: quotes,
      currencies: currencies
    });
  }

  // add a new currency
  handleAdd = (input) => {
    let key = input[0];
    let value = input[1];
    let currencies = Object.assign({}, this.state.currencies);
    currencies[key] = value;
    this.fetchData(currencies);
  }


  render() {
    const quotes = this.state.quotes;
    const currencies = this.state.currencies;

    const tableItems = !currencies ? null : Object.keys(currencies).map((key) => {
      let tmp = "USD" + key;
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{currencies[key]}</td>
          <td>{quotes[tmp]}</td>
          <td>
            <BS.Glyphicon glyph="glyphicon glyphicon-minus-sign text-danger" onClick={(e) => this.handleDelete(key, e)}/>
          </td>
        </tr>
      )
    });

    return (
      <div className="App container-fluid">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Currency Converter</h1>
        </header>

        <br></br>

        <div className="row">
          <CustomModal currencies={currencies} onCurrencyAdd={this.handleAdd}></CustomModal>
        </div>

        <br></br>

        <div className="row"> {/* three columns*/}
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <BS.Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Country</th>
                  <th>Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableItems}
              </tbody>
            </BS.Table>
          </div>
          <div className="col-lg-4"></div>
        </div>

      </div>
    );
  }
}

export default App;
