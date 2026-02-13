/**
 * Technician Dashboard - Individual tech's schedule, performance, reviews
 */

import React, { useState } from 'react';
import './styles.css';

interface TechnicianData {
  id: string;
  name: string;
  status: 'available' | 'on-job' | 'offline';
  rating: number;
  totalReviews: number;
  jobsCompleted: number;
  revenueThisMonth: number;
  hoursWorked: number;
}

interface TodayJob {
  id: string;
  customer: string;
  service: string;
  time: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  value: number;
  address: string;
}

interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  jobId: string;
}

const mockTechnician: TechnicianData = {
  id: 'T-001',
  name: 'Mike Johnson',
  status: 'on-job',
  rating: 4.8,
  totalReviews: 142,
  jobsCompleted: 28,
  revenueThisMonth: 18750,
  hoursWorked: 156
};

const todayJobs: TodayJob[] = [
  { id: 'J-1001', customer: 'Smith Residence', service: 'HVAC Repair', time: '09:00 AM', status: 'completed', value: 450, address: '123 Main St' },
  { id: 'J-1002', customer: 'Downtown Office', service: 'Plumbing Install', time: '11:30 AM', status: 'in-progress', value: 1200, address: '456 Oak Ave' },
  { id: 'J-1003', customer: 'Oak Street Apt', service: 'Electrical Inspection', time: '02:00 PM', status: 'upcoming', value: 200, address: '789 Pine Dr' },
  { id: 'J-1004', customer: 'Martinez Home', service: 'AC Maintenance', time: '04:30 PM', status: 'upcoming', value: 150, address: '321 Elm St' }
];

const recentReviews: Review[] = [
  { id: 'R-1', customer: 'Sarah Wilson', rating: 5, comment: 'Mike was professional and fixed our AC quickly!', date: '2024-02-11', jobId: 'J-998' },
  { id: 'R-2', customer: 'John Davis', rating: 5, comment: 'Excellent service, very knowledgeable.', date: '2024-02-10', jobId: 'J-995' },
  { id: 'R-3', customer: 'Emily Chen', rating: 4, comment: 'Good work, arrived on time.', date: '2024-02-09', jobId: 'J-992' },
  { id: 'R-4', customer: 'Robert Martinez', rating: 5, comment: 'Outstanding! Will request Mike again.', date: '2024-02-08', jobId: 'J-989' }
];

export default function TechnicianDashboard({ api }: any) {
  const [tech] = useState<TechnicianData>(mockTechnician);
  const [jobs] = useState<TodayJob[]>(todayJobs);
  const [reviews] = useState<Review[]>(recentReviews);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      'available': 'status-available',
      'on-job': 'status-on-job',
      'offline': 'status-offline',
      'upcoming': 'status-upcoming',
      'in-progress': 'status-in-progress',
      'completed': 'status-completed'
    };
    return classes[status] || '';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="technician-dashboard">
      <header className="tech-header">
        <div className="tech-profile">
          <div className="avatar">{tech.name.split(' ').map(n => n[0]).join('')}</div>
          <div className="tech-info">
            <h1>{tech.name}</h1>
            <div className="tech-meta">
              <span className={`status-badge ${getStatusClass(tech.status)}`}>
                {tech.status.replace('-', ' ')}
              </span>
              <span className="rating">
                ★ {tech.rating} ({tech.totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-value">{tech.jobsCompleted}</div>
            <div className="stat-label">Jobs Completed (MTD)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">${tech.revenueThisMonth.toLocaleString()}</div>
            <div className="stat-label">Revenue (MTD)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱</div>
          <div className="stat-content">
            <div className="stat-value">{tech.hoursWorked}h</div>
            <div className="stat-label">Hours Worked (MTD)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{tech.rating}</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="schedule-section">
          <h2>Today's Schedule</h2>
          <div className="jobs-timeline">
            {jobs.map(job => (
              <div key={job.id} className={`timeline-job ${getStatusClass(job.status)}`}>
                <div className="job-time">{job.time}</div>
                <div className="job-details">
                  <div className="job-header">
                    <span className="job-id">{job.id}</span>
                    <span className={`status-dot ${getStatusClass(job.status)}`}></span>
                  </div>
                  <div className="job-customer">{job.customer}</div>
                  <div className="job-service">{job.service}</div>
                  <div className="job-address">📍 {job.address}</div>
                  <div className="job-value">${job.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reviews-section">
          <h2>Recent Reviews</h2>
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-customer">{review.customer}</div>
                  <div className="review-date">{new Date(review.date).toLocaleDateString()}</div>
                </div>
                <div className="review-rating">{renderStars(review.rating)}</div>
                <div className="review-comment">{review.comment}</div>
                <div className="review-job">Job #{review.jobId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
