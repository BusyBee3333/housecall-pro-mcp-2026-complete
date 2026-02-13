/**
 * Review Tracker - Customer reviews with ratings, response status
 */

import React, { useState, useMemo } from 'react';
import './styles.css';

interface Review {
  id: string;
  customer: string;
  technician: string;
  jobId: string;
  rating: number;
  date: string;
  comment: string;
  response?: string;
  responseDate?: string;
  status: 'pending' | 'responded' | 'flagged';
  source: 'google' | 'yelp' | 'facebook' | 'internal';
}

const mockReviews: Review[] = [
  { id: 'R-1001', customer: 'Sarah Wilson', technician: 'Mike Johnson', jobId: 'J-998', rating: 5, date: '2024-02-12', comment: 'Mike was professional and fixed our AC quickly! Highly recommend.', status: 'pending', source: 'google' },
  { id: 'R-1002', customer: 'John Davis', technician: 'Sarah Lee', jobId: 'J-995', rating: 5, date: '2024-02-11', comment: 'Excellent service, very knowledgeable. Will definitely use again.', response: 'Thank you for your kind words! We appreciate your business.', responseDate: '2024-02-11', status: 'responded', source: 'yelp' },
  { id: 'R-1003', customer: 'Emily Chen', technician: 'Tom Wilson', jobId: 'J-992', rating: 4, date: '2024-02-11', comment: 'Good work, arrived on time. Would have been 5 stars if the price was a bit lower.', status: 'pending', source: 'google' },
  { id: 'R-1004', customer: 'Robert Martinez', technician: 'Mike Johnson', jobId: 'J-989', rating: 5, date: '2024-02-10', comment: 'Outstanding! Will request Mike again for all future work.', response: 'We are thrilled to hear about your experience! Mike will be happy to assist you again.', responseDate: '2024-02-10', status: 'responded', source: 'facebook' },
  { id: 'R-1005', customer: 'Lisa Taylor', technician: 'Sarah Lee', jobId: 'J-985', rating: 2, date: '2024-02-09', comment: 'Technician was late and the job took longer than estimated. Not happy with the experience.', status: 'flagged', source: 'google' },
  { id: 'R-1006', customer: 'David Brown', technician: 'Tom Wilson', jobId: 'J-982', rating: 5, date: '2024-02-09', comment: 'Perfect service from start to finish. Very satisfied!', response: 'Thank you for choosing us! We look forward to serving you again.', responseDate: '2024-02-09', status: 'responded', source: 'internal' },
  { id: 'R-1007', customer: 'Jennifer White', technician: 'Mike Johnson', jobId: 'J-978', rating: 4, date: '2024-02-08', comment: 'Great technician, minor issue with scheduling but overall good experience.', status: 'pending', source: 'yelp' },
  { id: 'R-1008', customer: 'Michael Garcia', technician: 'Sarah Lee', jobId: 'J-975', rating: 5, date: '2024-02-07', comment: 'Sarah went above and beyond. Explained everything clearly.', response: 'We appreciate your feedback! Sarah takes pride in her work.', responseDate: '2024-02-07', status: 'responded', source: 'google' },
  { id: 'R-1009', customer: 'Amanda Clark', technician: 'Tom Wilson', jobId: 'J-970', rating: 3, date: '2024-02-06', comment: 'Service was okay, nothing special. Expected more based on reviews.', status: 'pending', source: 'facebook' },
  { id: 'R-1010', customer: 'Christopher Lee', technician: 'Mike Johnson', jobId: 'J-968', rating: 5, date: '2024-02-05', comment: 'Fantastic work! Mike is a true professional.', response: 'Thank you! We are glad Mike could help you.', responseDate: '2024-02-06', status: 'responded', source: 'google' }
];

export default function ReviewTracker({ api }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredReviews = useMemo(() => {
    return mockReviews.filter(review => {
      const matchesSearch = searchTerm === '' || 
        review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
      const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
      const matchesSource = sourceFilter === 'all' || review.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesRating && matchesSource;
    });
  }, [searchTerm, statusFilter, ratingFilter, sourceFilter]);

  const averageRating = useMemo(() => {
    if (filteredReviews.length === 0) return 0;
    return (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1);
  }, [filteredReviews]);

  const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
      'pending': 'status-pending',
      'responded': 'status-responded',
      'flagged': 'status-flagged'
    };
    return classes[status] || '';
  };

  const getSourceClass = (source: string) => {
    const classes: Record<string, string> = {
      'google': 'source-google',
      'yelp': 'source-yelp',
      'facebook': 'source-facebook',
      'internal': 'source-internal'
    };
    return classes[source] || '';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>★</span>
    ));
  };

  return (
    <div className="review-tracker">
      <header className="tracker-header">
        <div>
          <h1>Review Tracker</h1>
          <div className="header-stats">
            <span className="stat-item">
              ⭐ {averageRating} Average Rating
            </span>
            <span className="stat-item">
              📝 {filteredReviews.length} Reviews
            </span>
            <span className="stat-item">
              ⏳ {filteredReviews.filter(r => r.status === 'pending').length} Pending Response
            </span>
          </div>
        </div>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by customer, technician, or review content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
            <option value="flagged">Flagged</option>
          </select>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="all">All Sources</option>
            <option value="google">Google</option>
            <option value="yelp">Yelp</option>
            <option value="facebook">Facebook</option>
            <option value="internal">Internal</option>
          </select>
        </div>
      </div>

      <div className="reviews-container">
        {filteredReviews.map(review => (
          <div key={review.id} className={`review-card ${getStatusClass(review.status)}`}>
            <div className="review-header">
              <div className="review-meta">
                <div className="customer-name">{review.customer}</div>
                <div className="review-rating">{renderStars(review.rating)}</div>
              </div>
              <div className="review-badges">
                <span className={`source-badge ${getSourceClass(review.source)}`}>
                  {review.source}
                </span>
                <span className={`status-badge ${getStatusClass(review.status)}`}>
                  {review.status}
                </span>
              </div>
            </div>

            <div className="review-info">
              <span className="review-id">{review.id}</span>
              <span className="separator">•</span>
              <span>Technician: {review.technician}</span>
              <span className="separator">•</span>
              <span>Job: {review.jobId}</span>
              <span className="separator">•</span>
              <span>{new Date(review.date).toLocaleDateString()}</span>
            </div>

            <div className="review-comment">
              {review.comment}
            </div>

            {review.response && (
              <div className="review-response">
                <div className="response-header">
                  <span className="response-label">Response</span>
                  {review.responseDate && (
                    <span className="response-date">
                      {new Date(review.responseDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="response-text">{review.response}</div>
              </div>
            )}

            {!review.response && review.status === 'pending' && (
              <div className="review-actions">
                <button className="btn-respond">Respond</button>
                {review.rating <= 3 && (
                  <button className="btn-flag">Flag for Review</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
