import React, { useState, useEffect } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [timerId, setTimerId] = useState<null | number>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (timerId) {
      clearTimeout(timerId);
    }

    setTimerId(
      setTimeout(() => {
        onSearch(query);
        setTimerId(null);
      }, 500)
    );
  };

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Введите название"
    />
  );
};

export default SearchBar;
