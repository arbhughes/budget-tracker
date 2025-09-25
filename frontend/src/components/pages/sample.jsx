/**
 * CampaignsPage.jsx
 *
 * Single-page UI for the campaign budget tracker task.
 * - Uses Tailwind CSS for styling (assumes Tailwind is configured in the project)
 * - Fetches campaigns from `/api/campaigns/` and allows creating new campaigns
 *
 * Notes:
 * - Keep this file as a single-file React component for the brief; split into smaller files
 *   when the app grows.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Compute a human-friendly status and progress value for a campaign.
 *
 * :param campaign: { name, budget, spend, status? }
 * :returns: { status: string, progress: number }
 */
function deriveStatus(campaign) {
  const budget = Number(campaign.budget || 0);
  const spend = Number(campaign.spend || 0);
  const progress = budget > 0 ? Math.min(100, Math.round((spend / budget) * 100)) : 0;

  if (budget === 0 && spend === 0) return { status: 'No budget', progress };
  if (spend > 1.1 * budget) return { status: 'Overspending', progress };
  if (spend > budget) return { status: 'Slightly over', progress };
  if (spend < 0.9 * budget) return { status: 'Underspending', progress };
  return { status: 'On track', progress };
}

/**
 * Row that displays a single campaign.
 */
function CampaignRow({ campaign }) {
  const { status, progress } = deriveStatus(campaign);
  const statusColour =
    status === 'Overspending'
      ? 'bg-red-100 text-red-800'
      : status === 'Slightly over'
      ? 'bg-amber-100 text-amber-800'
      : status === 'Underspending'
      ? 'bg-blue-100 text-blue-800'
      : status === 'On track'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';

  return (
    <tr className="border-b last:border-b-0">
      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-800">{campaign.name}</td>
      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">£{Number(campaign.budget).toFixed(2)}</td>
      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">£{Number(campaign.spend).toFixed(2)}</td>
      <td className="py-3 px-4 whitespace-nowrap text-sm">
        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${statusColour}`}>
          <span>{status}</span>
          <span className="ml-2 text-gray-500">{progress}%</span>
        </div>
      </td>
    </tr>
  );
}

/**
 * Simple form to add a new campaign.
 */
function CampaignForm({ onCreate }) {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [spend, setSpend] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!name.trim()) return setError('Please enter a name.');
    const b = Number(budget);
    const s = Number(spend || 0);
    if (Number.isNaN(b) || b < 0) return setError('Budget must be a positive number.');
    if (Number.isNaN(s) || s < 0) return setError('Spend must be a positive number.');

    setLoading(true);
    try {
      const payload = { name: name.trim(), budget: b.toFixed(2), spend: s.toFixed(2) };
      const res = await axios.post('/api/campaigns/', payload);
      onCreate(res.data);
      setName('');
      setBudget('');
      setSpend('');
    } catch (err) {
      setError('Failed to create campaign.');
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-sm text-gray-700">Name</span>
          <input
            className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Account sensitivity campaign"
            aria-label="Campaign name"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">Budget (£)</span>
          <input
            className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="1000.00"
            aria-label="Budget"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">Spend (£)</span>
          <input
            className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
            value={spend}
            onChange={(e) => setSpend(e.target.value)}
            placeholder="0.00"
            aria-label="Spend"
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-4 py-2 text-sm font-semibold shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          disabled={loading}
        >
          {loading ? 'Adding…' : 'Add campaign'}
        </button>

        <button
          type="button"
          onClick={() => { setName(''); setBudget(''); setSpend(''); setError(null); }}
          className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 text-sm px-4 py-2 shadow hover:bg-gray-50 focus:outline-none"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

/**
 * Main page component. Fetches campaigns and renders the table + form.
 */
export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const res = await axios.get('/api/campaigns/');
        if (!mounted) return;
        setCampaigns(res.data);
      } catch (err) {
        setError('Failed to load campaigns.');
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchCampaigns();
    return () => { mounted = false; };
  }, []);

  function handleCreate(newItem) {
    // Add to top for immediate feedback
    setCampaigns((prev) => [newItem, ...prev]);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaign Budget Tracker</h1>
            <p className="text-sm text-gray-600">Simple tool to track campaign budget and spend.</p>
          </div>
          <div className="text-right">
            <span className="inline-block text-xs text-gray-500">Powered by Django + React</span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">New campaign</h2>
            <CampaignForm onCreate={handleCreate} />
          </section>

          <section className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Campaigns</h2>
              <div className="text-sm text-gray-500">{campaigns.length} campaigns</div>
            </div>

            {loading ? (
              <div className="py-8 text-center text-gray-500">Loading…</div>
            ) : error ? (
              <div className="py-8 text-center text-red-600">{error}</div>
            ) : campaigns.length === 0 ? (
              <div className="py-12 text-center text-gray-500">No campaigns yet — add one on the left.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="text-left text-xs uppercase text-gray-500 tracking-wide">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Budget</th>
                      <th className="px-4 py-2">Spend</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {campaigns.map((c) => (
                      <CampaignRow key={c.id} campaign={c} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-6 text-center text-xs text-gray-400">Built for the Brainlabs take-home task — minimal, clear UI.</footer>
      </div>
    </div>
  );
}
