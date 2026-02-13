/**
 * Review Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Review } from '../types/index.js';

export function registerReviewsTools(client: HousecallProClient) {
  return {
    list_reviews: {
      description: 'List reviews with optional filters',
      parameters: {
        type: 'object',
        properties: {
          customer_id: {
            type: 'string',
            description: 'Filter by customer ID',
          },
          job_id: {
            type: 'string',
            description: 'Filter by job ID',
          },
          rating: {
            type: 'number',
            description: 'Filter by rating (1-5)',
          },
          page: {
            type: 'number',
            description: 'Page number (default: 1)',
          },
          page_size: {
            type: 'number',
            description: 'Items per page (default: 50)',
          },
        },
      },
      handler: async (params: any) => {
        const reviews = await client.listReviews(params);
        return { reviews, count: reviews.length };
      },
    },

    get_review: {
      description: 'Get detailed information about a specific review',
      parameters: {
        type: 'object',
        properties: {
          review_id: {
            type: 'string',
            description: 'Review ID',
          },
        },
        required: ['review_id'],
      },
      handler: async (params: { review_id: string }) => {
        const review = await client.getReview(params.review_id);
        return review;
      },
    },

    request_review: {
      description: 'Request a review from a customer for a completed job',
      parameters: {
        type: 'object',
        properties: {
          job_id: {
            type: 'string',
            description: 'Job ID',
          },
          method: {
            type: 'string',
            enum: ['sms', 'email'],
            description: 'Review request method',
          },
          message: {
            type: 'string',
            description: 'Custom message to include with the review request',
          },
        },
        required: ['job_id'],
      },
      handler: async (params: any) => {
        const { job_id, ...options } = params;
        const result = await client.requestReview(job_id, options);
        return result;
      },
    },
  };
}
