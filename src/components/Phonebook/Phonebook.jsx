import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import PhonebookList from 'components/PhonebookList/PhonebookList';
import PhonebookFilter from 'components/PhonebookFilter/PhonebookFilter';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import styles from './phonebook.module.css';

export default class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return Report.failure(
        'Oooops',
        `Contact with name: ${name} or number: ${number} is already in contacts`,
        'OK'
      );
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts] };
    });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  isDublicate(name, number) {
    const normilizedName = name.toLowerCase();
    const normilizedNumber = number.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normilizedName ||
        number.toLowerCase() === normilizedNumber
      );
    });
    return Boolean(result);
  }

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normilizedFilter = filter.toLowerCase();

    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normilizedFilter) ||
        number.toLowerCase().includes(normilizedFilter)
      );
    });
    return result;
  }

  render() {
    const { addContact, handleFilter, removeContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Phonebook</h3>
          <div className={styles.block}>
            <PhonebookForm onSubmit={addContact} />
          </div>
          <h3 className={styles.title}>Contacts</h3>
          <div className={styles.block}>
            <PhonebookFilter handleChange={handleFilter} />
            <PhonebookList removeContact={removeContact} contacts={contacts} />
          </div>
        </div>
      </div>
    );
  }
}
