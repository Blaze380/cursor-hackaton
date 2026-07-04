import type { IntegrationCheck } from './check.types';
import { serviceCheck } from './checks/service.check';

// forge:checks-start

import { databaseCheck } from './checks/database.check';

import { smtpCheck } from './checks/smtp.check';

import { authUiRoutesCheck } from './checks/auth-ui-routes.check';
// forge:checks-end

export const integrationChecks: IntegrationCheck[] = [
  serviceCheck,
  // forge:registry-start
  
  databaseCheck,

  smtpCheck,

  authUiRoutesCheck,
// forge:registry-end
];
