import React from "react";
import "./styles/DogTile.css";

export default function DogTile({
  favorites,
  setFavorites,
  dogData: { id, age, breed, img, name, zip_code },
}) {
  const favoritesHandler = () => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite) => favorite != id));
    } else {
      setFavorites((currFavorites) => [...currFavorites, id]);
    }
  };

  return (
    <div className="dog-card">
      <img src={img} alt={name} className="dog-image" />
      <div className="dog-info">
        <h3 className="dog-name">{name}</h3>
        <p className="dog-details">
          {age} years old • {breed}
        </p>
        <p className="dog-zipcode">Zip Code: {zip_code}</p>
      </div>
      <div className="dog-actions">
        <button className="favorite-btn" onClick={favoritesHandler}>
          {favorites.includes(id) ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
