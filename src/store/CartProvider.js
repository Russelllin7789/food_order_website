import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  // modify the state object like defaultCartState's structure
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

    // 1. filter out the existing item if item was already included within the cart
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const existingCartItem = state.items[existingItemIndex]
    let updatedItems

    if (existingCartItem) {
      // 2-1. update the item that was already included in the cart first, then update the whole cart
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    } else {
      // 2-2. update the whole cart if the item was never included before
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'REMOVE') {
    // 1. filter out the existing item if item was already included within the cart
    const existingItemIndex = state.items.findIndex(item => item.id === action.id)
    const existingCartItem = state.items[existingItemIndex]
    const updatedTotalAmount = state.totalAmount - existingCartItem.price

    let updatedItems

    if (existingCartItem.amount === 1) {
      // 2-1. if item amount equals to 1, then delete the whole item 
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      // 2-2. if item amount is greater than 1, then the item amount simply minus 1
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
      updatedItems = [...state.items]
      updatedItems[existingItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider