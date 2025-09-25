import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.css";

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  isDisabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "primary",
  size: "medium",
  isDisabled: false,
  type: "button",
  onClick: () => {},
  className: "",
};

export default function Button({
  variant,
  size,
  isDisabled,
  type,
  className,
  children,
  onClick,
  ...props
}) {
  const buttonClasses = `
    ${styles.button} 
    ${styles[variant]} 
    ${styles[size]} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
