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

// Currency formatter (GBP, no pennies)
const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const statusVariantMap = {
  "On track": "success",
  "Overspending": "error",
  "Underspending": "warning",
};

export default function CampaignRow({ name, budget, spend, status }) {
  return (
    <tr>
      <td className={styles.cell}>{name}</td>
      <td className={styles.cell}>{currencyFormatter.format(budget)}</td>
      <td className={styles.cell}>{currencyFormatter.format(spend)}</td>
      <td className={styles.statusCell}>
        <Chip label={status} variant={statusVariantMap[status]} />
      </td>
    </tr>
  );
}
