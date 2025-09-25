import React from "react";

import styles from "./TableHeaders.module.css";

export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th className={styles.headerCell}>Name</th>
        <th className={styles.headerCell}>Budget</th>
        <th className={styles.headerCell}>Spend</th>
        <th className={styles.headerCell}>Status</th>
      </tr>
    </thead>
  );
}
