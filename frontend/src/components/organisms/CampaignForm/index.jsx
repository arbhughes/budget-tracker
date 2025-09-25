import React from "react";
import PropTypes from "prop-types";

import FormRow from "../../molecules/FormRow";
import Button from "../../atoms/Button";

import styles from "./CampaignForm.module.css";

CampaignForm.propTypes = {
  name: PropTypes.string.isRequired,
  budget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  spend: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,  // handles controlled inputs
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
  status,
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
      <FormRow
        id="budget"
        label="Budget"
        type="number"
        value={budget}
        onChange={onChange}
      />
      <FormRow
        id="spend"
        label="Spend"
        type="number"
        value={spend}
        onChange={onChange}
      />
      <FormRow
        id="status"
        label="Status"
        type="text"
        value={status}
        onChange={onChange}
        placeholder='e.g. "On track"'
      />

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          isDisabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Campaign"}
        </Button>
      </div>
    </form>
  );
}
