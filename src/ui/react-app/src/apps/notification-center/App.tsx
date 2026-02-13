/**
 * Notification Center - Manage notifications
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

export default function NotificationCenter({ api }: any) {
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
    <div className="notification-center">
      <header>
        <h1>Notification Center</h1>
      </header>
      <main>
        <p>Manage notifications</p>
      </main>
    </div>
  );
}
