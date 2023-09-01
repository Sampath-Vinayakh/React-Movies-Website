export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img
        src={movie.Poster === "N/A" ? "no-image.png" : movie.Poster}
        alt=""
      />
      <h3>{movie.Title}</h3>
      <div>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbId)}
        >
          <i className="fa-solid fa-delete-left fa-xl"></i>
        </button>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} mins</span>
        </p>
      </div>
    </li>
  );
}
