import { restaurantHandlers } from './handlers/restaurantHandlers';
import { teamOrderHandlers } from './handlers/teamOrderHandlers';
import { menuHandlers } from './handlers/menuHandlers';
import { teamPurchaseHandlers } from './handlers/teamPurchaseHandlers';
import { individualPurchaseHandlers } from './handlers/individualPurchaseHandlers';
import { myDataHandlers } from './handlers/myDataHandler';
import { authHandlers } from './handlers/authHandlers';
import { paymentHandlers } from './handlers/paymentHandlers';

export const handler = [
  ...restaurantHandlers,
  ...teamOrderHandlers,
  ...menuHandlers,
  ...teamPurchaseHandlers,
  ...individualPurchaseHandlers,
  ...myDataHandlers,
  ...authHandlers,
  ...paymentHandlers,
];
