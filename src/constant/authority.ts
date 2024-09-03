const SECRET_KEY = 'your-256-bit-secret'; // 비밀 키 (문자열 형태)
export const email = 'test@example.com'; // 예제 이메일
export const secret = new TextEncoder().encode(SECRET_KEY); // 비밀 키 (바이트 배열 형태)
export const alg = 'HS256'; // 알고리즘
