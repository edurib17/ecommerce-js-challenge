import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";


import "./styles.css";

export default function NavBar() {
  //calcular quantidade dentro do  state.cart.
  const cartSize = useSelector((state) => state.cart.length);

  return (
    <header className="header">
      <Link to="/" className="logo">
        <span className="logo-text">E-Commerce.js</span>
      </Link>

      <Link to="/cart" className="header-cart">
        <div>
          <strong>Cart</strong>
          <span>
            <strong>{cartSize}</strong> Jogos
          </span>
        </div>
        <FiShoppingBag size={36} color="#FFF" />
      </Link>
    </header>
  );
}
