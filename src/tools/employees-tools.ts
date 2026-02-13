/**
 * Employee Management Tools
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { Employee, CreateEmployeeRequest, TimeEntry } from '../types/index.js';

export function registerEmployeesTools(client: HousecallProClient) {
  return {
    list_employees: {
      description: 'List employees with optional filters',
      parameters: {
        type: 'object',
        properties: {
          is_active: {
            type: 'boolean',
            description: 'Filter by active status',
          },
          role: {
            type: 'string',
            enum: ['admin', 'dispatcher', 'technician', 'sales'],
            description: 'Filter by role',
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
        const employees = await client.listEmployees(params);
        return { employees, count: employees.length };
      },
    },

    get_employee: {
      description: 'Get detailed information about a specific employee',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
        },
        required: ['employee_id'],
      },
      handler: async (params: { employee_id: string }) => {
        const employee = await client.getEmployee(params.employee_id);
        return employee;
      },
    },

    create_employee: {
      description: 'Create a new employee',
      parameters: {
        type: 'object',
        properties: {
          first_name: {
            type: 'string',
            description: 'First name',
          },
          last_name: {
            type: 'string',
            description: 'Last name',
          },
          email: {
            type: 'string',
            description: 'Email address',
          },
          mobile_number: {
            type: 'string',
            description: 'Mobile phone number',
          },
          role: {
            type: 'string',
            enum: ['admin', 'dispatcher', 'technician', 'sales'],
            description: 'Employee role',
          },
          color: {
            type: 'string',
            description: 'Color for calendar display (hex code)',
          },
        },
        required: ['first_name', 'last_name', 'email', 'role'],
      },
      handler: async (params: CreateEmployeeRequest) => {
        const employee = await client.createEmployee(params);
        return employee;
      },
    },

    update_employee: {
      description: 'Update an existing employee',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          first_name: {
            type: 'string',
            description: 'First name',
          },
          last_name: {
            type: 'string',
            description: 'Last name',
          },
          email: {
            type: 'string',
            description: 'Email address',
          },
          mobile_number: {
            type: 'string',
            description: 'Mobile phone number',
          },
          role: {
            type: 'string',
            enum: ['admin', 'dispatcher', 'technician', 'sales'],
            description: 'Employee role',
          },
          is_active: {
            type: 'boolean',
            description: 'Active status',
          },
          color: {
            type: 'string',
            description: 'Color for calendar display (hex code)',
          },
        },
        required: ['employee_id'],
      },
      handler: async (params: any) => {
        const { employee_id, ...updateData } = params;
        const employee = await client.updateEmployee(employee_id, updateData);
        return employee;
      },
    },

    get_employee_schedule: {
      description: 'Get schedule for an employee',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          start_date: {
            type: 'string',
            description: 'Start date for schedule (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'End date for schedule (ISO 8601)',
          },
        },
        required: ['employee_id'],
      },
      handler: async (params: any) => {
        const { employee_id, ...dateParams } = params;
        const schedule = await client.getEmployeeSchedule(employee_id, dateParams);
        return schedule;
      },
    },

    list_employee_time_entries: {
      description: 'List time entries for an employee',
      parameters: {
        type: 'object',
        properties: {
          employee_id: {
            type: 'string',
            description: 'Employee ID',
          },
          start_date: {
            type: 'string',
            description: 'Start date for time entries (ISO 8601)',
          },
          end_date: {
            type: 'string',
            description: 'End date for time entries (ISO 8601)',
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
        required: ['employee_id'],
      },
      handler: async (params: any) => {
        const { employee_id, ...queryParams } = params;
        const timeEntries = await client.listEmployeeTimeEntries(employee_id, queryParams);
        return { time_entries: timeEntries, count: timeEntries.length };
      },
    },
  };
}
