import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('contacts');
    this.unsubscribe = null;
    this.state = {
      contacts: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const contacts = [];
    querySnapshot.forEach((doc) => {
      const { name, email, phone } = doc.data();
      contacts.push({
        key: doc.id,
        doc,
        name,
        email,
        phone,
      });
    });
    this.setState({
      contacts
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.contacts.map(contact =>
                    <tr>
                      <td><Link to={`/show/${contact.key}`}>{contact.name}</Link></td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;