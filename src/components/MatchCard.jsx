import React from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: "500px",
  color: "#8A2BE2",
  backgroundColor: "#f0ead6",
  border: "2px solid #8A2BE2",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  padding: "1.5rem",
  textAlign: "center",
};

const MatchCard = ({ isMatchOpen, setIsMatchOpen, match, isMatchLoading }) => {
  const handleClose = () => setIsMatchOpen(false);

  return (
    isMatchOpen && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
        onClick={handleClose}
      >
        <div
          style={modalStyle}
          onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
        >
          {isMatchLoading ? (
            <p
              style={{ margin: "auto", fontSize: "1.25rem", color: "#8A2BE2" }}
            >
              Loading...
            </p>
          ) : (
            match && (
              <>
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  <em>Congratulations! You've been matched with:</em>
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    background: "none",
                    border: "none",
                    color: "#8A2BE2",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  ✖
                </button>
                <img
                  src={match.img}
                  alt={`${match.name} the ${match.breed}`}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h2 style={{ margin: "0", color: "#8A2BE2" }}>{match.name}</h2>
                <p style={{ margin: "0.5rem 0" }}>{match.breed}</p>
                <p style={{ margin: "0.5rem 0" }}>Age: {match.age}</p>
              </>
            )
          )}
        </div>
      </div>
    )
  );
};

export default MatchCard;
