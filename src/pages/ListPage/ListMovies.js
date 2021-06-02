import React from "react";
import "./ListPage.css";
import { useState, useEffect } from "react";
import { searchFilmInList } from "../../api";

export default function ListMovies({ id }) {
  const [infoMovie, setInfoMovie] = useState([]);
  useEffect(() => {
    searchFilmInList(id).then((item) => {
      setInfoMovie(item);
      console.log(item);
    });
  }, [id]);

  const imgPoster =
    infoMovie.Poster === "N/A" ? (
      <div className="not-poster-list-movies">
        <p>Unfortunately, there is no poster for this film...</p>
      </div>
    ) : (
      <img
        className="img-list-movies"
        src={infoMovie.Poster}
        alt={infoMovie.Title}
      />
    );

  return (
    <li className="point-list" key={infoMovie.imdbID}>
      {imgPoster}
      <a
        href={`https://www.imdb.com/title/${infoMovie.imdbID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {infoMovie.Title} ({infoMovie.Year})
      </a>
    </li>
  );
}
