import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchQueue: '',
  };

  handleSearchInput = e => {
    this.setState({
      searchQueue: e.target.value,
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQueue.trim());
    this.setState({
      searchQueue: '',
    });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQueue}
            onChange={this.handleSearchInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
