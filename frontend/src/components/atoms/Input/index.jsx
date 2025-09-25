import React from "react";
import PropTypes from "prop-types";

import styles from "./Input.module.css";

Input.propTypes = {
  type: PropTypes.oneOf(["text", "number"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  isDisabled: false,
  className: "",
};

export default function Input({
  type,
  value,
  placeholder,
  isDisabled,
  onChange,
  className,
  ...props
}) {
  const inputClasses = [
    styles.input,
    className
  ].filter(Boolean).join(" ");


  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      onChange={onChange}
      className={inputClasses}
      {...props}
    />
  );
}
