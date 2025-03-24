import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import DogTile from "./DogTile";

export default function Main({
  favorites,
  setFavorites,
  dogData,
  paginationData,
}) {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const from = +searchParams.get("from");
    const size = +searchParams.get("size");

    const disabledButton = async () => {
      const totalSize = paginationData?.total;
      if (size + from > totalSize) {
        setHasNextPage(false);
      } else {
        setHasNextPage(true);
      }
    };
    disabledButton();
  }, [searchParams, paginationData]);

  const changePageHandler = (e) => {
    const splitPath = paginationData[e.target.name].split("/search");
    const urlPath = splitPath.join("");
    navigate(urlPath);
  };

  return (
    <div style={{ width: "100%" }}>
      {dogData.length === 0 ? (
        <p
          style={{ textAlign: "center", margin: "1rem auto", color: "#8A2BE2" }}
        >
          There are no dogs that match your search terms
        </p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <button
              name="prev"
              onClick={changePageHandler}
              disabled={!paginationData?.prev}
              style={{
                backgroundColor: paginationData?.prev ? "#8A2BE2" : "#d3d3d3",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: paginationData?.prev ? "pointer" : "not-allowed",
              }}
            >
              Prev
            </button>

            <button
              name="next"
              onClick={changePageHandler}
              disabled={!hasNextPage}
              style={{
                backgroundColor: hasNextPage ? "#8A2BE2" : "#d3d3d3",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: hasNextPage ? "pointer" : "not-allowed",
              }}
            >
              Next
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {dogData.map((data) => (
              <DogTile
                key={data.id}
                dogData={data}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button
              name="prev"
              onClick={changePageHandler}
              disabled={!paginationData?.prev}
              style={{
                backgroundColor: paginationData?.prev ? "#8A2BE2" : "#d3d3d3",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: paginationData?.prev ? "pointer" : "not-allowed",
              }}
            >
              Prev
            </button>

            <button
              name="next"
              onClick={changePageHandler}
              disabled={!hasNextPage}
              style={{
                backgroundColor: hasNextPage ? "#8A2BE2" : "#d3d3d3",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: hasNextPage ? "pointer" : "not-allowed",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
