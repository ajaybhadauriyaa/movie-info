import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { removeMovie } from "../features/moviesSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const SelectedMoviesList: React.FC = () => {
  const selectedMovies = useSelector(
    (state: RootState) => state.movies.selectedMovies
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageLoading, setImageLoading] = useState<{ [id: number]: boolean }>(
    {}
  );

  if (selectedMovies.length === 0) {
    return (
      <div className="text-center text-gray-400">
        Try searching for a movie...
      </div>
    );
  }

  return (
    <TableContainer
      component={Paper}
      className="bg-gray-800"
      style={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Table size="small" aria-label="selected movies table">
        <TableHead>
          <TableRow sx={{ height: 64 }}>
            <TableCell
              className="text-black"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                position: "sticky",
                top: 0,
                background: "#f5f5f5",
                zIndex: 2,
                width: 100,
                minWidth: 100,
                maxWidth: 100,
                textAlign: "center",
              }}
            >
              S.No.
            </TableCell>
            <TableCell
              className="text-black"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                position: "sticky",
                top: 0,
                background: "#f5f5f5",
                zIndex: 2,
              }}
            >
              Image
            </TableCell>
            <TableCell
              className="text-black"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                position: "sticky",
                top: 0,
                background: "#f5f5f5",
                zIndex: 2,
              }}
            >
              Name
            </TableCell>
            <TableCell
              className="text-black"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                width: 120,
                minWidth: 120,
                maxWidth: 150,
                position: "sticky",
                top: 0,
                background: "#f5f5f5",
                zIndex: 2,
              }}
            >
              Rating
            </TableCell>
            <TableCell
              className="text-black"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                width: 120,
                minWidth: 120,
                maxWidth: 150,
                position: "sticky",
                top: 0,
                background: "#f5f5f5",
                zIndex: 2,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedMovies.map((movie, index) => (
            <TableRow key={movie.show.id} hover sx={{ height: 64 }}>
              <TableCell align="center">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    background: "#e0e7ef",
                    color: "#1e293b",
                    fontWeight: 900,
                    fontSize: "1.5rem",
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                  }}
                >
                  {index + 1}
                </span>
              </TableCell>
              <TableCell>
                {movie.show.image ? (
                  <div style={{ width: 48, height: 64, position: "relative" }}>
                    {imageLoading[movie.show.id] !== false && (
                      <Skeleton
                        variant="rectangular"
                        width={48}
                        height={64}
                        animation="wave"
                        sx={{
                          borderRadius: 1,
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                    )}
                    <img
                      src={movie.show.image.medium}
                      alt={movie.show.name}
                      className="w-12 h-16 object-cover rounded"
                      style={{
                        display:
                          imageLoading[movie.show.id] === false
                            ? "block"
                            : "none",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 48,
                        height: 64,
                        borderRadius: 4,
                      }}
                      onLoad={() =>
                        setImageLoading((prev) => ({
                          ...prev,
                          [movie.show.id]: false,
                        }))
                      }
                      onError={() =>
                        setImageLoading((prev) => ({
                          ...prev,
                          [movie.show.id]: false,
                        }))
                      }
                    />
                  </div>
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                <span
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={() => navigate(`/movie/${movie.show.id}`)}
                  style={{ fontSize: "1.5rem", fontWeight: 800 }}
                >
                  {movie.show.name}
                </span>
              </TableCell>
              <TableCell>{movie.show.rating.average ?? "N/A"}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => dispatch(removeMovie(movie.show.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectedMoviesList;
