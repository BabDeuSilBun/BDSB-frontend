import { authHandlers } from './handlers/authHandlers';
import { myChatHandlers } from './handlers/chatHandlers';
import { holidayHandlers } from './handlers/holidayHandlers';
import { individualPurchaseHandlers } from './handlers/individualPurchaseHandlers';
import { menuHandlers } from './handlers/menuHandlers';
import { myDataHandlers } from './handlers/myDataHandler';
import { paymentHandlers } from './handlers/paymentHandlers';
import { postIndividualPurchaseHandlers } from './handlers/postIndividualPurchaseHandlers';
import { postTeamPurchaseHandlers } from './handlers/postTeamPurchaseHandlers';
import { restaurantHandlers } from './handlers/restaurantHandlers';
import { storeImageHandlers } from './handlers/storeImageHandlers';
import { teamOrderHandlers } from './handlers/teamOrderHandlers';
import { teamPurchaseHandlers } from './handlers/teamPurchaseHandlers';

export const handler = [
  ...authHandlers,
  ...myChatHandlers,
  ...individualPurchaseHandlers,
  ...menuHandlers,
  ...myDataHandlers,
  ...paymentHandlers,
  ...individualPurchaseHandlers,
  ...postIndividualPurchaseHandlers,
  ...postTeamPurchaseHandlers,
  ...restaurantHandlers,
  ...teamOrderHandlers,
  ...teamPurchaseHandlers,
  ...storeImageHandlers,
  ...holidayHandlers,
];
