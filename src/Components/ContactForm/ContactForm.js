import React, { Component } from 'react';

import { v4 as uuidv4 } from 'uuid';

import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  heandleInput = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  createNewContact = event => {
    event.preventDefault();

    this.props.onSubmit({ id: uuidv4(), ...this.state });

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.createNewContact}>
        <label className={styles.label}>
          Name:
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Awesome name"
            value={this.state.name}
            onChange={this.heandleInput}
            required
          />
        </label>
        <label className={styles.label}>
          Phone <span className={styles.example}>(000-00-00)</span>:
          <input
            className={styles.input}
            name="number"
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
            maxLength="9"
            placeholder="Cool phonenumber"
            value={this.state.number}
            onChange={this.heandleInput}
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Create contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
