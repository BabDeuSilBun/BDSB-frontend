export const RESTAURANT_CATEGORIES = {
  '족발·보쌈': '/jokbal-bossam.svg',
  '찜·탕·찌개': '/stew-soup-stew.svg',
  '돈까스·회·일식': '/tonkatsu-sashimi-japanese.svg',
  피자: '/pizza.svg',
  '고기·구이': '/meat-grill.svg',
  치킨: '/chicken.svg',
  중식: '/chinese.svg',
  아시안: '/asian.svg',
  '카페·디저트': '/cafe-dessert.svg',
  패스트푸드: '/fastfood.svg',
  분식: '/bunsik.svg',
  기타: '/etc.svg',
};

export type RestaurantCategory = keyof typeof RESTAURANT_CATEGORIES;
