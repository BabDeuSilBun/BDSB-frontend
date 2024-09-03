import { http, HttpResponse } from 'msw';

import { getPaginatedTeamItems } from '../mockData/teamPurchases';

export const teamPurchaseHandlers = [
  http.get(
    '/api/users/meetings/:meetingId/team-order',
    ({ request, params }) => {
      const { meetingId } = params;

      try {
        const url = new URL(request.url);
        const pageParam = Number(url.searchParams.get('page')) || 0;
        const size = Number(url.searchParams.get('size')) || 10;

        const paginatedResponse = getPaginatedTeamItems(meetingId)[pageParam];

        if (size !== 10) paginatedResponse.items.content.slice(0, size);

        if (!paginatedResponse) {
          return HttpResponse.json({ message: 'Team Purchases not found' });
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

  http.get(TEAM_PURCHASE_API_URL, ({ params }) => {
    const { meetingId, purchaseId } = params;

    const purchases = teamPurchases[meetingId];
    if (!purchases) {
      return HttpResponse.status(404).json({
        message: 'Meeting not found',
      });
    }

    const teamPurchase = purchases.find((p) => p.purchaseId === purchaseId);

    if (teamPurchase) {
      return HttpResponse.json(teamPurchase);
    }

    return HttpResponse.status(404).json({
      message: 'Team Purchase Item not found',
    });
  }),
];
