import React, { useEffect, useState } from "react";
import useFetchData from "../utils/fetchData";
import { useSearchParams } from "react-router";
import Main from "../components/Main";
import MatchCard from "../components/MatchCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const { searchIds, dogData, isLoading, error, fetchDogData } = useFetchData();
  const [favorites, setFavorites] = useState([]);
  const [match, setMatch] = useState();
  const [matchLoading, setMatchLoading] = useState(false);
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchDogData(searchParams);
  }, [fetchDogData, searchParams]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: " 1 1 auto",
        textAlign: "center",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <FilterBar
        setFavorites={setFavorites}
        setMatchLoading={setMatchLoading}
        setSearchParams={setSearchParams}
        setIsMatchOpen={setIsMatchOpen}
        setMatch={setMatch}
        favorites={favorites}
      />
      {isLoading && (
        <p style={{ margin: "auto", fontSize: "1.25rem" }}> Loading... </p>
      )}
      {error && !isLoading && <p style={{ fontSize: "1.25rem" }}>{error}</p>}
      {!isLoading && !error && dogData && (
        <Main
          favorites={favorites}
          setFavorites={setFavorites}
          dogData={dogData}
          paginationData={searchIds}
        />
      )}

      <MatchCard
        match={match}
        isMatchOpen={isMatchOpen}
        isMatchLoading={matchLoading}
        setIsMatchOpen={setIsMatchOpen}
      />
    </div>
  );
}
