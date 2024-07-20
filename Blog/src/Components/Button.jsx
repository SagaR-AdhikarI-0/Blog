import React from 'react'

function Button({children,type='button',className='',...props}) {
  return (
    <button className={`p-2 rounded ${className}` } {...props}>{children}</button>
  )
}

export default Button