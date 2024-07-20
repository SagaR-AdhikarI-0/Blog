import React from 'react'
import { useId } from 'react'

function SelectBtn({options,label,className='',...pros},ref) {
    const id=useId(); 
  return (
    <div className='w-full'>
        {label && <label htmlFor={id}></label>} 
        <select name="" id={id} ref={ref} {...pros} className={`${className}`}>
            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(SelectBtn);