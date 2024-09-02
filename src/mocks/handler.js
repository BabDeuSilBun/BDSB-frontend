import { authHandlers } from './handlers/authHandlers';
import { individualPurchaseHandlers } from './handlers/individualPurchaseHandlers';
import { menuHandlers } from './handlers/menuHandlers';
import { myDataHandlers } from './handlers/myDataHandler';
import { paymentHandlers } from './handlers/paymentHandlers';
import { postIndividualPurchaseHandlers } from './handlers/postIndividualPurchaseHandlers';
import { postTeamPurchaseHandlers } from './handlers/postTeamPurchaseHandlers';
import { restaurantHandlers } from './handlers/restaurantHandlers';
import { teamOrderHandlers } from './handlers/teamOrderHandlers';
import { teamPurchaseHandlers } from './handlers/teamPurchaseHandlers';

export const handler = [
  ...restaurantHandlers,
  ...teamOrderHandlers,
  ...menuHandlers,
  ...teamPurchaseHandlers,
  ...postTeamPurchaseHandlers,
  ...individualPurchaseHandlers,
  ...postIndividualPurchaseHandlers,
  ...myDataHandlers,
  ...authHandlers,
  ...paymentHandlers,
];
