import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from local storage on mount
    const storedFavorites = localStorage.getItem("cryptoFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem("cryptoFavorites", JSON.stringify(newFavorites));
  };

  const addFavorite = (symbol: string) => {
    if (!favorites.includes(symbol)) {
      const newFavorites = [...favorites, symbol];
      saveFavorites(newFavorites);
    }
  };

  const removeFavorite = (symbol: string) => {
    const newFavorites = favorites.filter((fav) => fav !== symbol);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (symbol: string) => {
    if (favorites.includes(symbol)) {
      removeFavorite(symbol);
    } else {
      addFavorite(symbol);
    }
  };

  const isFavorite = (symbol: string) => favorites.includes(symbol);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
};
