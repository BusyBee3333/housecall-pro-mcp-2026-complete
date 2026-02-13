/**
 * Settings Panel - System settings
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

export default function SettingsPanel({ api }: any) {
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
    <div className="settings-panel">
      <header>
        <h1>Settings Panel</h1>
      </header>
      <main>
        <p>System settings</p>
      </main>
    </div>
  );
}
