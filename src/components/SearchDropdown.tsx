import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import type { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import debounce from "lodash.debounce";
import { useSearchShowsQuery, type MovieInfo } from "../features/movieApi";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

interface SearchDropdownProps {
  onSelect: (movie: MovieInfo) => void;
}

const textFieldStyles = {
  "& .MuiInputBase-root": {
    backgroundColor: "#18181c",
    color: "#fff",
    fontSize: "1.25rem",
    fontWeight: 500,
    borderRadius: "0.5rem",
    border: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#333",
  },
  "& .MuiInputLabel-root": {
    color: "#aaa",
    fontSize: "1.1rem",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e50914",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e50914",
  },
} as const;

const SearchDropdown: React.FC<SearchDropdownProps> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<MovieInfo | null>(null);

  const debouncedSetQueryRef = useRef<ReturnType<typeof debounce> | undefined>(
    undefined
  );

  useEffect(() => {
    debouncedSetQueryRef.current = debounce((value: string) => {
      setQuery(value);
    }, 500);

    return () => {
      debouncedSetQueryRef.current?.cancel();
    };
  }, []);

  const { data, isFetching } = useSearchShowsQuery(query, { skip: !query });

  const options = useMemo(() => {
    if (!query) return [];
    if (isFetching) return [];
    return data || [];
  }, [query, data, isFetching]);

  const handleInputChange = useCallback((_: unknown, value: string) => {
    setInputValue(value);

    if (value) {
      debouncedSetQueryRef.current?.(value);
    } else {
      debouncedSetQueryRef.current?.cancel();
      setQuery("");
      setSelected(null);
    }
  }, []);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, value: MovieInfo | null) => {
      if (value) {
        onSelect(value);
        setSelected(null);
        setInputValue("");
        setQuery("");
        debouncedSetQueryRef.current?.cancel();
      }
    },
    [onSelect]
  );

  const handleClose = useCallback(() => {
    setSelected(null);
    setInputValue("");
  }, []);

  const getOptionLabel = useCallback(
    (option: MovieInfo) => option.show.name,
    []
  );

  const isOptionEqualToValue = useCallback(
    (option: MovieInfo, value: MovieInfo) => option.show.id === value.show.id,
    []
  );

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, option: MovieInfo) => (
      <li {...props} key={option.show.id}>
        {option.show.name}
      </li>
    ),
    []
  );

  const filterOptions = useCallback((x: MovieInfo[]) => x, []);

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        placeholder="Search Movies..."
        variant="outlined"
        sx={textFieldStyles}
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#aaa" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {isFetching ? (
                <CircularProgress color="inherit" size={20} />
              ) : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    ),
    [isFetching]
  );

  return (
    <Autocomplete
      options={options}
      getOptionLabel={getOptionLabel}
      loading={isFetching}
      value={selected}
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      filterOptions={filterOptions}
      open={Boolean(inputValue) && options.length > 0}
      onClose={handleClose}
      renderOption={renderOption}
      renderInput={renderInput}
      isOptionEqualToValue={isOptionEqualToValue}
      noOptionsText="No options"
    />
  );
};

export default SearchDropdown;
