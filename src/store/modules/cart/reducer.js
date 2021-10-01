import { createReducer } from "@reduxjs/toolkit";
import { addToCart, removeFromCart,removeAllCart ,updateAmount } from "./actions";

const cart = createReducer([], {
  [addToCart]: (state, action) => {
    const { payload } = action;
    const { id } = payload;

    const gameExist = state.find((game) => game.id === id);

    if (gameExist) {
      gameExist.amount = gameExist.amount + 1;
    } else {
      payload.amount = 1;
      state.push(payload);
    }
  },
  [removeFromCart]: (state, action) => {
    const productIndex = state.findIndex((game) => game.id === action.payload);

    if (productIndex >= 0) {
      state.splice(productIndex, 1);
    }
  },
  [removeAllCart]: (state,action) => {
    state.splice(0,state.length);
      
  },
  [updateAmount]: (state, action) => {
    const { id, amount } = action.payload;
    const gameExist = state.find((game) => game.id === id);

    if (gameExist) {
      const gameIndex = state.findIndex((game) => game.id === gameExist.id);

      if (gameIndex >= 0 && amount >= 0) {
        state[gameIndex].amount = Number(amount);
      }
    }
    return state;
  },
});
export default cart;
