import React, { useRef, useState } from "react";

import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault()

    const name = nameInputRef.current.value
    const street = streetInputRef.current.value
    const postalCode = postalCodeInputRef.current.value
    const city = cityInputRef.current.value

    const nameIsValid = !isEmpty(name)
    const streetIsValid = !isEmpty(street)
    const cityIsValid = !isEmpty(city)
    const postalCodeIsValid = isFiveChars(postalCode)

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid
    })

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid


    if (!formIsValid) {
      return
    }
  }

  const nameInputClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
  const streetInputClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
  const cityInputClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`
  const postalCodeInputClasses = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout