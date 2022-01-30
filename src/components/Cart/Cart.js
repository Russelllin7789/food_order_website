import React, { useContext } from "react";

import CartContext from "../../store/cart-context";

import classes from './Cart.module.css'
import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItem = cartCtx.items.length > 0

  const CartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => <li>{item.name}</li>)}</ul>

  return (
    <Modal onClose={props.onClose}>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart