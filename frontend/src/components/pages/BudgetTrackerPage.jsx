import React, { useState, useEffect } from "react";

import Heading from "../atoms/Heading";
import CampaignTable from "../organisms/CampaignTable";
import CampaignForm from "../organisms/CampaignForm";

import apiClient from "../../services/ApiClient";

export const getCampaigns = async () => {
  const res = await apiClient.get("/campaigns/");
  return res.data;
};

export const createCampaign = async (campaign) => {
  const res = await apiClient.post("/campaigns/", campaign);
  return res.data;
};

export default function BudgetTrackerPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    budget: "",
    spend: "",
    status: "On track",
  });

  // Fetch on mount
  useEffect(() => {
    async function loadCampaigns() {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    }
    loadCampaigns();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCampaign = await createCampaign({
        name: formState.name,
        budget: Number(formState.budget),
        spend: Number(formState.spend),
        status: formState.status,
      });
      setCampaigns((prev) => [...prev, newCampaign]);
      setFormState({ name: "", budget: "", spend: "", status: "On track" });
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading level={1}>Budget Tracker</Heading>
      </div>

      <CampaignTable campaigns={campaigns} />

      <div className="mt-8">
        <Heading level={2} className="mb-4">
          Add a new campaign
        </Heading>
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