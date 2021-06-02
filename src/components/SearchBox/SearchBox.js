import React, { Component } from "react";
import { searchItem } from "../../api";

import "./SearchBox.css";

class SearchBox extends Component {
  state = {
    searchLine: "",
    nameFilm: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ nameFilm: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    const { nameFilm } = this.state;
    e.preventDefault();
    searchItem(nameFilm).then((film) => {
      console.log(film);
      this.setState({ searchLine: film });
      this.props.changeSearchLine(film);
    });
  };
  render() {
    const { nameFilm } = this.state;
    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={nameFilm}
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!nameFilm}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
