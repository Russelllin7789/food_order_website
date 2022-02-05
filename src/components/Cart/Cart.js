import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from './Cart.module.css'
import Modal from "../UI/Modal";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItem = cartCtx.items.length > 0

  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const CartItems = <ul className={classes['cart-items']}>{
    cartCtx.items.map(
      item =>
        <CartItem
          id={item.id}
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeCartItemHandler.bind(null, item.id)}
          onAdd={addCartItemHandler.bind(null, item)}
        />
    )}
  </ul>

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const modalActions =
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

  return (
    <Modal onClose={props.onClose}>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} />}
      {!isCheckout && modalActions}
      {/* <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div> */}
    </Modal>
  )
}

export default Cart