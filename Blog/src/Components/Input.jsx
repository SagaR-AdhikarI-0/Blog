import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props},
  ref
) {
  const id = useId();
  return (
    <div className="w-full mt-5 ">
      {label && (
        <label className="block  font-semibold " htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={` h-10 ${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});
export default Input;
