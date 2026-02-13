/**
 * Job Board - Overview of all jobs
 * MCP App for Housecall Pro
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

interface JobBoardProps {
  api: any;
}

interface Job {
  id: string;
  customer_id: string;
  description?: string;
  work_status: string;
  invoice_status: string;
  schedule?: {
    start: string;
    end: string;
  };
  total_amount?: number;
}

export default function JobBoard({ api }: JobBoardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadJobs();
  }, [filter]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const params: any = { page_size: 100 };
      if (filter !== 'all') {
        params.work_status = filter;
      }

      const result = await api.call('list_jobs', params);
      const data = JSON.parse(result);
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: '#3b82f6',
      on_my_way: '#f59e0b',
      working: '#8b5cf6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  return (
    <div className="job-board">
      <header>
        <h1>Job Board</h1>
        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
            All
          </button>
          <button onClick={() => setFilter('scheduled')} className={filter === 'scheduled' ? 'active' : ''}>
            Scheduled
          </button>
          <button onClick={() => setFilter('on_my_way')} className={filter === 'on_my_way' ? 'active' : ''}>
            On My Way
          </button>
          <button onClick={() => setFilter('working')} className={filter === 'working' ? 'active' : ''}>
            Working
          </button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
            Completed
          </button>
        </div>
      </header>

      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3>Job #{job.id}</h3>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(job.work_status) }}
              >
                {job.work_status}
              </span>
            </div>
            <p className="job-description">{job.description || 'No description'}</p>
            <div className="job-meta">
              <div>Customer: {job.customer_id}</div>
              {job.schedule && (
                <div>Scheduled: {new Date(job.schedule.start).toLocaleString()}</div>
              )}
              {job.total_amount && <div>Amount: ${job.total_amount.toFixed(2)}</div>}
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="empty-state">
          <p>No jobs found</p>
        </div>
      )}
    </div>
  );
}
