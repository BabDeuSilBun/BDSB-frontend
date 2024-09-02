import { authHandlers } from './handlers/authHandlers';
import { myChatHandlers } from './handlers/chatHandlers';
import { individualPurchaseHandlers } from './handlers/individualPurchaseHandlers';
import { menuHandlers } from './handlers/menuHandlers';
import { myDataHandlers } from './handlers/myDataHandler';
import { paymentHandlers } from './handlers/paymentHandlers';
import { restaurantHandlers } from './handlers/restaurantHandlers';
import { teamOrderHandlers } from './handlers/teamOrderHandlers';
import { teamPurchaseHandlers } from './handlers/teamPurchaseHandlers';

export const handler = [
  ...authHandlers,
  ...myChatHandlers,
  ...individualPurchaseHandlers,
  ...menuHandlers,
  ...myDataHandlers,
  ...paymentHandlers,
  ...restaurantHandlers,
  ...teamOrderHandlers,
  ...teamPurchaseHandlers,
];
