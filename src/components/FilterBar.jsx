import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import RangeSlider from "./RangeSlider";

const resultsPaginationNumber = [5, 10, 15, 20, 25];
const sortInfo = [
  { label: "Ascending by age", value: "age:asc" },
  { label: "Descending by age", value: "age:desc" },
  { label: "Ascending by name", value: "name:asc" },
  { label: "Descending by name", value: "name:desc" },
];

export default function FilterBar({
  setFavorites,
  setSearchParams,
  setIsMatchOpen,
  setMatch,
  favorites,
  setMatchLoading,
}) {
  const [error, setError] = useState(false);
  const [matchError, setMatchError] = useState({ bool: false, message: "" });
  const [searchTerms, setSearchTerms] = useState({
    breeds: "",
    zipCodes: "",
    ageMin: 0,
    ageMax: 20,
    size: "",
    sort: "",
  });
  const [breedList, setBreedList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/dogs/breeds`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setBreedList(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBreeds();
  }, []);

  const searchChangeHandler = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prev) => ({ ...prev, [name]: value }));
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setError(false);
    if (
      searchTerms.zipCodes.trim().length !== 5 &&
      searchTerms.zipCodes.trim().length > 0
    ) {
      setError(true);
      return;
    }

    const searchParams = {};
    for (let key in searchTerms) {
      if (searchTerms[key] !== "") {
        searchParams[key] = searchTerms[key];
      }
    }
    setSearchParams(searchParams);
  };

  const matchSubmitHandler = async () => {
    if (favorites.length === 0) {
      setMatchError({
        bool: true,
        message: "Please favorite at least one dog before being matched!",
      });
      return;
    }
    setMatchError({ bool: false, message: "" });
    setMatchLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/dogs/match`,
        {
          method: "POST",
          body: JSON.stringify(favorites),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to execute search fetch!");
      }
      const data = await response.json();

      const matchResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/dogs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify([data.match]),
        }
      );
      if (!matchResponse.ok) {
        throw new Error("Failed to fetch dogs!");
      }
      const matchData = await matchResponse.json();
      setMatch(matchData[0]);
      setIsMatchOpen(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
      setMatchError({ bool: true, message: err.message });
    }
    setMatchLoading(false);
  };

  const clearButtonHandler = () => {
    navigate("/dogs");
    setSearchTerms({
      breeds: "",
      zipCodes: "",
      ageMin: 0,
      ageMax: 20,
      size: "",
      sort: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0ead6",
        padding: "1rem",
        borderRadius: "12px",
        marginBottom: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          color: "#8A2BE2",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Search Dogs
      </h2>

      <form
        onSubmit={searchSubmitHandler}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div style={{ flex: "1 1 30%", minWidth: "200px" }}>
          <label
            style={{
              color: "#8A2BE2",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            Breeds
          </label>
          <select
            name="breeds"
            onChange={searchChangeHandler}
            value={searchTerms.breeds}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #8A2BE2",
              borderRadius: "6px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">Select Breed</option>
            {breedList.map((breed, index) => (
              <option key={`${breed}:${index}`} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: "1 1 30%", minWidth: "200px" }}>
          <label
            style={{
              color: "#8A2BE2",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            Zip Code
          </label>
          <input
            type="number"
            name="zipCodes"
            value={searchTerms.zipCodes}
            onChange={searchChangeHandler}
            placeholder="Enter Zip Code"
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #8A2BE2",
              borderRadius: "6px",
              backgroundColor: "#fff",
            }}
          />
          {error && (
            <p
              style={{
                color: "red",
                fontSize: ".75rem",
                marginTop: "0.5rem",
              }}
            >
              Zip Code must be exactly 5 digits
            </p>
          )}
        </div>

        <div style={{ flex: "1 1 30%", minWidth: "200px" }}>
          <label
            style={{
              color: "#8A2BE2",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            Age Range
          </label>
          <RangeSlider
            value={[searchTerms.ageMin, searchTerms.ageMax]}
            setSearchTerms={setSearchTerms}
          />
        </div>

        <div style={{ flex: "1 1 30%", minWidth: "200px" }}>
          <label
            style={{
              color: "#8A2BE2",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            Items per page
          </label>
          <select
            name="size"
            onChange={searchChangeHandler}
            value={searchTerms.size}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #8A2BE2",
              borderRadius: "6px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">Select Number</option>
            {resultsPaginationNumber.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: "1 1 30%", minWidth: "200px" }}>
          <label
            style={{
              color: "#8A2BE2",
              marginBottom: "0.5rem",
              display: "block",
            }}
          >
            Sort By
          </label>
          <select
            name="sort"
            onChange={searchChangeHandler}
            value={searchTerms.sort}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #8A2BE2",
              borderRadius: "6px",
              backgroundColor: "#fff",
            }}
          >
            <option value="">Select Sort</option>
            {sortInfo.map((sortItem) => (
              <option key={sortItem.value} value={sortItem.value}>
                {sortItem.label}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            width: "100%",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "#8A2BE2",
              color: "#f0ead6",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={clearButtonHandler}
            style={{
              backgroundColor: "transparent",
              color: "#8A2BE2",
              border: "1px solid #8A2BE2",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear Search
          </button>
        </div>
      </form>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={matchSubmitHandler}
          style={{
            backgroundColor: "#f49932",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Match
        </button>
        {matchError.bool && (
          <p
            style={{
              color: "red",
              fontSize: ".75rem",
              marginTop: "0.5rem",
            }}
          >
            {matchError.message}
          </p>
        )}
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => setFavorites([])}
            style={{
              backgroundColor: "transparent",
              color: "#f49932",
              padding: "0.5rem 1rem",
              border: "1px solid #f49932",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear Favorites
          </button>
        </div>
      </div>
    </div>
  );
}
