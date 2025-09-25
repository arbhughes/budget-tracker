import React from "react";
import PropTypes from "prop-types";

import FormRow from "../../molecules/FormRow";
import Button from "../../atoms/Button";

import styles from "./CampaignForm.module.css";

CampaignForm.propTypes = {
  name: PropTypes.string.isRequired,
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  spend: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

CampaignForm.defaultProps = {
  isSubmitting: false,
};

export default function CampaignForm({
  name,
  budget,
  spend,
  onChange,
  onSubmit,
  isSubmitting,
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormRow
        id="name"
        label="Name"
        type="text"
        value={name}
        onChange={onChange}
      />

      {/* Budget + Spend side by side */}
      <div className="grid grid-cols-2 gap-4">
        <FormRow
          id="budget"
          label="Budget"
          type="number"
          value={budget}
          onChange={onChange}
          step="0.01"
        />
        <FormRow
          id="spend"
          label="Spend"
          type="number"
          value={spend}
          onChange={onChange}
          step="0.01"
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary" isDisabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Campaign"}
        </Button>
      </div>
    </form>
  );
}
