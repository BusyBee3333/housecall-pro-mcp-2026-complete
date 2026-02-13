/**
 * Dispatch Board - Drag-style dispatch view of technicians and jobs
 */

import React, { useState } from 'react';
import './styles.css';

interface Job {
  id: string;
  customer: string;
  service: string;
  time: string;
  duration: number;
  value: number;
  priority: 'low' | 'medium' | 'high';
}

interface Technician {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  jobs: Job[];
  capacity: number;
}

const mockTechnicians: Technician[] = [
  {
    id: 'T-001',
    name: 'Mike Johnson',
    status: 'busy',
    capacity: 8,
    jobs: [
      { id: 'J-1001', customer: 'Smith Residence', service: 'HVAC Repair', time: '09:00', duration: 2, value: 450, priority: 'medium' },
      { id: 'J-1004', customer: 'Martinez Home', service: 'AC Maintenance', time: '14:00', duration: 1.5, value: 150, priority: 'low' }
    ]
  },
  {
    id: 'T-002',
    name: 'Sarah Lee',
    status: 'busy',
    capacity: 8,
    jobs: [
      { id: 'J-1002', customer: 'Downtown Office', service: 'Plumbing Install', time: '10:30', duration: 3, value: 1200, priority: 'high' },
      { id: 'J-1005', customer: 'Riverside Complex', service: 'Water Heater Repair', time: '15:30', duration: 2, value: 380, priority: 'high' }
    ]
  },
  {
    id: 'T-003',
    name: 'Tom Wilson',
    status: 'available',
    capacity: 8,
    jobs: [
      { id: 'J-1003', customer: 'Oak Street Apt', service: 'Electrical Inspection', time: '12:00', duration: 1, value: 200, priority: 'low' }
    ]
  },
  {
    id: 'T-004',
    name: 'Jessica Martinez',
    status: 'available',
    capacity: 8,
    jobs: []
  },
  {
    id: 'T-005',
    name: 'David Chen',
    status: 'offline',
    capacity: 8,
    jobs: []
  }
];

const unassignedJobs: Job[] = [
  { id: 'J-2001', customer: 'Harbor View', service: 'Drain Cleaning', time: '13:00', duration: 1, value: 175, priority: 'medium' },
  { id: 'J-2002', customer: 'Pine Street House', service: 'Furnace Repair', time: '11:00', duration: 2.5, value: 620, priority: 'high' },
  { id: 'J-2003', customer: 'Valley Office Park', service: 'Commercial HVAC', time: '16:00', duration: 4, value: 2400, priority: 'high' }
];

export default function DispatchBoard({ api }: any) {
  const [technicians, setTechnicians] = useState<Technician[]>(mockTechnicians);
  const [unassigned, setUnassigned] = useState<Job[]>(unassignedJobs);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      'available': 'status-available',
      'busy': 'status-busy',
      'offline': 'status-offline'
    };
    return classes[status] || '';
  };

  const getPriorityClass = (priority: string) => {
    const classes: Record<string, string> = {
      'low': 'priority-low',
      'medium': 'priority-medium',
      'high': 'priority-high'
    };
    return classes[priority] || '';
  };

  const getTotalHours = (jobs: Job[]) => {
    return jobs.reduce((sum, job) => sum + job.duration, 0);
  };

  const getTotalRevenue = (jobs: Job[]) => {
    return jobs.reduce((sum, job) => sum + job.value, 0);
  };

  return (
    <div className="dispatch-board">
      <header className="board-header">
        <h1>Dispatch Board</h1>
        <div className="header-info">
          <span className="info-item">
            📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
          <span className="info-item">
            {technicians.filter(t => t.status === 'available').length} Available • 
            {technicians.filter(t => t.status === 'busy').length} Busy • 
            {technicians.filter(t => t.status === 'offline').length} Offline
          </span>
        </div>
      </header>

      <div className="board-container">
        <div className="unassigned-column">
          <div className="column-header unassigned-header">
            <h2>Unassigned Jobs</h2>
            <span className="job-count">{unassigned.length}</span>
          </div>
          <div className="job-list">
            {unassigned.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <span className="job-id">{job.id}</span>
                  <span className={`priority-badge ${getPriorityClass(job.priority)}`}>
                    {job.priority}
                  </span>
                </div>
                <div className="job-customer">{job.customer}</div>
                <div className="job-service">{job.service}</div>
                <div className="job-meta">
                  <span>🕐 {job.time}</span>
                  <span>⏱ {job.duration}h</span>
                  <span className="job-value">${job.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="technicians-columns">
          {technicians.map(tech => (
            <div key={tech.id} className="tech-column">
              <div className={`column-header tech-header ${getStatusClass(tech.status)}`}>
                <div className="tech-info">
                  <h3>{tech.name}</h3>
                  <span className={`status-badge ${getStatusClass(tech.status)}`}>
                    {tech.status}
                  </span>
                </div>
                <div className="tech-stats">
                  <div className="stat">
                    {getTotalHours(tech.jobs)}/{tech.capacity}h
                  </div>
                  <div className="stat-label">Hours</div>
                </div>
              </div>
              <div className="job-list">
                {tech.jobs.length === 0 ? (
                  <div className="empty-state">No jobs assigned</div>
                ) : (
                  tech.jobs.map(job => (
                    <div key={job.id} className="job-card">
                      <div className="job-header">
                        <span className="job-id">{job.id}</span>
                        <span className={`priority-badge ${getPriorityClass(job.priority)}`}>
                          {job.priority}
                        </span>
                      </div>
                      <div className="job-customer">{job.customer}</div>
                      <div className="job-service">{job.service}</div>
                      <div className="job-meta">
                        <span>🕐 {job.time}</span>
                        <span>⏱ {job.duration}h</span>
                        <span className="job-value">${job.value}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="tech-footer">
                <div className="revenue-total">
                  Total: ${getTotalRevenue(tech.jobs).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
