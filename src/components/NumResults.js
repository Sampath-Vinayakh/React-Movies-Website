export default function NumResults({ movies }) {
  return (
    <p className="num-results">
      {movies ? `Found ${movies?.length} results` : ""}
    </p>
  );
}
