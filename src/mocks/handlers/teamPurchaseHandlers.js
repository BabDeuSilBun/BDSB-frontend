import { http, HttpResponse } from 'msw';

import {
  paginatedTeamPurchases,
  teamPurchases,
} from '../mockData/teamPurchases';

export const teamPurchaseHandlers = [
  http.get('/api/users/meetings/:meetingId/team-purchases', (req) => {
    const { request } = req;
    const meetingId = Number(req.params.meetingId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      // const schoolId = url.searchParams.get('schoolId');
      const pageParam = Number(url.searchParams.get('page')) || 0;

      const paginatedResponse = paginatedTeamPurchases[meetingId]?.[pageParam];

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
  }),

  http.get(
    '/api/users/meetings/:meetingId/team-purchases/:purchaseId',
    (req) => {
      const meetingId = Number(req.params.meetingId);
      const purchaseId = Number(req.params.purchaseId);

      const teamPurchaseList = teamPurchases.filter(
        (teamPurchase) => teamPurchase.meetingId === meetingId,
      );
      const teamPurchase = teamPurchaseList.find(
        (p) => p.purchaseId === purchaseId,
      );

      if (teamPurchase) {
        return HttpResponse.json(teamPurchase);
      }

      return HttpResponse.status(404).json({
        message: 'Team Purchase Item not found',
      });
    },
  ),
];
