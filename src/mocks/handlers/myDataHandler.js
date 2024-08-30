import { http, HttpResponse } from 'msw';

import { applyFiltersAndSorting } from '../filteringAndSorting';
import {
  inquiries,
  inquiryImages,
  paginatedInquiries,
} from '../mockData/inquiries';
import { evaluates, myData, paginatedPoints } from '../mockData/myData';
import { paginatedCampuses } from '../mockData/schools';

import {
  ACCOUNT_API_URL,
  ADDRESS_API_URL,
  CAMPUS_LIST_API_URL,
  EVALUATE_LIST_API_URL,
  INQUIRY_LIST_API_URL,
  MY_PROFILE_API_URL,
  POINT_LIST_API_URL,
  UPDATE_NICKNAME_API_URL,
  UPDATE_PROFILE_API_URL,
} from '@/services/myDataService';

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

  http.get(CAMPUS_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const paginatedResponse = paginatedCampuses[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      return HttpResponse.json(paginatedResponse);
    } catch (error) {
      return HttpResponse.status(404).json({
        message: `Campus list not found: ${error}`,
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

  http.post(ACCOUNT_API_URL, async ({ request }) => {
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
      return HttpResponse.json(
        { message: `서버 오류: ${error}` },
        { status: 500 },
      );
    }
  }),

  http.put(ADDRESS_API_URL, async ({ request }) => {
    try {
      const { postal, streetAddress, detailAddress } = await request.json();
      console.log('update address', postal, streetAddress, detailAddress);
      if (postal && streetAddress && detailAddress) {
        return HttpResponse.json(
          { message: '주소 변경 성공' },
          { status: 200 },
        );
      }

      return HttpResponse.json(
        { message: '잘못된 요청입니다.' },
        { status: 400 },
      );
    } catch (error) {
      return HttpResponse.json(
        { message: `서버 오류: ${error}` },
        { status: 500 },
      );
    }
  }),

  http.get(UPDATE_NICKNAME_API_URL, async () => {
    try {
      const adjectiveList = ['행복한', '친절한', '똑똑한', '즐거운'];
      const nounList = ['김말이', '떡볶이', '오뎅', '치킨'];

      const randomAdjective =
        adjectiveList[Math.floor(Math.random() * adjectiveList.length)];
      const randomNoun = nounList[Math.floor(Math.random() * nounList.length)];

      const randomNickname = `${randomAdjective} ${randomNoun}`;

      return HttpResponse.json({ nickname: randomNickname });
    } catch (error) {
      return HttpResponse.status(404).json({
        message: `My evaluates not found: ${error}`,
      });
    }
  }),

  http.post('/api/password-confirm', async ({ request }) => {
    try {
      const { password } = await request.json();

      if (password === 'password123') {
        return HttpResponse.json({ isCorrected: true });
      } else {
        return HttpResponse.json({ isCorrected: false });
      }
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Error validating password: ${error}`,
      });
    }
  }),

  http.patch(UPDATE_PROFILE_API_URL, async ({ req }) => {
    try {
      const data = await req.formData();

      if (data) {
        return HttpResponse.json(
          { message: '프로필 업데이트 성공' },
          { status: 200 },
        );
      }

      return HttpResponse.json(
        { message: '잘못된 요청입니다.' },
        { status: 400 },
      );
    } catch (error) {
      return HttpResponse.json(
        { message: `서버 오류: ${error}` },
        { status: 500 },
      );
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
      return HttpResponse.json(
        { message: `서버 오류: ${error}` },
        { status: 500 },
      );
    }
  }),

  http.post(INQUIRY_LIST_API_URL, async ({ request }) => {
    try {
      const formData = await request.formData();

      const string = formData.get('request');
      const images = formData.getAll('files');

      if ('title' in string && 'content' in string && images.length <= 3) {
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
      return HttpResponse.json(
        { message: `서버 오류: ${error}` },
        { status: 500 },
      );
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
      return HttpResponse.json(
        { message: `서버 오류: ${error}` },
        { status: 500 },
      );
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

  http.delete(
    `${INQUIRY_LIST_API_URL}/:inquiryId/images/:imageId`,
    async (req) => {
      const inquiryId = Number(req.params.inquiryId);
      const imageId = Number(req.params.imageId);
      return HttpResponse.json(
        {
          message: `Image number ${imageId} of ${inquiryId} deleted successfully`,
        },
        { status: 200 },
      );
    },
  ),

  http.patch(
    `${INQUIRY_LIST_API_URL}/:inquiryId/images/:imageId`,
    async (req) => {
      try {
        const inquiryId = Number(req.params.inquiryId);
        const imageId = Number(req.params.imageId);
        const { sequence } = await req.json();
        return HttpResponse.status(201).json({
          message: `Image number ${imageId} of ${inquiryId} is updated to ${sequence} successfully`,
        });
      } catch (error) {
        return HttpResponse.json(
          { message: `서버 오류: ${error}` },
          { status: 500 },
        );
      }
    },
  ),
];
