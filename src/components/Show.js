import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('contacts').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contact: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase.firestore().collection('contacts').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="panel-body">
        <h2> {this.state.contact.name}</h2>
        <br />
        <dl>
          <dt>ID:</dt>
          <dd>{this.state.key}</dd>
          <dt>Email:</dt>
          <dd>{this.state.contact.email}</dd>
          <dt>Phone:</dt>
          <dd>{this.state.contact.phone}</dd>
        </dl>
        <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>&nbsp;
        <Link to={'/'} className="btn btn-primary">Back</Link>&nbsp;
        <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>
      </div>
    );
  }
}

export default Show;