/**
 * Revenue Dashboard - Revenue charts by period, service type, technician
 */

import React, { useState } from 'react';
import './styles.css';

interface RevenueData {
  today: number;
  week: number;
  month: number;
  year: number;
}

interface ServiceRevenue {
  service: string;
  revenue: number;
  jobs: number;
  percentage: number;
}

interface TechRevenue {
  name: string;
  revenue: number;
  jobs: number;
}

interface DailyRevenue {
  date: string;
  revenue: number;
}

const revenueData: RevenueData = {
  today: 3850,
  week: 28450,
  month: 124600,
  year: 892350
};

const serviceRevenue: ServiceRevenue[] = [
  { service: 'HVAC Repair', revenue: 45200, jobs: 82, percentage: 36.3 },
  { service: 'Plumbing', revenue: 32800, jobs: 104, percentage: 26.3 },
  { service: 'Electrical', revenue: 28400, jobs: 96, percentage: 22.8 },
  { service: 'Maintenance', revenue: 12600, jobs: 142, percentage: 10.1 },
  { service: 'Installation', revenue: 5600, jobs: 12, percentage: 4.5 }
];

const techRevenue: TechRevenue[] = [
  { name: 'Mike Johnson', revenue: 38450, jobs: 124 },
  { name: 'Sarah Lee', revenue: 42800, jobs: 136 },
  { name: 'Tom Wilson', revenue: 28900, jobs: 98 },
  { name: 'Jessica Martinez', revenue: 14450, jobs: 78 }
];

const dailyRevenue: DailyRevenue[] = [
  { date: '02/06', revenue: 18200 },
  { date: '02/07', revenue: 21500 },
  { date: '02/08', revenue: 16800 },
  { date: '02/09', revenue: 24300 },
  { date: '02/10', revenue: 19700 },
  { date: '02/11', revenue: 22900 },
  { date: '02/12', revenue: 20150 }
];

export default function RevenueDashboard({ api }: any) {
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'year'>('month');

  const maxDailyRevenue = Math.max(...dailyRevenue.map(d => d.revenue));

  return (
    <div className="revenue-dashboard">
      <header className="dashboard-header">
        <h1>Revenue Dashboard</h1>
        <div className="period-selector">
          <button 
            className={period === 'today' ? 'active' : ''} 
            onClick={() => setPeriod('today')}
          >
            Today
          </button>
          <button 
            className={period === 'week' ? 'active' : ''} 
            onClick={() => setPeriod('week')}
          >
            Week
          </button>
          <button 
            className={period === 'month' ? 'active' : ''} 
            onClick={() => setPeriod('month')}
          >
            Month
          </button>
          <button 
            className={period === 'year' ? 'active' : ''} 
            onClick={() => setPeriod('year')}
          >
            Year
          </button>
        </div>
      </header>

      <div className="revenue-stats">
        <div className="stat-card stat-today">
          <div className="stat-label">Today</div>
          <div className="stat-value">${revenueData.today.toLocaleString()}</div>
          <div className="stat-change positive">+12.5%</div>
        </div>
        <div className="stat-card stat-week">
          <div className="stat-label">This Week</div>
          <div className="stat-value">${revenueData.week.toLocaleString()}</div>
          <div className="stat-change positive">+8.3%</div>
        </div>
        <div className="stat-card stat-month">
          <div className="stat-label">This Month</div>
          <div className="stat-value">${revenueData.month.toLocaleString()}</div>
          <div className="stat-change positive">+15.7%</div>
        </div>
        <div className="stat-card stat-year">
          <div className="stat-label">This Year</div>
          <div className="stat-value">${revenueData.year.toLocaleString()}</div>
          <div className="stat-change positive">+22.1%</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card daily-chart">
          <h2>Daily Revenue (Last 7 Days)</h2>
          <div className="bar-chart">
            {dailyRevenue.map(day => (
              <div key={day.date} className="bar-group">
                <div className="bar-container">
                  <div 
                    className="bar" 
                    style={{ height: `${(day.revenue / maxDailyRevenue) * 100}%` }}
                  >
                    <div className="bar-value">${(day.revenue / 1000).toFixed(1)}k</div>
                  </div>
                </div>
                <div className="bar-label">{day.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card service-chart">
          <h2>Revenue by Service Type</h2>
          <div className="service-breakdown">
            {serviceRevenue.map((service, idx) => (
              <div key={idx} className="service-row">
                <div className="service-info">
                  <div className="service-name">{service.service}</div>
                  <div className="service-meta">
                    {service.jobs} jobs
                  </div>
                </div>
                <div className="service-bar-container">
                  <div 
                    className="service-bar" 
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
                <div className="service-revenue">
                  ${service.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tech-performance">
        <h2>Technician Performance</h2>
        <div className="tech-grid">
          {techRevenue.map((tech, idx) => (
            <div key={idx} className="tech-card">
              <div className="tech-avatar">
                {tech.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="tech-info">
                <div className="tech-name">{tech.name}</div>
                <div className="tech-stats">
                  <div className="tech-revenue">${tech.revenue.toLocaleString()}</div>
                  <div className="tech-jobs">{tech.jobs} jobs</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
