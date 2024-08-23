interface AccountRules {
  [key: string]: {
    [length: string]: RegExp;
  };
}

export const BANK_INFO = [
  { id: 1, value: 'SHINHAN', name: '신한', url: '/shinhan.svg', code: ['088'] },
  { id: 2, value: 'NH', name: '농협', url: '/nh.svg', code: ['011'] },
  {
    id: 3,
    value: 'HANA',
    name: '하나',
    url: '/hana.svg',
    code: ['005', '081'],
  },
  { id: 4, value: 'KOOKMIN', name: '국민', url: '/kb.svg', code: ['004'] },
  {
    id: 5,
    value: 'KAKAO',
    name: '카카오뱅크',
    url: '/kakao.svg',
    code: ['090'],
  },
  { id: 6, value: 'TOSS', name: '토스', url: '/toss.svg', code: ['092'] },
];

export const accountRules: AccountRules = {
  '004': {
    '12': /^(01|21|24|05|06)/,
    '14': /^(01|02|25|92)/,
  },
  '005': {
    '11': /^(13|18|19|26|33|38|39)/,
    '12': /^(600|611|620)/,
  },
  '081': {
    '14': /^(02|05|07|08|15)/,
  },
  '011': {
    '11': /^(01|02|06|12)/,
    '12': /^(01|02|06|12)/,
    '13': /^(301|302|306|312)/,
    '14': /^(64|65|790|791)/,
  },
  '088': {
    '11': /^(0[1-6]|08|09|12|13|61|99)/,
    '12': /^(1[0-5][0-9]|16[01])/,
    '13': /^(81|82)/,
    '14': /^(560|561|562|901)/,
  },
  '090': {
    '13': /^(3333|7979|7777)/,
  },
  '092': {
    '12': /^(100)/,
  },
};
