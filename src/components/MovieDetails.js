import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { useKey } from "./useKey";
import Loader from "./Loader";
import { KEY } from "../App";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  function handleAdd() {
    const watchedMovie = {
      imdbId: selectedId,
      Title: movie.Title,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(watchedMovie);
    onCloseMovie();
  }

  useKey("Backspace", onCloseMovie);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = movie.Title;
    return function () {
      document.title = "usePopcorn";
    };
  }, [movie.Title]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <header>
        <img
          src={movie.Poster === "N/A" ? "no-image.png" : movie.Poster}
          alt=""
        />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released === "N/A" ? "Date unavaiable" : movie.Released}{" "}
            &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre === "N/A" ? "Genre unavaiable" : movie.Genre}</p>
          <p>
            <span>⭐️</span> {movie.imdbRating} IMDB rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={25}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>Movie is already rated with {watchedUserRating} ⭐</p>
          )}
        </div>

        <p>
          <em>
            {movie.Plot === "N/A" ? "No description avaialble" : movie.Plot}
          </em>
        </p>
        <p>Starring {movie.Actors}</p>
        <p>Directed by {movie.Director}</p>
      </section>
    </div>
  );
}
