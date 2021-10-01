import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import Swal from "sweetalert2";

import * as CartActions from "../../store/modules/cart/actions";

import api from "../../services/api";

import "./styles.css";

export default function Home() {
  const [games, setGames] = useState([]);

  //utiliza o useSelector para obter os dados da store e vai armazenar os itens no cart
  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, game) => {
      sumAmount[game.id] = game.amount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  //Passando os dados do game com payload
  function handleAddGame(game) {
    Swal.fire("Produto!", "Produto adicionado ao carrinho!", "success");
    dispatch(CartActions.addToCart(game));
  }

  const handleChange = (value) => {
    switch (true) {
      case value == 0:
        const sortByprice = [...games];
        sortByprice.sort((a, b) => {
          return a.price - b.price;
        });
        setGames(sortByprice);
        break;
      case value == 1:
        const sortByHighPrices = [...games];
        sortByHighPrices.sort((a, b) => {
          return b.price - a.price;
        });
        setGames(sortByHighPrices);
        break;
      case value == 2:
        const sortByScore = [...games];
        sortByScore.sort((a, b) => {
          return b.score - a.score;
        });
        setGames(sortByScore);
        break;
      case value == 3:
        const sortByName = [...games];
        sortByName.sort((a, b) => {
          return a.name.trim() < b.name.trim()
            ? -1
            : a.name.trim() > b.name.trim()
            ? 1
            : 0;
        });
        setGames(sortByName);
        break;
      default:
    }
  };

  //Renderizar os itens da api products
  useEffect(() => {
    async function loadGames() {
      const response = await api.get("/games");
      setGames(response.data);
    }
    loadGames();
  }, []);

  return (
    <main className="container">
      <div className="custom-select">
        <select onChange={(e) => handleChange(e.target.value)}>
          <option>Filtrar</option>
          <option value="0">Melhor preço</option>
          <option value="1">Maior preço</option>
          <option value="2">Popularidade</option>
          <option value="3">Ordem alfabética</option>
        </select>
      </div>
      <ul className="game-catalog">
        {games.map((game) => (
          <li key={game.id} className="game-container">
            <img src={game.image} alt="game.name" />
            <strong>{game.name}</strong>
            <span>
              {game.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </span>

            <button type="button" onClick={() => handleAddGame(game)}>
              <div>
                <FiShoppingBag size={16} color="#33bfcb" />{" "}
                {amount[game.id] || 0}
              </div>
              <span>Adicionar</span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
