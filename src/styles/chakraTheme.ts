import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const theme: ThemeOverride = extendTheme({
  colors: {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    background: 'var(--background)',
    text: 'var(--text)',
    gray: {
      100: 'var(--gray100)',
      200: 'var(--gray200)',
      300: 'var(--gray300)',
      400: 'var(--gray400)',
      500: 'var(--gray500)',
    },
    purple: {
      100: 'var(--purple100)',
      200: 'var(--purple200)',
      300: 'var(--purple300)',
      400: 'var(--purple400)',
      500: 'var(--purple500)',
    },
    warning: 'var(--warning)',
    shadow: 'var(--shadow)',
  },
  fontSizes: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
  },
  radii: {
    default: 'var(--border-radius-default)',
    md: 'var(--border-radius-md)',
    lg: 'var(--border-radius-lg)',
  },
  space: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'var(--border-radius-md)',
        _focus: {
          boxShadow: '0 0 1px 2px var(--primary), 0 1px 1px rgba(0, 0, 0, 0.15)',
        },
      },
      sizes: {
        xs: {
          fontSize: 'var(--font-size-xs)',
          px: 'var(--spacing-xs)',
          py: 'var(--spacing-xs)',
        },
        sm: {
          fontSize: 'var(--font-size-sm)',
          px: 'var(--spacing-sm)',
          py: 'var(--spacing-xs)',
        },
        md: {
          fontSize: 'var(--font-size-md)',
          px: 'var(--spacing-md)',
          py: 'var(--spacing-sm)',
        },
        lg: {
          fontSize: 'var(--font-size-lg)',
          px: 'var(--spacing-lg)',
          py: 'var(--spacing-md)',
        },
      },
      variants: {
        solid: {
          bg: 'var(--primary)',
          color: 'white',
          _hover: {
            bg: 'var(--purple400)',
          },
          _active: {
            bg: 'var(--purple500)',
            transform: 'scale(0.98)',
          },
        },
        outline: {
          borderColor: 'var(--primary)',
          color: 'var(--primary)',
          _hover: {
            bg: 'var(--purple100)',
          },
          _active: {
            bg: 'var(--purple200)',
            transform: 'scale(0.98)',
          },
        },
        ghost: {
          color: 'var(--primary)',
          _hover: {
            bg: 'var(--purple100)',
          },
          _active: {
            bg: 'var(--purple200)',
            transform: 'scale(0.98)',
          },
        },
        link: {
          color: 'var(--primary)',
          _hover: {
            textDecoration: 'underline',
          },
          _active: {
            color: 'var(--purple500)',
          },
        },
      },
    },
  },
});

export default theme;
