import React, { Component } from 'react';

import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';
import Alert from './Components/Alert';

import { CSSTransition } from 'react-transition-group';

import styles from './styles/App.module.css';
import './styles/animation.css';
import './styles/index.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    alert: false,
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  filterInput = ({ currentTarget }) => {
    this.setState({ filter: currentTarget.value });
  };

  createNewContact = ({ id, name, number }) => {
    if (this.verifyNewContact(name, number)) {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, { id, name, number }],
      }));
    }
  };

  verifyNewContact = (newName, newNumber) => {
    let verify = true;
    this.state.contacts.forEach(({ name, number }) => {
      if (
        name.toLowerCase() === newName.toLowerCase() ||
        newNumber === number
      ) {
        this.setState({ alert: true });
        setTimeout(() => this.setState({ alert: false }), 2000);
        verify = false;
      }
    });

    return verify;
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteContact = event => {
    const deleteId = event.currentTarget.id;

    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  render() {
    const { alert, contacts } = this.state;
    const filteredContacts = this.filteredContacts();

    return (
      <div className={styles.mainDiv}>
        <div className={styles.container}>
          <CSSTransition
            in={true}
            appear={true}
            timeout={250}
            classNames="title"
            unmountOnExit
          >
            <h1 className={styles.title}>Phonebook</h1>
          </CSSTransition>
          <ContactForm onSubmit={this.createNewContact} />
          <CSSTransition
            in={contacts.length > 1}
            appear={true}
            timeout={250}
            classNames="fade"
            unmountOnExit
          >
            <Filter value={this.state.filter} onChange={this.filterInput} />
          </CSSTransition>
          <ContactList
            contacts={filteredContacts}
            deleteOnClick={this.deleteContact}
          />

          <CSSTransition
            in={alert}
            appear={true}
            timeout={250}
            classNames="fade"
            unmountOnExit
          >
            <Alert text="Contact is already exist" />
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default App;
