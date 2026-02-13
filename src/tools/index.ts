/**
 * Tools Registry
 */

import { HousecallProClient } from '../clients/housecall-pro.js';
import { registerJobsTools } from './jobs-tools.js';
import { registerCustomersTools } from './customers-tools.js';
import { registerEstimatesTools } from './estimates-tools.js';
import { registerInvoicesTools } from './invoices-tools.js';
import { registerEmployeesTools } from './employees-tools.js';
import { registerDispatchTools } from './dispatch-tools.js';
import { registerTagsTools } from './tags-tools.js';
import { registerNotificationsTools } from './notifications-tools.js';
import { registerReviewsTools } from './reviews-tools.js';
import { registerReportingTools } from './reporting-tools.js';
import { registerPaymentsTools } from './payments-tools.js';
import { registerSchedulingTools } from './scheduling-tools.js';
import { registerPriceBookTools } from './pricebook-tools.js';
import { registerLeadsTools } from './leads-tools.js';
import { registerWebhooksTools } from './webhooks-tools.js';
import { registerTimeTrackingTools } from './timetracking-tools.js';
import { registerSettingsTools } from './settings-tools.js';

export function registerAllTools(client: HousecallProClient) {
  return {
    ...registerJobsTools(client),
    ...registerCustomersTools(client),
    ...registerEstimatesTools(client),
    ...registerInvoicesTools(client),
    ...registerEmployeesTools(client),
    ...registerDispatchTools(client),
    ...registerTagsTools(client),
    ...registerNotificationsTools(client),
    ...registerReviewsTools(client),
    ...registerReportingTools(client),
    ...registerPaymentsTools(client),
    ...registerSchedulingTools(client),
    ...registerPriceBookTools(client),
    ...registerLeadsTools(client),
    ...registerWebhooksTools(client),
    ...registerTimeTrackingTools(client),
    ...registerSettingsTools(client),
  };
}
