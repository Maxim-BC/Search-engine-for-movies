import React, { Component } from "react";
import "./MobileFavorites.css";
import { registerList } from "../../../api";
import { Link } from "react-router-dom";
export default class MbileFavorites extends Component {
  state = {
    tittle: "",
    idList: "",

    btnOpenSaveList: "show",
    showSaveList: "hide",
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
  openMenuSaveList = () => {
    this.setState({
      btnOpenSaveList: "hide",
      showSaveList: "mobile_favorites",
    });
  };
  cancel = () => {
    this.setState({
      btnOpenSaveList: "show",
      showSaveList: "hide",
    });
  };
  render() {
    const { arrayFavorites } = this.props;
    const resultList =
      arrayFavorites === [] ? (
        <p>Loading...</p>
      ) : (
        arrayFavorites.map((item, index) => {
          return (
            <li className="point_mobile_favorites" key={item.imdbID}>
              {item.Title} ({item.Year})
              <button
                disabled={this.state.idList}
                className="mobile_favorites_btn_delete"
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
        <div>
          <button
            onClick={this.createList}
            type="button"
            className="mobile_favorites__save"
            disabled={!this.state.tittle || arrayFavorites.length === 0}
          >
            Сохранить список
          </button>{" "}
          <button
            onClick={this.cancel}
            type="button"
            className="mobile_favorites__save"
          >
            Назад
          </button>
        </div>
      ) : (
        <Link to={`/list/${this.state.idList}`}>Перейти к списку.</Link>
      );
    return (
      <>
        <button
          onClick={this.openMenuSaveList}
          className={this.state.btnOpenSaveList}
        >
          <p>&#9776;</p>
          {this.props.quantityItemFavorites}
        </button>
        <div className={this.state.showSaveList}>
          <label>
            <input
              disabled={this.state.idList}
              onFocus={this.inputFocus}
              onBlur={this.inputBlur}
              onChange={this.changeNameList}
              type="text"
              value={this.state.tittle}
              placeholder="Новый список"
              className="mobile_favorites__name"
            />
          </label>

          <ul className="mobile_favorites__list">{resultList}</ul>
          {linkAndBtnSaveList}
        </div>
      </>
    );
  }
}
