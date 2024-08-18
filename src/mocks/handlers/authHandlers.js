import { http, HttpResponse } from 'msw';

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
      console.error('Error handling request:', error);
      return HttpResponse.status(500).json({ message: '서버 오류' });
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
      console.error('Error handling request:', error);
      return HttpResponse.status(500).json({ message: '서버 오류' });
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
        message: 'Error validating email',
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
        message: 'Error validating email',
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
        message: 'Error validating email',
      });
    }
  }),

  http.post('/api/signup/verify-code', async ({ request }) => {
    try {
      const { code } = await request.json();

      if (code === '1111') {
        console.log('Received code:', code);
        return HttpResponse.json({ result: true });
      }
    } catch (error) {
      return HttpResponse.status(500).json({
        message: 'Error validating email code',
      });
    }
  }),
];
