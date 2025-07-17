import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchDropdown from "../components/SearchDropdown";
import SelectedMoviesList from "../components/SelectedMoviesList";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/moviesSlice";
import type { MovieInfo } from "../features/movieApi";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleSelect = (movie: MovieInfo) => {
    dispatch(addMovie(movie));
  };

  return (
    <Box
      className="min-h-screen w-full flex flex-col items-center justify-start"
      style={{
        background: "#141414",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
      }}
    >
      <Typography
        variant="h2"
        className="font-extrabold text-white text-center drop-shadow-lg netflix-title text-4xl sm:text-5xl md:text-6xl tracking-tight"
        style={{
          letterSpacing: "-2px",
          marginBottom: "1.5rem",
          marginTop: "1.5rem",
        }}
      >
        Movie Info
      </Typography>
      <div
        className="w-full flex justify-center"
        style={{ marginBottom: "3rem" }}
      >
        <div className="w-full max-w-2xl">
          <SearchDropdown onSelect={handleSelect} />
        </div>
      </div>
      <div className="w-full px-2">
        <SelectedMoviesList />
      </div>
    </Box>
  );
};

export default HomePage;
