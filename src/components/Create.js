import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputMask from "react-input-mask";

import firebase from '../Firebase';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('contacts');
    this.state = {
      name: '',
      email: '',
      phone: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    this.ref.add({
      name,
      email,
      phone
    }).then((docRef) => {
      this.setState({
        name: '',
        email: '',
        phone: ''
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { name, email, phone } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" required className="form-control" name="name" value={name} onChange={this.onChange} placeholder="First Last Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" required className="form-control" name="email" value={email} onChange={this.onChange} placeholder="email@domain.com" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <InputMask mask="+55 (99) 99999-9999" className="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="(00) 00000 0000"/>

        </div>
        <Link to={'/'} className="btn btn-danger">Cancel</Link>&nbsp;
        <button type="submit" className="btn btn-success">Save</button>
      </form>
    );
  }
}

export default Create;