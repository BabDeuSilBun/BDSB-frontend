import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      light: '#6f6cf6', // purple.400
      dark: '#6f6cf6', // 같은 색상을 사용
    },
    secondary: {
      light: '#e7ecff', // purple.100
      dark: '#141414', // purple.100 (dark mode)
    },
    background: {
      light: '#ffffff',
      dark: '#2c3138',
    },
    text: {
      light: '#010b13',
      dark: '#f8f8f8',
    },
    gray: {
      100: '#f8f8f8',
      200: '#dde1e8',
      300: '#b4bac6',
      400: '#757880',
      500: '#363841',
      light: {
        100: '#f8f8f8',
        200: '#dde1e8',
        300: '#b4bac6',
        400: '#757880',
        500: '#363841',
      },
      dark: {
        100: '#2c3138',
        200: '#363841',
        300: '#757880',
        400: '#b4bac6',
        500: '#dde1e8',
      },
    },
    purple: {
      100: '#e7ecff',
      200: '#bac0f7',
      300: '#8d8bfb',
      400: '#6f6cf6',
      500: '#6851f5',
    },
  },
  breakpoints: {
    base: '0em', // base
    sm: '30rem', // mobile-max
    md: '48rem', // tablet-min
    lg: '62rem', // tablet-max
    xl: '64rem', // desktop
  },
  components: {
    Tabs: {
      baseStyle: {
        tab: {
          _selected: {
            bg: 'transparent',
            color: 'purple.500',
            borderColor: 'purple.500',
          },
          _hover: { color: 'purple.300' },
        },
        tabpanel: {
          px: '0',
        },
      },
    },
  },
});

export default theme;
