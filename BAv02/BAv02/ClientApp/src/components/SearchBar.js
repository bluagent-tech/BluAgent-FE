import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ options, onSelection }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(false);
  const searchListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchListRef.current && !searchListRef.current.contains(event.target)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  const handleSelect = (selectedItem) => {
    setSearchTerm(selectedItem.value);
    setShowList(false);
    onSelection(selectedItem);
  };

  const handleClear = () => {
    setSearchTerm("");
    setShowList(false);
  };

  return (
    <div className="input-group mb-3" ref={searchListRef}>
      <input
        type="text"
        className="form-control"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={handleSearch}
      />
      <div className="input-group-append">
        <button
          className="clear-button"
          type="button"
          onClick={handleClear}
        >
          X
        </button>
      </div>
      {showList && (
        <div className="search-list">
          {options
            .filter((item) =>
              item.value.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.key}
                className="search-list-item"
                onClick={() => handleSelect(item)}
              >
                {item.value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
