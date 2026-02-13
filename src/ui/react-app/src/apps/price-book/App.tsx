/**
 * Price Book - Manage service catalog
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

export default function PriceBook({ api }: any) {
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
    <div className="price-book">
      <header>
        <h1>Price Book</h1>
      </header>
      <main>
        <p>Manage service catalog</p>
      </main>
    </div>
  );
}
