import PropTypes from 'prop-types';

import { Component } from 'react';

import styles from './phonebook-form.module.css';

class PhonebookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            placeholder="Type name"
            type="text"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Number:</label>
          <input
            placeholder="Type number"
            type="tel"
            name="number"
            onChange={handleChange}
            value={number}
          />
        </div>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default PhonebookForm;

PhonebookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
