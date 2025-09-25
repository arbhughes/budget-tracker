import React, { useState } from "react";
import PropTypes from "prop-types";

import CampaignRow from "../../molecules/CampaignRow";
import TableHeader from "../../molecules/TableHeader";
import styles from "./CampaignTable.module.css";

CampaignTable.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      spend: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function CampaignTable({ campaigns }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn];
    const valB = b[sortColumn];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }

    return sortDirection === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  return (
    <table className={`${styles.table} table-fixed w-full border-collapse`}>
      <TableHeader
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <tbody>
        {sortedCampaigns.map((c) => (
          <CampaignRow
            key={c.id || c.name}
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

