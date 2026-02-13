/**
 * Job Dashboard - Overview stats and today's schedule
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

interface JobStats {
  open: number;
  scheduled: number;
  completed: number;
  inProgress: number;
}

interface TodayJob {
  id: string;
  customer: string;
  service: string;
  time: string;
  technician: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  value: number;
}

export default function JobDashboard({ api }: any) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<JobStats>({
    open: 24,
    scheduled: 18,
    completed: 156,
    inProgress: 6
  });
  const [todayJobs, setTodayJobs] = useState<TodayJob[]>([
    { id: 'J-1001', customer: 'Smith Residence', service: 'HVAC Repair', time: '09:00 AM', technician: 'Mike Johnson', status: 'completed', value: 450 },
    { id: 'J-1002', customer: 'Downtown Office', service: 'Plumbing Install', time: '10:30 AM', technician: 'Sarah Lee', status: 'in-progress', value: 1200 },
    { id: 'J-1003', customer: 'Oak Street Apt', service: 'Electrical Inspection', time: '12:00 PM', technician: 'Tom Wilson', status: 'scheduled', value: 200 },
    { id: 'J-1004', customer: 'Martinez Home', service: 'AC Maintenance', time: '02:00 PM', technician: 'Mike Johnson', status: 'scheduled', value: 150 },
    { id: 'J-1005', customer: 'Riverside Complex', service: 'Water Heater Repair', time: '03:30 PM', technician: 'Sarah Lee', status: 'scheduled', value: 380 }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const getStatusBadge = (status: string) => {
    const badges = {
      'scheduled': 'badge-scheduled',
      'in-progress': 'badge-progress',
      'completed': 'badge-completed'
    };
    return badges[status as keyof typeof badges] || 'badge-scheduled';
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="job-dashboard">
      <header className="dashboard-header">
        <h1>Job Dashboard</h1>
        <div className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </header>

      <div className="stats-grid">
        <div className="stat-card stat-open">
          <div className="stat-value">{stats.open}</div>
          <div className="stat-label">Open Jobs</div>
        </div>
        <div className="stat-card stat-scheduled">
          <div className="stat-value">{stats.scheduled}</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-card stat-progress">
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card stat-completed">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Completed (MTD)</div>
        </div>
      </div>

      <div className="today-schedule">
        <h2>Today's Schedule</h2>
        <div className="job-list">
          {todayJobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-id">{job.id}</div>
                <span className={`badge ${getStatusBadge(job.status)}`}>
                  {job.status.replace('-', ' ')}
                </span>
              </div>
              <div className="job-customer">{job.customer}</div>
              <div className="job-service">{job.service}</div>
              <div className="job-footer">
                <div className="job-time">🕐 {job.time}</div>
                <div className="job-tech">👤 {job.technician}</div>
                <div className="job-value">${job.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
