import React from "react";
import PropTypes from "prop-types";

import Chip from "../../atoms/Chip";

import styles from "./CampaignRow.module.css";

CampaignRow.propTypes = {
  name: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  spend: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["On track", "Overspending", "Underspending"]).isRequired,
};

const statusVariantMap = {
  "On track": "success",
  "Overspending": "error",
  "Underspending": "warning",
};

export default function CampaignRow({ name, budget, spend, status }) {
  return (
    <tr>
      <td className={styles.cell}>{name}</td>
      {/* Assume GBP for now, and round to whole number - pennies too precise for a budget tracker */}
      <td className={styles.cell}>£{Math.round(budget)}</td>
      <td className={styles.cell}>£{Math.round(spend)}</td>
      <td className={styles.statusCell}>
        <Chip label={status} variant={statusVariantMap[status]} />
      </td>
    </tr>
  );
}
