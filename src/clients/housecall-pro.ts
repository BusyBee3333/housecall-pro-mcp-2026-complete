/**
 * Housecall Pro API Client
 * https://api.housecallpro.com/
 */

import {
  HousecallProConfig,
  PaginationParams,
  PaginatedResponse,
  APIError,
} from '../types/index.js';

export class HousecallProClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: HousecallProConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.housecallpro.com';
  }

  /**
   * Make authenticated request to Housecall Pro API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers as Record<string, string>,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorJson = JSON.parse(errorBody);
          errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch {
          // Use default error message
        }

        const error: APIError = {
          error: 'APIError',
          message: errorMessage,
          status: response.status,
          details: errorBody,
        };
        throw error;
      }

      const data = await response.json();
      return data as T;
    } catch (error: any) {
      if (error.error === 'APIError') {
        throw error;
      }
      
      const apiError: APIError = {
        error: 'NetworkError',
        message: error.message || 'Network request failed',
        status: 0,
        details: error,
      };
      throw apiError;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint;
    
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    return this.request<T>(url, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Paginated GET request - fetches all pages
   */
  async getPaginated<T>(
    endpoint: string,
    params?: PaginationParams & Record<string, any>
  ): Promise<T[]> {
    const allItems: T[] = [];
    let currentPage = params?.page || 1;
    const pageSize = params?.page_size || 50;
    
    // Create params without page/page_size for first request
    const { page, page_size, ...otherParams } = params || {};

    while (true) {
      const response = await this.get<PaginatedResponse<T>>(endpoint, {
        ...otherParams,
        page: currentPage,
        page_size: pageSize,
      });

      allItems.push(...response.data);

      // Check if we've reached the last page
      if (currentPage >= response.total_pages) {
        break;
      }

      currentPage++;
    }

    return allItems;
  }

  /**
   * Paginated GET request - single page
   */
  async getPage<T>(
    endpoint: string,
    params?: PaginationParams & Record<string, any>
  ): Promise<PaginatedResponse<T>> {
    return this.get<PaginatedResponse<T>>(endpoint, params);
  }

  // ===== Customer Endpoints =====

  async listCustomers(params?: PaginationParams & {
    search?: string;
    tags?: string[];
    lead_source?: string;
  }) {
    return this.getPaginated('/customers', params);
  }

  async getCustomer(customerId: string) {
    return this.get(`/customers/${customerId}`);
  }

  async createCustomer(data: any) {
    return this.post('/customers', data);
  }

  async updateCustomer(customerId: string, data: any) {
    return this.patch(`/customers/${customerId}`, data);
  }

  async deleteCustomer(customerId: string) {
    return this.delete(`/customers/${customerId}`);
  }

  async searchCustomers(query: string, params?: PaginationParams) {
    return this.getPaginated('/customers', { ...params, search: query });
  }

  async listCustomerAddresses(customerId: string) {
    return this.get(`/customers/${customerId}/addresses`);
  }

  // ===== Job Endpoints =====

  async listJobs(params?: PaginationParams & {
    customer_id?: string;
    work_status?: string;
    invoice_status?: string;
    start_date?: string;
    end_date?: string;
    tags?: string[];
  }) {
    return this.getPaginated('/jobs', params);
  }

  async getJob(jobId: string) {
    return this.get(`/jobs/${jobId}`);
  }

  async createJob(data: any) {
    return this.post('/jobs', data);
  }

  async updateJob(jobId: string, data: any) {
    return this.patch(`/jobs/${jobId}`, data);
  }

  async completeJob(jobId: string) {
    return this.post(`/jobs/${jobId}/complete`, {});
  }

  async cancelJob(jobId: string, reason?: string) {
    return this.post(`/jobs/${jobId}/cancel`, { reason });
  }

  async listJobLineItems(jobId: string) {
    return this.get(`/jobs/${jobId}/line_items`);
  }

  async addJobLineItem(jobId: string, data: any) {
    return this.post(`/jobs/${jobId}/line_items`, data);
  }

  async scheduleJob(jobId: string, schedule: any) {
    return this.post(`/jobs/${jobId}/schedule`, schedule);
  }

  async rescheduleJob(jobId: string, schedule: any) {
    return this.patch(`/jobs/${jobId}/schedule`, schedule);
  }

  // ===== Estimate Endpoints =====

  async listEstimates(params?: PaginationParams & {
    customer_id?: string;
    status?: string;
  }) {
    return this.getPaginated('/estimates', params);
  }

  async getEstimate(estimateId: string) {
    return this.get(`/estimates/${estimateId}`);
  }

  async createEstimate(data: any) {
    return this.post('/estimates', data);
  }

  async updateEstimate(estimateId: string, data: any) {
    return this.patch(`/estimates/${estimateId}`, data);
  }

  async sendEstimate(estimateId: string, options?: { email?: string; message?: string }) {
    return this.post(`/estimates/${estimateId}/send`, options);
  }

  async approveEstimate(estimateId: string) {
    return this.post(`/estimates/${estimateId}/approve`, {});
  }

  async declineEstimate(estimateId: string, reason?: string) {
    return this.post(`/estimates/${estimateId}/decline`, { reason });
  }

  async convertEstimateToJob(estimateId: string) {
    return this.post(`/estimates/${estimateId}/convert`, {});
  }

  // ===== Invoice Endpoints =====

  async listInvoices(params?: PaginationParams & {
    customer_id?: string;
    job_id?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
  }) {
    return this.getPaginated('/invoices', params);
  }

  async getInvoice(invoiceId: string) {
    return this.get(`/invoices/${invoiceId}`);
  }

  async createInvoice(data: any) {
    return this.post('/invoices', data);
  }

  async sendInvoice(invoiceId: string, options?: { email?: string; message?: string }) {
    return this.post(`/invoices/${invoiceId}/send`, options);
  }

  async markInvoicePaid(invoiceId: string, payment: any) {
    return this.post(`/invoices/${invoiceId}/payments`, payment);
  }

  async listInvoicePayments(invoiceId: string) {
    return this.get(`/invoices/${invoiceId}/payments`);
  }

  // ===== Employee Endpoints =====

  async listEmployees(params?: PaginationParams & {
    is_active?: boolean;
    role?: string;
  }) {
    return this.getPaginated('/employees', params);
  }

  async getEmployee(employeeId: string) {
    return this.get(`/employees/${employeeId}`);
  }

  async createEmployee(data: any) {
    return this.post('/employees', data);
  }

  async updateEmployee(employeeId: string, data: any) {
    return this.patch(`/employees/${employeeId}`, data);
  }

  async getEmployeeSchedule(employeeId: string, params?: {
    start_date?: string;
    end_date?: string;
  }) {
    return this.get(`/employees/${employeeId}/schedule`, params);
  }

  async listEmployeeTimeEntries(employeeId: string, params?: PaginationParams & {
    start_date?: string;
    end_date?: string;
  }) {
    return this.getPaginated(`/employees/${employeeId}/time_entries`, params);
  }

  // ===== Dispatch Endpoints =====

  async getDispatchBoard(params?: {
    date?: string;
    employee_ids?: string[];
  }) {
    return this.get('/dispatch/board', params);
  }

  async assignEmployee(jobId: string, employeeId: string) {
    return this.post(`/jobs/${jobId}/assign`, { employee_id: employeeId });
  }

  async getEmployeeAvailability(employeeId: string, params?: {
    start_date?: string;
    end_date?: string;
  }) {
    return this.get(`/employees/${employeeId}/availability`, params);
  }

  // ===== Tag Endpoints =====

  async listTags(params?: PaginationParams) {
    return this.getPaginated('/tags', params);
  }

  async createTag(data: { name: string; color?: string }) {
    return this.post('/tags', data);
  }

  async deleteTag(tagId: string) {
    return this.delete(`/tags/${tagId}`);
  }

  async addTagToJob(jobId: string, tagId: string) {
    return this.post(`/jobs/${jobId}/tags`, { tag_id: tagId });
  }

  async addTagToCustomer(customerId: string, tagId: string) {
    return this.post(`/customers/${customerId}/tags`, { tag_id: tagId });
  }

  // ===== Notification Endpoints =====

  async listNotifications(params?: PaginationParams & {
    type?: string;
    status?: string;
  }) {
    return this.getPaginated('/notifications', params);
  }

  async sendNotification(data: {
    type: 'sms' | 'email';
    recipient: string;
    subject?: string;
    message: string;
  }) {
    return this.post('/notifications', data);
  }

  async markNotificationRead(notificationId: string) {
    return this.patch(`/notifications/${notificationId}`, { read: true });
  }

  // ===== Review Endpoints =====

  async listReviews(params?: PaginationParams & {
    customer_id?: string;
    job_id?: string;
    rating?: number;
  }) {
    return this.getPaginated('/reviews', params);
  }

  async getReview(reviewId: string) {
    return this.get(`/reviews/${reviewId}`);
  }

  async requestReview(jobId: string, options?: {
    method?: 'sms' | 'email';
    message?: string;
  }) {
    return this.post(`/jobs/${jobId}/request_review`, options);
  }

  // ===== Reporting Endpoints =====

  async getRevenueReport(params: {
    start_date: string;
    end_date: string;
    group_by?: 'day' | 'week' | 'month';
  }) {
    return this.get('/reports/revenue', params);
  }

  async getJobCompletionReport(params: {
    start_date: string;
    end_date: string;
  }) {
    return this.get('/reports/job_completion', params);
  }

  async getEmployeePerformanceReport(params: {
    employee_id?: string;
    start_date: string;
    end_date: string;
  }) {
    return this.get('/reports/employee_performance', params);
  }

  // ===== Payment Endpoints =====

  async listPayments(params?: PaginationParams & {
    invoice_id?: string;
    customer_id?: string;
    method?: string;
    start_date?: string;
    end_date?: string;
  }) {
    return this.getPaginated('/payments', params);
  }

  async getPayment(paymentId: string) {
    return this.get(`/payments/${paymentId}`);
  }

  async createPayment(data: any) {
    return this.post('/payments', data);
  }

  async refundPayment(paymentId: string, amount?: number, reason?: string) {
    return this.post(`/payments/${paymentId}/refund`, { amount, reason });
  }

  async voidPayment(paymentId: string, reason?: string) {
    return this.post(`/payments/${paymentId}/void`, { reason });
  }

  async processCardPayment(data: any) {
    return this.post('/payments/card', data);
  }

  async listPaymentMethods(customerId: string) {
    return this.get(`/customers/${customerId}/payment_methods`);
  }

  async deletePaymentMethod(methodId: string) {
    return this.delete(`/payment_methods/${methodId}`);
  }

  // ===== Scheduling Endpoints =====

  async getSchedule(params: {
    start_date: string;
    end_date: string;
    employee_ids?: string[];
  }) {
    return this.get('/schedule', params);
  }

  async checkAvailability(params: {
    employee_id: string;
    start: string;
    end: string;
  }) {
    return this.get('/schedule/availability', params);
  }

  async findAvailableSlots(params: any) {
    return this.get('/schedule/available_slots', params);
  }

  async createTimeOff(data: any) {
    return this.post('/schedule/time_off', data);
  }

  async deleteTimeOff(timeOffId: string) {
    return this.delete(`/schedule/time_off/${timeOffId}`);
  }

  async listRecurringSchedules(params?: { employee_id?: string }) {
    return this.get('/schedule/recurring', params);
  }

  async createRecurringSchedule(data: any) {
    return this.post('/schedule/recurring', data);
  }

  // ===== Price Book Endpoints =====

  async listPriceBookItems(params?: PaginationParams & {
    category?: string;
    search?: string;
    is_active?: boolean;
  }) {
    return this.getPaginated('/pricebook/items', params);
  }

  async getPriceBookItem(itemId: string) {
    return this.get(`/pricebook/items/${itemId}`);
  }

  async createPriceBookItem(data: any) {
    return this.post('/pricebook/items', data);
  }

  async updatePriceBookItem(itemId: string, data: any) {
    return this.patch(`/pricebook/items/${itemId}`, data);
  }

  async deletePriceBookItem(itemId: string) {
    return this.delete(`/pricebook/items/${itemId}`);
  }

  async listPriceBookCategories() {
    return this.get('/pricebook/categories');
  }

  async createPriceBookCategory(data: any) {
    return this.post('/pricebook/categories', data);
  }

  async bulkUpdatePrices(updates: any[]) {
    return this.post('/pricebook/bulk_update', { updates });
  }

  // ===== Lead Endpoints =====

  async listLeads(params?: PaginationParams & {
    status?: string;
    source?: string;
    assigned_to?: string;
    created_after?: string;
  }) {
    return this.getPaginated('/leads', params);
  }

  async getLead(leadId: string) {
    return this.get(`/leads/${leadId}`);
  }

  async createLead(data: any) {
    return this.post('/leads', data);
  }

  async updateLead(leadId: string, data: any) {
    return this.patch(`/leads/${leadId}`, data);
  }

  async convertLeadToCustomer(leadId: string, createJob?: boolean) {
    return this.post(`/leads/${leadId}/convert`, { create_job: createJob });
  }

  async deleteLead(leadId: string) {
    return this.delete(`/leads/${leadId}`);
  }

  // ===== Webhook Endpoints =====

  async listWebhooks() {
    return this.get('/webhooks');
  }

  async getWebhook(webhookId: string) {
    return this.get(`/webhooks/${webhookId}`);
  }

  async createWebhook(data: any) {
    return this.post('/webhooks', data);
  }

  async updateWebhook(webhookId: string, data: any) {
    return this.patch(`/webhooks/${webhookId}`, data);
  }

  async deleteWebhook(webhookId: string) {
    return this.delete(`/webhooks/${webhookId}`);
  }

  async testWebhook(webhookId: string, eventType?: string) {
    return this.post(`/webhooks/${webhookId}/test`, { event_type: eventType });
  }

  async listWebhookDeliveries(params?: {
    webhook_id?: string;
    status?: string;
    limit?: number;
  }) {
    return this.get('/webhooks/deliveries', params);
  }

  // ===== Time Tracking Endpoints =====

  async listTimeEntries(params?: PaginationParams & {
    employee_id?: string;
    job_id?: string;
    start_date?: string;
    end_date?: string;
    status?: string;
  }) {
    return this.getPaginated('/time_entries', params);
  }

  async getTimeEntry(entryId: string) {
    return this.get(`/time_entries/${entryId}`);
  }

  async clockIn(data: {
    employee_id: string;
    job_id?: string;
    notes?: string;
  }) {
    return this.post('/time_entries/clock_in', data);
  }

  async clockOut(entryId: string, notes?: string) {
    return this.post(`/time_entries/${entryId}/clock_out`, { notes });
  }

  async createManualTimeEntry(data: any) {
    return this.post('/time_entries', data);
  }

  async updateTimeEntry(entryId: string, data: any) {
    return this.patch(`/time_entries/${entryId}`, data);
  }

  async deleteTimeEntry(entryId: string) {
    return this.delete(`/time_entries/${entryId}`);
  }

  async getEmployeeHours(params: {
    employee_id: string;
    start_date: string;
    end_date: string;
  }) {
    return this.get(`/employees/${params.employee_id}/hours`, {
      start_date: params.start_date,
      end_date: params.end_date,
    });
  }

  // ===== Settings Endpoints =====

  async getCompanyInfo() {
    return this.get('/company');
  }

  async updateCompanyInfo(data: any) {
    return this.patch('/company', data);
  }

  async getBusinessHours() {
    return this.get('/company/business_hours');
  }

  async updateBusinessHours(data: any) {
    return this.put('/company/business_hours', data);
  }

  async getNotificationSettings() {
    return this.get('/company/notification_settings');
  }

  async updateNotificationSettings(data: any) {
    return this.patch('/company/notification_settings', data);
  }

  async getTaxSettings() {
    return this.get('/company/tax_settings');
  }

  async updateTaxSettings(data: any) {
    return this.patch('/company/tax_settings', data);
  }
}
