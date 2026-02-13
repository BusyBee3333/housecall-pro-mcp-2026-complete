/**
 * Customer List - Browse and search customers
 */

import React, { useState, useEffect } from 'react';
import './styles.css';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  mobile_number?: string;
  company?: string;
}

export default function CustomerList({ api }: any) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const result = await api.call('list_customers', { page_size: 100 });
      const data = JSON.parse(result);
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Failed to load customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((c) =>
    `${c.first_name} ${c.last_name} ${c.email || ''} ${c.company || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading customers...</div>;
  }

  return (
    <div className="customer-list">
      <header>
        <h1>Customers</h1>
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </header>

      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.first_name} {customer.last_name}</td>
              <td>{customer.email || '—'}</td>
              <td>{customer.mobile_number || '—'}</td>
              <td>{customer.company || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCustomers.length === 0 && (
        <div className="empty-state">No customers found</div>
      )}
    </div>
  );
}
