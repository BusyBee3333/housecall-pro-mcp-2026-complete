/**
 * Customer Grid - Searchable customer directory
 */

import React, { useState, useMemo } from 'react';
import './styles.css';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalJobs: number;
  totalRevenue: number;
  lastService: string;
  status: 'active' | 'inactive' | 'vip';
}

const mockCustomers: Customer[] = [
  { id: 'C-1001', name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 123-4567', address: '123 Main St', city: 'Springfield', totalJobs: 12, totalRevenue: 4500, lastService: '2024-02-10', status: 'active' },
  { id: 'C-1002', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 234-5678', address: '456 Oak Ave', city: 'Riverside', totalJobs: 24, totalRevenue: 12800, lastService: '2024-02-12', status: 'vip' },
  { id: 'C-1003', name: 'Mike Williams', email: 'mike.w@email.com', phone: '(555) 345-6789', address: '789 Pine Dr', city: 'Lakeside', totalJobs: 3, totalRevenue: 890, lastService: '2024-01-15', status: 'active' },
  { id: 'C-1004', name: 'Emily Davis', email: 'emily.davis@email.com', phone: '(555) 456-7890', address: '321 Elm St', city: 'Springfield', totalJobs: 8, totalRevenue: 3200, lastService: '2024-02-08', status: 'active' },
  { id: 'C-1005', name: 'Robert Martinez', email: 'r.martinez@email.com', phone: '(555) 567-8901', address: '654 Maple Ln', city: 'Hillside', totalJobs: 18, totalRevenue: 8900, lastService: '2024-02-11', status: 'vip' },
  { id: 'C-1006', name: 'Lisa Anderson', email: 'lisa.a@email.com', phone: '(555) 678-9012', address: '987 Cedar Ct', city: 'Riverside', totalJobs: 5, totalRevenue: 1750, lastService: '2024-01-28', status: 'active' },
  { id: 'C-1007', name: 'David Thompson', email: 'david.t@email.com', phone: '(555) 789-0123', address: '147 Birch Rd', city: 'Lakeside', totalJobs: 1, totalRevenue: 250, lastService: '2023-12-05', status: 'inactive' },
  { id: 'C-1008', name: 'Jennifer Garcia', email: 'jen.garcia@email.com', phone: '(555) 890-1234', address: '258 Willow Way', city: 'Springfield', totalJobs: 15, totalRevenue: 6200, lastService: '2024-02-09', status: 'active' },
  { id: 'C-1009', name: 'William Brown', email: 'w.brown@email.com', phone: '(555) 901-2345', address: '369 Spruce St', city: 'Hillside', totalJobs: 2, totalRevenue: 450, lastService: '2023-11-20', status: 'inactive' },
  { id: 'C-1010', name: 'Amanda Wilson', email: 'amanda.w@email.com', phone: '(555) 012-3456', address: '741 Ash Blvd', city: 'Riverside', totalJobs: 28, totalRevenue: 15600, lastService: '2024-02-12', status: 'vip' }
];

export default function CustomerGrid({ api }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  const cities = useMemo(() => {
    const uniqueCities = [...new Set(mockCustomers.map(c => c.city))];
    return uniqueCities.sort();
  }, []);

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => {
      const matchesSearch = searchTerm === '' || 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
      const matchesCity = cityFilter === 'all' || customer.city === cityFilter;

      return matchesSearch && matchesStatus && matchesCity;
    });
  }, [searchTerm, statusFilter, cityFilter]);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      'active': 'status-active',
      'inactive': 'status-inactive',
      'vip': 'status-vip'
    };
    return classes[status] || '';
  };

  return (
    <div className="customer-grid">
      <header className="grid-header">
        <h1>Customer Directory</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search customers by name, email, phone, or address..."
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
            <option value="active">Active</option>
            <option value="vip">VIP</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="filter-group">
          <label>City</label>
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="all">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="results-count">
          {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Total Jobs</th>
              <th>Revenue</th>
              <th>Last Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td className="customer-id">{customer.id}</td>
                <td className="customer-name">{customer.name}</td>
                <td className="contact-info">
                  <div>{customer.email}</div>
                  <div className="phone">{customer.phone}</div>
                </td>
                <td className="location">
                  <div>{customer.address}</div>
                  <div className="city">{customer.city}</div>
                </td>
                <td className="jobs-count">{customer.totalJobs}</td>
                <td className="revenue">${customer.totalRevenue.toLocaleString()}</td>
                <td>{new Date(customer.lastService).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
