import React, { Component } from "react";
import "./Favorites.css";
import { registerList } from "../../api";
import { Link } from "react-router-dom";
export default class Favorites extends Component {
  state = {
    tittle: "",
    idList: "",
  };

  createList = () => {
    let result = this.props.arrayFavorites.map((item) => item.imdbID);
    const { tittle } = this.state;
    registerList(tittle, result)
      .then(
        (resBody) => this.setState({ idList: resBody.id }),
        this.props.isListCreated()
      )
      .catch((err) => console.log(`Ошибка: ${err}`));
  };
  changeNameList = (evt) => {
    this.setState({ tittle: evt.target.value });
  };
  render() {
    const { arrayFavorites } = this.props;
    const resultList =
      arrayFavorites === [] ? (
        <p>Loading...</p>
      ) : (
        arrayFavorites.map((item, index) => {
          return (
            <li className="point-favorites" key={item.imdbID}>
              {item.Title} ({item.Year})
              <button
                disabled={this.state.idList}
                className="btn-delete"
                onClick={() => this.props.deleteItem(index)}
              >
                X
              </button>
            </li>
          );
        })
      );
    const linkAndBtnSaveList =
      this.state.idList === "" ? (
        <button
          onClick={this.createList}
          type="button"
          className="favorites__save"
          disabled={!this.state.tittle || arrayFavorites.length === 0}
        >
          Сохранить список
        </button>
      ) : (
        <Link to={`/list/${this.state.idList}`}>Перейти к списку.</Link>
      );
    return (
      <div className="favorites">
        <label>
          <input
            disabled={this.state.idList}
            onFocus={this.inputFocus}
            onBlur={this.inputBlur}
            onChange={this.changeNameList}
            type="text"
            value={this.state.tittle}
            placeholder="Новый список"
            className="favorites__name"
          />
        </label>

        <ul className="favorites__list">{resultList}</ul>
        {linkAndBtnSaveList}
      </div>
    );
  }
}
