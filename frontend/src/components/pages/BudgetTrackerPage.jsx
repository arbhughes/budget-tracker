import React, { useState } from "react";

import Heading from "../atoms/Heading";
import Button from "../atoms/Button";
import CampaignTable from "../organisms/CampaignTable";
import CampaignForm from "../organisms/CampaignForm";


export default function BudgetTrackerPage() {
  const [campaigns, setCampaigns] = useState([
    { name: "Winter Sale", budget: 10000, spend: 2500, status: "On track" },
    { name: "Spring Promotion", budget: 5000, spend: 3000, status: "Underspending" },
    { name: "Summer Campaign", budget: 8000, spend: 4000, status: "On track" },
  ]);

  const [formState, setFormState] = useState({
    name: "",
    budget: "",
    spend: "",
    status: "On track",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCampaigns((prev) => [
      ...prev,
      {
        name: formState.name,
        budget: Number(formState.budget),
        spend: Number(formState.spend),
        status: formState.status || "On track",
      },
    ]);
    setFormState({ name: "", budget: "", spend: "", status: "On track" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading level={1}>Campaigns</Heading>
        <Button variant="secondary">Add Campaign</Button>
      </div>

      <CampaignTable campaigns={campaigns} />

      <div className="mt-8">
        <CampaignForm
          name={formState.name}
          budget={formState.budget}
          spend={formState.spend}
          status={formState.status}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
