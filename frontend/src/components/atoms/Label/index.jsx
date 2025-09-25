import React from "react";
import PropTypes from "prop-types";

import styles from "./Label.module.css";

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

Label.defaultProps = {
  required: false,
  className: "",
};

export default function Label({ htmlFor, children, required, className, ...props }) {
  const labelClasses = [
    styles.label,
    className
  ].filter(Boolean).join(" ");

  return (
    <label htmlFor={htmlFor} className={labelClasses} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}
