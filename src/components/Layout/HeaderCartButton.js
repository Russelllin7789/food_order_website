import React, { useContext, useEffect, useState } from "react";

import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)
  const [buttonClassIsTriggered, setbuttonClassIsTriggered] = useState(false)

  const { items } = cartCtx

  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount
  }, 0)

  const buttonClasses = `${classes.button} ${buttonClassIsTriggered ? classes.bump : ''}`

  // add useEffect for utilize the CSS animation
  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setbuttonClassIsTriggered(true)

    const timer = setTimeout(() => {
      setbuttonClassIsTriggered(false)
    }, 300)

    // return function within useEffect is always seen as clear function for React
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  )
}

export default HeaderCartButton