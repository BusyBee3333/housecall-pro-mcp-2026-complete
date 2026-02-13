/**
 * Estimate Builder - Create and manage estimates
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

export default function EstimateBuilder({ api }: any) {
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
    <div className="estimate-builder">
      <header>
        <h1>Estimate Builder</h1>
      </header>
      <main>
        <p>Create and manage estimates</p>
      </main>
    </div>
  );
}
