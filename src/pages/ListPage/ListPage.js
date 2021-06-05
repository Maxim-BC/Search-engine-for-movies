import React, { Component } from "react";
import "./ListPage.css";
import ListMovies from "./ListMovies";
import { getList } from "../../api";

class ListPage extends Component {
  state = {
    movies: [],
    tittleList: "",
  };
  componentDidMount() {
    const item = this.props.match.params.id;

    getList(item).then((data) => {
      console.log(data);
      this.setState({ movies: data.movies });
      this.setState({ tittleList: data.title });
    });
  }

  render() {
    const { movies } = this.state;
    const listMovies = movies.map((itemId) => {
      return <ListMovies key={itemId} id={itemId} />;
    });
    return (
      <div className="list-page">
        <h1 className="list-page__title">{this.state.tittleList}</h1>
        <ul>{listMovies}</ul>
      </div>
    );
  }
}
export default ListPage;
