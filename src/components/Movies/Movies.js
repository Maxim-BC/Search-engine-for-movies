import React, { useState, useEffect } from "react";
import MovieItem from "../MovieItem/MovieItem";
import "./Movies.css";

export default function Movies({ searchLine, addItem }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (searchLine !== "" && searchLine.Error !== "Movie not found!") {
      setMovies(searchLine.Search);
      setError(null);
    }

    if (searchLine.Error === "Movie not found!") {
      setError("Movie not found!");
    }
    if (searchLine.Error === "Too many results.") {
      setError("Too many results.");
    }
  }, [searchLine]);
  const result =
    error === null ? (
      <ul className="movies">
        {movies.map((movie) => (
          <li className="movies__item" key={movie.imdbID}>
            <MovieItem {...movie} addItem={addItem} />
          </li>
        ))}
      </ul>
    ) : (
      <h1>{error}</h1>
    );
  return <>{result}</>;
}
