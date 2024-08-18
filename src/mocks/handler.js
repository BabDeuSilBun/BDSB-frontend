import { restaurantHandlers } from './handlers/restaurantHandlers';
import { teamOrderHandlers } from './handlers/teamOrderHandlers';
import { menuHandlers } from './handlers/menuHandlers';
import { teamMenuHandlers } from './handlers/teamMenuHandlers';
import { individualOrderHandlers } from './handlers/individualOrderHandlers';
import { authHandlers } from './handlers/authHandlers';

export const handler = [
  ...restaurantHandlers,
  ...teamOrderHandlers,
  ...menuHandlers,
  ...teamMenuHandlers,
  ...individualOrderHandlers,
  ...authHandlers,
];
