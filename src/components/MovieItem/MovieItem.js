import React, { Component } from "react";
import "./MovieItem.css";

class MovieItem extends Component {
  render() {
    const { Title, Year, Poster, imdbID, arrayFavorites, isListCreated } =
      this.props;

    const imgPoster =
      Poster === "N/A" ? (
        <div className="not-poster">
          <p>Unfortunately, there is no poster for this film...</p>
        </div>
      ) : (
        <img className="movie-item__poster" src={Poster} alt={Title} />
      );

    const resultFind = arrayFavorites.find((item) => item.imdbID === imdbID);
    const resultStateBtnAdd =
      resultFind === undefined ? "Добавить в список" : "Добавлено";

    return (
      <article className="movie-item">
        {imgPoster}
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          {!isListCreated && (
            <button
              type="button"
              disabled={resultStateBtnAdd === "Добавлено"}
              onClick={() =>
                this.props.addItem({ Title, Year, Poster, imdbID })
              }
              className="movie-item__add-button"
            >
              {resultStateBtnAdd}
            </button>
          )}
        </div>
      </article>
    );
  }
}

export default MovieItem;
