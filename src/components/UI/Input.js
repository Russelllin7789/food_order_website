import React from 'react'

import classes from './Input.module.css'

// *** need add 'React.forwardRef' if want to use custom component as ref ***
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* directly pull out all the key-value pairs of props.input */}
      <input ref={ref} {...props.input} />
    </div>
  )
})

export default Input