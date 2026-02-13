/**
 * Customer Detail - Detailed customer view
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

export default function CustomerDetail({ api }: any) {
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
    <div className="customer-detail">
      <header>
        <h1>Customer Detail</h1>
      </header>
      <main>
        <p>Detailed customer view</p>
      </main>
    </div>
  );
}
