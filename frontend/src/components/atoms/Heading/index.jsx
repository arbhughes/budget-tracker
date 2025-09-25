import React from "react";
import PropTypes from "prop-types";

import styles from "./Heading.module.css";

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: "",
};

export default function Heading({ level, children, className, ...props }) {
  const Tag = `h${level}`;

  const headingClasses = [
    styles.heading,
    styles[`h${level}`],
    className
  ].filter(Boolean).join(" ");

  return (
    <Tag className={headingClasses} {...props}>
      {children}
    </Tag>
  );
}
