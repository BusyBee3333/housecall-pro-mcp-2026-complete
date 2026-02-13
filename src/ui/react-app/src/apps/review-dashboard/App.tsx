/**
 * Review Dashboard - Customer reviews
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

export default function ReviewDashboard({ api }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load data from API
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="review-dashboard">
      <header>
        <h1>Review Dashboard</h1>
      </header>
      <main>
        <p>Customer reviews</p>
      </main>
    </div>
  );
}
