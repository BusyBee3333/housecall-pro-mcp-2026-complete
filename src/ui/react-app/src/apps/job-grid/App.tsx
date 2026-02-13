/**
 * Job Grid - Searchable/filterable table of all jobs
 */

import React, { useState, useMemo } from 'react';
import './styles.css';

interface Job {
  id: string;
  customer: string;
  service: string;
  date: string;
  technician: string;
  status: 'open' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  value: number;
  priority: 'low' | 'medium' | 'high';
}

const mockJobs: Job[] = [
  { id: 'J-1001', customer: 'Smith Residence', service: 'HVAC Repair', date: '2024-02-12', technician: 'Mike Johnson', status: 'completed', value: 450, priority: 'medium' },
  { id: 'J-1002', customer: 'Downtown Office', service: 'Plumbing Install', date: '2024-02-12', technician: 'Sarah Lee', status: 'in-progress', value: 1200, priority: 'high' },
  { id: 'J-1003', customer: 'Oak Street Apt', service: 'Electrical Inspection', date: '2024-02-12', technician: 'Tom Wilson', status: 'scheduled', value: 200, priority: 'low' },
  { id: 'J-1004', customer: 'Martinez Home', service: 'AC Maintenance', date: '2024-02-13', technician: 'Mike Johnson', status: 'scheduled', value: 150, priority: 'medium' },
  { id: 'J-1005', customer: 'Riverside Complex', service: 'Water Heater Repair', date: '2024-02-13', technician: 'Sarah Lee', status: 'open', value: 380, priority: 'high' },
  { id: 'J-1006', customer: 'Harbor View', service: 'Drain Cleaning', date: '2024-02-14', technician: 'Tom Wilson', status: 'scheduled', value: 175, priority: 'low' },
  { id: 'J-1007', customer: 'Pine Street House', service: 'Furnace Repair', date: '2024-02-14', technician: 'Mike Johnson', status: 'completed', value: 620, priority: 'high' },
  { id: 'J-1008', customer: 'Valley Office Park', service: 'Commercial HVAC', date: '2024-02-15', technician: 'Sarah Lee', status: 'scheduled', value: 2400, priority: 'high' },
  { id: 'J-1009', customer: 'Johnson Residence', service: 'Pipe Inspection', date: '2024-02-10', technician: 'Tom Wilson', status: 'completed', value: 220, priority: 'medium' },
  { id: 'J-1010', customer: 'City Hall', service: 'Electrical Upgrade', date: '2024-02-09', technician: 'Mike Johnson', status: 'cancelled', value: 0, priority: 'low' }
];

export default function JobGrid({ api }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = searchTerm === '' || 
        job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.technician.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      'open': 'status-open',
      'scheduled': 'status-scheduled',
      'in-progress': 'status-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
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

  return (
    <div className="job-grid">
      <header className="grid-header">
        <h1>All Jobs</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search jobs, customers, or technicians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </header>

      <div className="filters">
        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Priority</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="results-count">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Technician</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map(job => (
              <tr key={job.id}>
                <td className="job-id">{job.id}</td>
                <td className="customer-name">{job.customer}</td>
                <td>{job.service}</td>
                <td>{new Date(job.date).toLocaleDateString()}</td>
                <td>{job.technician}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(job.status)}`}>
                    {job.status.replace('-', ' ')}
                  </span>
                </td>
                <td>
                  <span className={`priority-badge ${getPriorityClass(job.priority)}`}>
                    {job.priority}
                  </span>
                </td>
                <td className="value">${job.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
