import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* directly pull out all the key-value pairs of props.input */}
      <input {...props.input} />
    </div>
  )
}

export default Input