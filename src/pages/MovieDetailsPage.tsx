import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { removeMovie } from "../features/moviesSlice";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import DOMPurify from "dompurify";

type CastMember = {
  person: {
    name: string;
  };
};

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) =>
    state.movies.selectedMovies.find((m) => m.show.id === Number(id))
  );
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!movie) {
      navigate("/", { replace: true });
    }
  }, [movie, navigate]);

  if (!movie) return null;

  const handleDelete = () => {
    dispatch(removeMovie(movie.show.id));
    navigate("/");
  };

  const year = movie.show.premiered ? movie.show.premiered.slice(0, 4) : "";
  const genres = movie.show.genres ? movie.show.genres.join(", ") : "";
  const cast = movie.show._embedded?.cast
    ?.map((c: CastMember) => c.person.name)
    .join(", ");

  return (
    <div className="min-h-screen w-full flex flex-col-reverse md:flex-row items-stretch bg-[#141414] text-white relative">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 z-10 md:max-w-2xl md:mr-10">
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            color: "#fff",
            background: "#181818cc",
            "&:hover": { background: "#333" },
            zIndex: 20,
          }}
          size="large"
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <div className="mb-6 mt-8 md:mt-0">
          <div className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            {movie.show.name}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-300 text-lg">
            {year && <span>{year}</span>}
            {movie.show.rating.average && (
              <span className="border border-gray-500 rounded px-2 py-0.5 text-sm">
                {movie.show.rating.average}
              </span>
            )}
            {genres && <span>{genres}</span>}
          </div>
          <div
            className="mb-6 text-lg text-gray-200"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(movie.show.summary || ""),
            }}
          />
          {cast && (
            <div className="mb-6 text-gray-400 text-base">
              <span className="font-semibold text-gray-300">Starring:</span>{" "}
              {cast}
            </div>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: 1,
              backgroundColor: "#e50914",
              "&:hover": { backgroundColor: "#b0060f" },
            }}
          >
            DELETE FROM LIST
          </Button>
        </div>
      </div>
      <div className="flex-1 relative flex items-center justify-center min-h-[400px] md:min-h-0">
        {movie.show.image ? (
          <div
            className="relative w-full md:max-w-xl"
            style={{ height: "500px", maxHeight: "600px" }}
          >
            {!imgLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                className="absolute top-0 left-0 w-full h-full rounded-none md:rounded-l-lg z-10"
                sx={{ bgcolor: "#e0e7ef" }}
              />
            )}
            <img
              src={movie.show.image.original || movie.show.image.medium}
              alt={movie.show.name}
              className={`absolute top-0 left-0 object-cover w-full h-full rounded-none md:rounded-l-lg shadow-2xl transition-opacity duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#141414] via-[#141414b3] to-transparent md:rounded-l-lg" />
          </div>
        ) : (
          <div
            className="flex items-center justify-center w-full md:max-w-xl bg-[#e0e7ef] text-[#1e293b] border border-gray-300 rounded-none md:rounded-l-lg shadow-2xl"
            style={{ height: "500px", maxHeight: "600px" }}
          >
            <span style={{ fontSize: "2rem", fontWeight: 700, opacity: 0.7 }}>
              No Image Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
