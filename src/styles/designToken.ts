// to be edited
// colors, breakpoint, font-weight....
// 여기 적혀있는 수치, 컬러코드 등은 다 예시라서 맞게 수정해야 해요!!
// 다 원하는 방식대로 수정하세요!!
// 단위는 최대한 px 보다 rem (반응형)

export const colorToken = {
    // 주요 색상 4개, grayscale, error
    primary: '#',
    secondary: '#',
    background: 'ffffff',
    dimedBg: '', // same with grayscale 100
    text: '#', //same with grayscale 400
    grayscale: {
      100: '#f8f9fa',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
  },
  dark: '', //gray 5
  error: '#b00020'
  };
  
//   export const spacingToken = {
//     small: '8px',
//     medium: '16px',
//     large: '24px',
//   };

export const widthToken = {
  maxWidth: '1100px', //이거 수정??
}

export const borderToken = {
  default: '0.6rem',
  md: '0.5rem',
  lg: '1rem',
}

export const fontWeightToken = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  extraBold: 800
};

// 글꼴 크기 토큰
export const fontSizeToken = {
  small: '0.875rem',  // 14px
  medium: '1rem',     // 16px
  large: '1.25rem',   // 20px
  xl: '1.5rem',       // 24px
  xxl: '2rem'         // 32px
};

// 간격 토큰
export const spacingToken = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '1.5rem',   // 24px
  lg: '2rem',     // 32px
  xl: '3rem'      // 48px
};

export const breakpointToken = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  largeDesktop: '1200px'
};