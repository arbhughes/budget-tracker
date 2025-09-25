import React from "react";
import PropTypes from "prop-types";

import TableHeader from "../../molecules/TableHeader";
import CampaignRow from "../../molecules/CampaignRow";

import styles from "./CampaignTable.module.css";

CampaignTable.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      spend: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["On track", "Overspending", "Underspending"]).isRequired,
    })
  ).isRequired,
};

export default function CampaignTable({ campaigns }) {
  return (
    <table className={styles.table}>
      <TableHeader />
      <tbody className={styles.body}>
        {campaigns.map((c, i) => (
          <CampaignRow
            key={i}
            name={c.name}
            budget={c.budget}
            spend={c.spend}
            status={c.status}
          />
        ))}
      </tbody>
    </table>
  );
}
