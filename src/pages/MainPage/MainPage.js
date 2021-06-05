// MOBILE = 0,
// TABLET = 768,
// DESKTOP = 992,
// WIDESCREEN = 1200,

import React, { Component } from "react";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import Movies from "../../components/Movies/Movies";
import Favorites from "../../components/Favorites/Favorites";
import MobileFavorites from "../../components/Favorites/mobileFavorites/MobileFavorites";

class MainPage extends Component {
  state = {
    arrayFavorites: [],
    searchLine: "",
    curVersion: "",
    quantityItemFavorites: 0,
    isListCreated: false,
  };

  componentDidMount() {
    const { innerWidth } = window;
    if (innerWidth < 769) {
      this.setState({ curVersion: "mobile" });
    } else this.setState({ curVersion: "desktop" });
  }
  changeSearchLine = (evt) => {
    this.setState({
      searchLine: evt,
    });
  };
  addItem = (item) => {
    const array = this.state.arrayFavorites;
    const filterArr = array.filter((arr) => arr.imdbID !== item.imdbID);
    const newArray = [...filterArr, item];
    this.setState({
      arrayFavorites: newArray,
      quantityItemFavorites: this.state.quantityItemFavorites + 1,
    });
  };
  deleteItem = (index) => {
    const array = this.state.arrayFavorites;
    array.splice(index, 1);
    this.setState({
      arrayFavorites: array,
      quantityItemFavorites: this.state.quantityItemFavorites - 1,
    });
  };
  deleteItemFromList = (idItem) => {
    const array = this.state.arrayFavorites;
    const filterArr = array.filter((arr) => arr.imdbID !== idItem);
    const newArray = [...filterArr];
    this.setState({
      arrayFavorites: newArray,
      quantityItemFavorites: this.state.quantityItemFavorites - 1,
    });
  };
  isListCreated = () => {
    this.setState({
      isListCreated: true,
    });
  };
  render() {
    return (
      <div className="main-page">
        <Header />
        <main className="main-page__content">
          <section className="main-page__main-section">
            <div className="main-page__search-box">
              <SearchBox changeSearchLine={this.changeSearchLine} />
            </div>
            <div className="main-page__movies">
              <Movies
                isListCreated={this.state.isListCreated}
                arrayFavorites={this.state.arrayFavorites}
                searchLine={this.state.searchLine}
                addItem={this.addItem}
                deleteItem={this.deleteItemFromList}
              />
            </div>
          </section>
          <aside className="main-page__favorites">
            {this.state.curVersion === "desktop" && (
              <Favorites
                isListCreated={this.isListCreated}
                deleteItem={this.deleteItem}
                arrayFavorites={this.state.arrayFavorites}
              />
            )}
            {this.state.curVersion === "mobile" && (
              <MobileFavorites
                isListCreated={this.isListCreated}
                quantityItemFavorites={this.state.quantityItemFavorites}
                deleteItem={this.deleteItem}
                arrayFavorites={this.state.arrayFavorites}
              />
            )}
          </aside>
        </main>
      </div>
    );
  }
}

export default MainPage;
