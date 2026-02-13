/**
 * Payment History - Payment log with filters by date, customer, method
 */

import React, { useState, useMemo } from 'react';
import './styles.css';

interface Payment {
  id: string;
  date: string;
  customer: string;
  jobId: string;
  amount: number;
  method: 'credit-card' | 'cash' | 'check' | 'ach' | 'other';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  invoice: string;
}

const mockPayments: Payment[] = [
  { id: 'P-1001', date: '2024-02-12', customer: 'John Smith', jobId: 'J-1001', amount: 450, method: 'credit-card', status: 'completed', invoice: 'INV-5001' },
  { id: 'P-1002', date: '2024-02-12', customer: 'Sarah Johnson', jobId: 'J-1002', amount: 1200, method: 'ach', status: 'completed', invoice: 'INV-5002' },
  { id: 'P-1003', date: '2024-02-11', customer: 'Mike Williams', jobId: 'J-998', amount: 300, method: 'cash', status: 'completed', invoice: 'INV-4998' },
  { id: 'P-1004', date: '2024-02-11', customer: 'Emily Davis', jobId: 'J-997', amount: 850, method: 'credit-card', status: 'completed', invoice: 'INV-4997' },
  { id: 'P-1005', date: '2024-02-10', customer: 'Robert Martinez', jobId: 'J-995', amount: 2400, method: 'check', status: 'pending', invoice: 'INV-4995' },
  { id: 'P-1006', date: '2024-02-10', customer: 'Lisa Anderson', jobId: 'J-993', amount: 175, method: 'credit-card', status: 'completed', invoice: 'INV-4993' },
  { id: 'P-1007', date: '2024-02-09', customer: 'David Thompson', jobId: 'J-990', amount: 620, method: 'credit-card', status: 'completed', invoice: 'INV-4990' },
  { id: 'P-1008', date: '2024-02-09', customer: 'Jennifer Garcia', jobId: 'J-988', amount: 500, method: 'cash', status: 'completed', invoice: 'INV-4988' },
  { id: 'P-1009', date: '2024-02-08', customer: 'William Brown', jobId: 'J-985', amount: 1100, method: 'ach', status: 'failed', invoice: 'INV-4985' },
  { id: 'P-1010', date: '2024-02-08', customer: 'Amanda Wilson', jobId: 'J-983', amount: 380, method: 'credit-card', status: 'completed', invoice: 'INV-4983' },
  { id: 'P-1011', date: '2024-02-07', customer: 'James Lee', jobId: 'J-980', amount: 225, method: 'cash', status: 'completed', invoice: 'INV-4980' },
  { id: 'P-1012', date: '2024-02-07', customer: 'Maria Rodriguez', jobId: 'J-978', amount: 950, method: 'credit-card', status: 'refunded', invoice: 'INV-4978' },
  { id: 'P-1013', date: '2024-02-06', customer: 'Thomas Clark', jobId: 'J-975', amount: 1500, method: 'ach', status: 'completed', invoice: 'INV-4975' },
  { id: 'P-1014', date: '2024-02-06', customer: 'Patricia Miller', jobId: 'J-972', amount: 420, method: 'check', status: 'completed', invoice: 'INV-4972' },
  { id: 'P-1015', date: '2024-02-05', customer: 'Christopher White', jobId: 'J-970', amount: 680, method: 'credit-card', status: 'completed', invoice: 'INV-4970' }
];

export default function PaymentHistory({ api }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredPayments = useMemo(() => {
    return mockPayments.filter(payment => {
      const matchesSearch = searchTerm === '' || 
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoice.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const paymentDate = new Date(payment.date);
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dateFilter === 'today') matchesDate = daysDiff === 0;
        else if (dateFilter === 'week') matchesDate = daysDiff <= 7;
        else if (dateFilter === 'month') matchesDate = daysDiff <= 30;
      }

      return matchesSearch && matchesStatus && matchesMethod && matchesDate;
    });
  }, [searchTerm, statusFilter, methodFilter, dateFilter]);

  const totalAmount = useMemo(() => {
    return filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
  }, [filteredPayments]);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      'completed': 'status-completed',
      'pending': 'status-pending',
      'failed': 'status-failed',
      'refunded': 'status-refunded'
    };
    return classes[status] || '';
  };

  const getMethodIcon = (method: string) => {
    const icons: Record<string, string> = {
      'credit-card': '💳',
      'cash': '💵',
      'check': '📝',
      'ach': '🏦',
      'other': '💰'
    };
    return icons[method] || '💰';
  };

  return (
    <div className="payment-history">
      <header className="history-header">
        <h1>Payment History</h1>
        <div className="total-banner">
          Total (Filtered): <span className="total-amount">${totalAmount.toLocaleString()}</span>
        </div>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by customer, payment ID, job ID, or invoice..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filters">
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
            <option value="all">All Methods</option>
            <option value="credit-card">Credit Card</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="ach">ACH</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="results-count">
          {filteredPayments.length} payment{filteredPayments.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="table-container">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Job ID</th>
              <th>Invoice</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id}>
                <td className="payment-id">{payment.id}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td className="customer-name">{payment.customer}</td>
                <td className="job-id">{payment.jobId}</td>
                <td className="invoice-id">{payment.invoice}</td>
                <td>
                  <span className="payment-method">
                    {getMethodIcon(payment.method)} {payment.method.replace('-', ' ')}
                  </span>
                </td>
                <td className="amount">${payment.amount.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(payment.status)}`}>
                    {payment.status}
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
