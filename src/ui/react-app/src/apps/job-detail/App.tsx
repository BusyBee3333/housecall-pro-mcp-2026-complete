/**
 * Job Detail - Detailed job view
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

export default function JobDetail({ api }: any) {
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
    <div className="job-detail">
      <header>
        <h1>Job Detail</h1>
      </header>
      <main>
        <p>Detailed job view</p>
      </main>
    </div>
  );
}
