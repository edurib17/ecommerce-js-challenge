import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiPlusCircle, FiMinusCircle, FiXCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import * as CartActions from "../../store/modules/cart/actions";

import "./styles.css";

export default function Cart() {
  const cart = useSelector((state) =>
    state.cart.map((game) => ({
      ...game,
      subtotal: game.price * game.amount,
    }))
  );

  const total = useSelector((state) =>
    state.cart.reduce((totalSum, product) => {
      return totalSum + product.price * product.amount;
    }, 0)
  );
  const totalqtd = useSelector((state) =>
    state.cart.reduce((totalSum, product) => {
      return totalSum + 10 * product.amount;
    }, 0)
  );

  const dispatch = useDispatch();

  function icrement(game) {
    dispatch(
      CartActions.updateAmount({
        id: game.id,
        amount: game.amount + 1,
      })
    );
  }

  function decrement(game) {
    dispatch(
      CartActions.updateAmount({
        id: game.id,
        amount: game.amount - 1,
      })
    );
  }

  function removeProduct(game) {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Excluir produto ??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(CartActions.removeFromCart(game));
        Swal.fire("Produto!", "Produto deletado", "success");
      }
    });
  }

  function closeSale() {
    if (cart.length > 0) {
      dispatch(CartActions.removeAllCart());
      Swal.fire(
        "Pedido realizado!",
        "Pedido realizado com sucesso!",
        "success"
      );
    } else
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Adicione algum produto para realizar o pedido!",
      });
  }

  return (
    <main className="container">
      <div className="cart-container">
        <table className="game-table">
          <thead>
            <tr>
              <th />
              <th>Game</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map((game) => (
              <tr key={game.id}>
                <td>
                  <img src={game.image} alt={game.name} />
                </td>
                <td>
                  <strong>{game.name}</strong>
                  <span>
                    {game.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(game)}>
                      <FiMinusCircle size={20} color="#33bfcb0" />
                    </button>

                    <input type="number" readOnly value={game.amount} />

                    <button type="button" onClick={() => icrement(game)}>
                      <FiPlusCircle size={20} color="#33bfcb0" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>R$ {game.subtotal.toFixed(3).slice(0, -1)}</strong>
                </td>
                <td>
                  <button type="button" onClick={() => removeProduct(game.id)}>
                    <FiXCircle size={20} color="#33bfcb0" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer>
          <Link to="/">
            <button type="button" onClick={() => closeSale()}>
              Encomendar
            </button>
          </Link>

          <div className="total">
            <span>Frete</span>
            <h5>
              {total >= 250
                ? "Grátis"
                : totalqtd.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
            </h5>
          </div>

          <div className="total">
            <span>Total</span>
            <h5> R$ {total.toFixed(3).slice(0, -1)}</h5>
          </div>
        </footer>
      </div>
    </main>
  );
}
