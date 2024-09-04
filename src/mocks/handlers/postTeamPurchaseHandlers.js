import { http, HttpResponse } from 'msw';

import {
  paginatedPostTeamPurchases,
  postTeamPurchases,
} from '../mockData/postTeamPurchases';

export const postTeamPurchaseHandlers = [
  http.get(
    '/api/users/meetings/:meetingId/snapshots/post-purchases/team',
    (req) => {
      const { request } = req;
      const meetingId = Number(req.params.meetingId);
      const urlString = request.url.toString();

      try {
        const url = new URL(urlString);
        const pageParam = Number(url.searchParams.get('page')) || 0;

        const paginatedResponse =
          paginatedPostTeamPurchases[meetingId]?.[pageParam];

        if (!paginatedResponse) {
          return HttpResponse.json({ message: 'Page not found' });
        }

        return HttpResponse.json({
          ...paginatedResponse,
        });
      } catch (error) {
        console.error('Error parsing URL:', error);
        return HttpResponse.status(500).json({ message: 'Error parsing URL' });
      }
    },
  ),

  http.get(
    '/api/users/meetings/:meetingId/snapshots/post-purchases/team/:menuId',
    (req) => {
      const meetingId = Number(req.params.meetingId);
      const menuId = Number(req.params.purchaseId);

      const purchases = postTeamPurchases.find(
        (purchase) => purchase.meetingId === meetingId,
      );

      if (!purchases) {
        return HttpResponse.status(404).json({
          message: 'Meeting not found',
        });
      }

      const teamPurchase = purchases.purchases.find((p) => p.menuId === menuId);

      if (teamPurchase) {
        return HttpResponse.json(teamPurchase);
      }

      return HttpResponse.status(404).json({
        message: 'Team Purchase Item not found',
      });
    },
  ),
];
