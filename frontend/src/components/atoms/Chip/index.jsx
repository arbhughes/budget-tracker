import React from "react";
import PropTypes from "prop-types";

import styles from "./Chip.module.css";

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "warning", "error", "neutral"]),
  className: PropTypes.string,
};

Chip.defaultProps = {
  variant: "neutral",
  className: "",
};

export default function Chip({ label, variant, className, ...props }) {
  const chipClasses = [
    styles.chip,
    styles[variant],
    className
  ].filter(Boolean).join(" ");

  return (
    <span className={chipClasses} {...props}>
      {label}
    </span>
  );
}
