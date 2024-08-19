import { http, HttpResponse } from 'msw';
import {
  MAJOR_LIST_API_URL,
  SCHOOL_LIST_API_URL,
} from '@/services/auth/signUpService';

import { applyFiltersAndSorting } from '../filteringAndSorting';
import { paginatedSchools } from '../mockData/schools';
import { paginatedMajors } from '../mockData/majors';

export const authHandlers = [
  http.post('/api/users/signin', async ({ request }) => {
    try {
      const { email, password } = await request.json();

      if (email === 'test@example.com' && password === 'password123') {
        const headers = new Headers();
        headers.set('Authorization', 'mocked-jwt-token');
        headers.set('Refresh', 'mocked-refresh-token');

        return HttpResponse.json(
          { message: '로그인 성공' },
          { status: 200, headers },
        );
      }

      return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({ message: `서버 오류: ${error}` });
    }
  }),

  http.post('/api/businesses/signin', async ({ request }) => {
    try {
      const { email, password } = await request.json();

      if (email === 'test@example.com' && password === 'password123') {
        const headers = new Headers();
        headers.set('Authorization', 'mocked-jwt-token');
        headers.set('Refresh', 'mocked-refresh-token');

        return HttpResponse.json(
          { message: '로그인 성공' },
          { status: 200, headers },
        );
      }

      return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({ message: `서버 오류: ${error}` });
    }
  }),

  http.post('/api/users/email-duplicated', async ({ request }) => {
    try {
      const { email } = await request.json();

      if (email !== 'test@example.com') {
        return HttpResponse.json({ usable: true });
      }

      return HttpResponse.json(
        { message: 'Duplicated Email' },
        { status: 401 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Error validating email: ${error}`,
      });
    }
  }),

  http.post('/api/businesses/email-duplicated', async ({ request }) => {
    try {
      const { email } = await request.json();

      if (email !== 'test@example.com') {
        return HttpResponse.json({ usable: true });
      }

      return HttpResponse.json(
        { message: 'Duplicated Email' },
        { status: 401 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Error validating email: ${error}`,
      });
    }
  }),

  http.post('/api/signup/email-verify', async ({ request }) => {
    try {
      const { email } = await request.json();

      if (email !== 'test@example.com') {
        return HttpResponse.json({ usable: true });
      }

      return HttpResponse.json(
        { message: 'Duplicated Email' },
        { status: 401 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Error validating email: ${error}`,
      });
    }
  }),

  http.post('/api/signup/verify-code', async ({ request }) => {
    try {
      const { code } = await request.json();

      if (code === '1111') {
        return HttpResponse.json({ result: true });
      }
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Error validating email code: ${error}`,
      });
    }
  }),

  http.get(SCHOOL_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const schoolName = url.searchParams.get('schoolName');
      const searchMenu = schoolName ? decodeURIComponent(schoolName) : null;
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedSchools[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { searchMenu, size },
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Error parsing school list URL: ${error}`,
      });
    }
  }),

  http.get(MAJOR_LIST_API_URL, async (req) => {
    const { request } = await req;
    const urlString = request.url.toString();

    try {
      const url = new URL(urlString);
      const majorName = url.searchParams.get('majorName');
      const searchMenu = majorName ? decodeURIComponent(majorName) : null;
      const pageParam = Number(url.searchParams.get('page')) || 0;
      const size = Number(url.searchParams.get('size'));

      const paginatedResponse = paginatedMajors[pageParam];

      if (!paginatedResponse) {
        return HttpResponse.json({ message: 'Page not found' });
      }

      const filteredContent = applyFiltersAndSorting(
        paginatedResponse.content,
        { searchMenu, size },
      );

      return HttpResponse.json({
        ...paginatedResponse,
        content: filteredContent,
      });
    } catch (error) {
      return HttpResponse.status(500).json({
        message: `Error parsing major list URL: ${error}`,
      });
    }
  }),

  http.post('/api/users/signup', async ({ request }) => {
    try {
      const { email, password, name, phoneNumber, address } =
        await request.json();

      if (email && password && name && phoneNumber && address) {
        return HttpResponse.json({ message: '회원가입 성공' }, { status: 200 });
      }

      return HttpResponse.json(
        { message: '잘못된 요청입니다.' },
        { status: 400 },
      );
    } catch (error) {
      return HttpResponse.status(500).json({ message: `서버 오류: ${error}` });
    }
  }),

  http.post('/api/businesses/signup', async ({ request }) => {
    try {
      const { email, password, name, phoneNumber, businessNumber } =
        await request.json();

      if (email && password && name && phoneNumber && businessNumber) {
        return HttpResponse.json(
          { message: '사업자 회원가입 성공' },
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
];
