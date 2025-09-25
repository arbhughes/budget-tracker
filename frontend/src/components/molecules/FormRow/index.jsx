import React from "react";
import PropTypes from "prop-types";

import Label from "../../atoms/Label";
import Input from "../../atoms/Input";

import styles from "./FormRow.module.css";

FormRow.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
};

FormRow.defaultProps = {
  type: "text",
  placeholder: "",
  isDisabled: false,
};

export default function FormRow({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  isDisabled,
  ...props
}) {
  return (
    <div className={styles.formRow}>
      <Label htmlFor={id} className={styles.label}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        {...props}
      />
    </div>
  );
}
