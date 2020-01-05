import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../Firebase';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      email: '',
      phone: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('contacts').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const contact = doc.data();
        this.setState({
          key: doc.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ contact: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    const updateRef = firebase.firestore().collection('contacts').doc(this.state.key);
    updateRef.set({
      name,
      email,
      phone
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        email: '',
        phone: ''
      });
      this.props.history.push("/show/" + this.props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Editing {this.state.name}</h2>
        <br />
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Phone" />
        </div>
        <Link to={`/show/${this.state.key}`} className="btn btn-danger">Cancel</Link>&nbsp;
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    );
  }
}

export default Edit;