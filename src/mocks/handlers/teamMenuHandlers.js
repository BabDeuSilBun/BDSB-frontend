import { http, HttpResponse } from 'msw';
import { TEAM_MENU_LIST_API_URL } from '@/services/teamMenuService';
import { paginatedTeamMenus, teamMenus } from '../mockData/teamMenus';

export const teamMenuHandlers = [
  http.get('/api/users/meetings/:meetingId/team-order', (req) => {
    const { request } = req;
    const meetingId = Number(req.params.meetingId);
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      // const schoolId = url.searchParams.get('schoolId');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedTeamMenus[meetingId]?.[pageParam];

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

  http.get('/api/users/meetings/:meetingId/team-order/purchaseId', (req) => {
    const meetingId = Number(req.params.meetingId);
    const purchaseId = Number(req.params.purchaseId);

    const teamMenu = teamMenus.filter(
      (teamMenu) => teamMenu.meetingId === meetingId,
    );
    const teamPurchase = teamMenu.find((p) => p.purchaseId === purchaseId);

    if (teamPurchase) {
      return HttpResponse.json(teamPurchase);
    }

    return HttpResponse.status(404).json({
      message: 'Team Menu Item not found',
    });
  }),
];