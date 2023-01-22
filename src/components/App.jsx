import React, { Component } from 'react';
export default class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  render() {
    return (
      <div>
        <form action="submit">
          <label htmlFor="name">
            <input
              placeholder="Type something"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
        </form>
      </div>
    );
  }
}
