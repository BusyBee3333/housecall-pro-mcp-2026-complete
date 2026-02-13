/**
 * Housecall Pro API Types
 */

export interface HousecallProConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

// Customer Types
export interface Address {
  id: string;
  street: string;
  street_line_2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  type?: 'billing' | 'service';
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  mobile_number?: string;
  home_number?: string;
  work_number?: string;
  company?: string;
  notifications_enabled?: boolean;
  lead_source?: string;
  addresses?: Address[];
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerRequest {
  first_name: string;
  last_name: string;
  email?: string;
  mobile_number?: string;
  home_number?: string;
  work_number?: string;
  company?: string;
  notifications_enabled?: boolean;
  lead_source?: string;
  tags?: string[];
}

// Job Types
export interface LineItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unit_price: number;
  total: number;
  unit?: string;
}

export interface Job {
  id: string;
  customer_id: string;
  address_id?: string;
  schedule?: {
    start: string;
    end: string;
    arrival_window?: string;
  };
  work_status: 'scheduled' | 'on_my_way' | 'working' | 'completed' | 'cancelled';
  invoice_status: 'not_invoiced' | 'invoiced' | 'paid' | 'partial';
  description?: string;
  notes?: string;
  assigned_employees?: string[];
  tags?: string[];
  line_items?: LineItem[];
  total_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateJobRequest {
  customer_id: string;
  address_id?: string;
  schedule?: {
    start: string;
    end: string;
    arrival_window?: string;
  };
  description?: string;
  notes?: string;
  assigned_employees?: string[];
  tags?: string[];
}

// Estimate Types
export interface Estimate {
  id: string;
  customer_id: string;
  address_id?: string;
  job_id?: string;
  status: 'draft' | 'sent' | 'approved' | 'declined' | 'expired';
  line_items?: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  valid_until?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEstimateRequest {
  customer_id: string;
  address_id?: string;
  line_items?: Array<{
    name: string;
    description?: string;
    quantity: number;
    unit_price: number;
  }>;
  notes?: string;
  valid_until?: string;
}

// Invoice Types
export interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  method: 'cash' | 'check' | 'card' | 'ach' | 'other';
  reference?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  job_id: string;
  customer_id: string;
  invoice_number: string;
  status: 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue';
  line_items?: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  amount_paid: number;
  balance: number;
  due_date?: string;
  sent_at?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInvoiceRequest {
  job_id: string;
  line_items?: Array<{
    name: string;
    description?: string;
    quantity: number;
    unit_price: number;
  }>;
  due_date?: string;
  send_immediately?: boolean;
}

// Employee Types
export interface TimeEntry {
  id: string;
  employee_id: string;
  job_id?: string;
  clock_in: string;
  clock_out?: string;
  hours?: number;
  created_at: string;
}

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: string;
  role: 'admin' | 'dispatcher' | 'technician' | 'sales';
  is_active: boolean;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateEmployeeRequest {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: string;
  role: 'admin' | 'dispatcher' | 'technician' | 'sales';
  color?: string;
}

// Dispatch Types
export interface DispatchAssignment {
  job_id: string;
  employee_id: string;
  scheduled_start: string;
  scheduled_end: string;
}

export interface AvailabilitySlot {
  employee_id: string;
  date: string;
  slots: Array<{
    start: string;
    end: string;
    available: boolean;
  }>;
}

// Tag Types
export interface Tag {
  id: string;
  name: string;
  color?: string;
  created_at: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'sms' | 'email' | 'push';
  recipient: string;
  subject?: string;
  message: string;
  status: 'queued' | 'sent' | 'delivered' | 'failed';
  sent_at?: string;
  created_at: string;
}

// Review Types
export interface Review {
  id: string;
  customer_id: string;
  job_id: string;
  rating?: number;
  comment?: string;
  source?: string;
  reviewed_at?: string;
  created_at: string;
}

// Reporting Types
export interface RevenueReport {
  period: string;
  total_revenue: number;
  invoiced: number;
  paid: number;
  outstanding: number;
  by_day?: Array<{
    date: string;
    revenue: number;
  }>;
}

export interface JobCompletionReport {
  period: string;
  total_jobs: number;
  completed: number;
  cancelled: number;
  completion_rate: number;
  by_status?: Record<string, number>;
}

export interface EmployeePerformanceReport {
  employee_id: string;
  employee_name: string;
  period: string;
  jobs_completed: number;
  total_revenue: number;
  hours_worked: number;
  average_rating?: number;
}

// API Error Types
export interface APIError {
  error: string;
  message: string;
  status: number;
  details?: any;
}
