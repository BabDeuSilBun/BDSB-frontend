import { http, HttpResponse } from 'msw';
import {
  EVALUATE_LIST_API_URL,
  INQUIRY_LIST_API_URL,
  MY_PROFILE_API_URL,
  POINT_LIST_API_URL,
} from '@/services/myDataService';

import { evaluates, myData, paginatedPoints } from '../mockData/myData';
import { applyFiltersAndSorting } from '../filteringAndSorting';
import {
  inquiries,
  paginatedInquiries,
  inquiryImages,
} from '../mockData/inquiries';

export const myDataHandlers = [
  http.get(MY_PROFILE_API_URL, () => {
    try {
      return HttpResponse.json(myData);
    } catch (error) {
      return HttpResponse.status(404).json({
        message: `My data not found: ${error}`,
      });
    }
  }),

  http.get(EVALUATE_LIST_API_URL, () => {
    try {
      return HttpResponse.json(evaluates);
    } catch (error) {
      return HttpResponse.status(404).json({
        message: `My evaluates not found: ${error}`,
      });
    }
  }),

  http.post('/api/users/account', async ({ request }) => {
    try {
      const { owner, bankAccount, selectedBank } = await request.json();

      if (owner && bankAccount && selectedBank) {
        return HttpResponse.json(
          { message: '계좌 변경 성공' },
          { status: 200 },
        );
      }

      return HttpResponse.json(
        { message: '잘못된 요청입니다.' },
        { status: 400 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({ message: `서버 오류: ${error}` });
    }
  }),

  http.get(POINT_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const sortCriteria = url.searchParams.get('sortCriteria');
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedPoints[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { size },
        sortCriteria,
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.post(INQUIRY_LIST_API_URL, async ({ request }) => {
    try {
      const formData = await request.formData();

      const title = formData.get('title');
      const content = formData.get('content');
      const images = formData.getAll('images');

      if (title && content && 0 <= images.length && images.length <= 3) {
        return HttpResponse.json(
          { message: '문의 등록 성공' },
          { status: 200 },
        );
      }

      return HttpResponse.json(
        { message: '잘못된 요청입니다.' },
        { status: 400 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({ message: `서버 오류: ${error}` });
    }
  }),

  http.get(INQUIRY_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedInquiries[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { size },
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      console.error('Error parsing URL:', error);
      return HttpResponse.status(500).json({ message: 'Error parsing URL' });
    }
  }),

  http.get(`${INQUIRY_LIST_API_URL}/:inquiryId/images`, (req) => {
    const inquiryId = Number(req.params.inquiryId);
    const selectedInquiry = inquiries.find(
      (item) => item.inquiryId === inquiryId,
    );
    if (selectedInquiry) {
      return HttpResponse.json(inquiryImages);
    }
    return HttpResponse.status(404).json({
      message: 'InquiryImages is not found',
    });
  }),
];
