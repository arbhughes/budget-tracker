import React from "react";
import PropTypes from "prop-types";
import { ChevronUp, ChevronDown } from "lucide-react";

import styles from "./TableHeaders.module.css";

TableHeader.propTypes = {
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf(["asc", "desc"]),
  onSort: PropTypes.func.isRequired,
};

export default function TableHeader({ sortColumn, sortDirection, onSort }) {
  const renderHeader = (label, columnKey) => (
    <th
      onClick={() => onSort(columnKey)}
      className={`${styles.headerCell} cursor-pointer select-none`}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <span className={styles.sortIconWrapper}>
          {sortColumn === columnKey ? (
            sortDirection === "asc" ? (
              <ChevronUp className={styles.sortIcon} />
            ) : (
              <ChevronDown className={styles.sortIcon} />
            )
          ) : (
            <span className={styles.sortPlaceholder} />
          )}
        </span>
      </span>
    </th>
  );

  return (
    <thead>
      <tr>
        {renderHeader("Name", "name")}
        {renderHeader("Budget", "budget")}
        {renderHeader("Spend", "spend")}
        {renderHeader("Status", "status")}
      </tr>
    </thead>
  );
}

