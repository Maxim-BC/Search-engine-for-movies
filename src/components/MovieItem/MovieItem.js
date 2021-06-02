import React, { Component } from "react";
import "./MovieItem.css";

class MovieItem extends Component {
  render() {
    const { Title, Year, Poster, imdbID } = this.props;
    const imgPoster =
      Poster === "N/A" ? (
        <div className="not-poster">
          <p>Unfortunately, there is no poster for this film...</p>
        </div>
      ) : (
        <img className="movie-item__poster" src={Poster} alt={Title} />
      );
    return (
      <article className="movie-item">
        {imgPoster}
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          <button
            type="button"
            onClick={() => this.props.addItem({ Title, Year, Poster, imdbID })}
            className="movie-item__add-button"
          >
            Добавить в список
          </button>
        </div>
      </article>
    );
  }
}

export default MovieItem;
