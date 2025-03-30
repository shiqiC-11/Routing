import { Platform, Dimensions, TextStyle, ViewStyle } from 'react-native';

// Device dimensions
const { width, height } = Dimensions.get('window');

// Type definitions
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeColors {
  primary: ColorPalette;
  secondary: ColorPalette;
  neutral: ColorPalette;
  success: ColorPalette;
  error: ColorPalette;
  warning: ColorPalette;
  background: {
    primary: string;
    secondary: string;
    card: string;
    inverse: string;
  };
  border: {
    light: string;
    medium: string;
    dark: string;
  };
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    inverse: string;
  };
  white: string;
  black: string;
  gray: {
    light: string;
    medium: string;
    dark: string;
    border: string;
  };
  overlay: {
    dark: string;
    light: string;
  };
  danger: string;
}

export type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

export interface Typography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  subtitle1: TextStyle;
  subtitle2: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  overline: TextStyle;
}

export interface Shadow {
  ios?: {
    shadowColor?: string;
    shadowOffset?: {
      width: number;
      height: number;
    };
    shadowOpacity?: number;
    shadowRadius?: number;
  };
  android?: {
    elevation?: number;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: typeof spacing;
  typography: Typography;
  shadows: Record<string, Shadow>;
  responsive: typeof responsive;
  CONSTANTS: typeof CONSTANTS;
}

// Color palette implementation
const colors: ThemeColors = {
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1'
  },
  secondary: {
    50: '#EDE7F6',
    100: '#D1C4E9',
    200: '#B39DDB',
    300: '#9575CD',
    400: '#7E57C2',
    500: '#673AB7',
    600: '#5E35B1',
    700: '#512DA8',
    800: '#4527A0',
    900: '#311B92'
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20'
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C'
  },
  warning: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800',
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100'
  },
  background: {
    primary: '#F8F9FA',
    secondary: '#F8F9FA',
    card: '#FFFFFF',
    inverse: '#000000'
  },
  surface: '#FFFFFF',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    inverse: '#FFFFFF'
  },
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#F5F5F5',
    medium: '#9E9E9E',
    dark: '#616161',
    border: '#E0E0E0'
  },
  overlay: {
    dark: 'rgba(0, 0, 0, 0.5)',
    light: 'rgba(255, 255, 255, 0.5)'
  },
  danger: '#F44336',
  border: {
    light: '#E0E0E0',
    medium: '#9E9E9E',
    dark: '#616161'
  }
};

// Spacing system
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 64,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32
} as const;

// Typography system
const typography: Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  subtitle1: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
};

// Enhanced shadow system
const shadows: Record<string, Shadow> = {
  none: {
    ios: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: 0,
    },
  },
  xs: {
    ios: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
  },
  sm: {
    ios: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  },
  md: {
    ios: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
  },
  lg: {
    ios: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  },
  xl: {
    ios: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
    },
    android: { elevation: 16 },
  },
  small: {
    ios: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  },
  medium: {
    ios: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
  },
  large: {
    ios: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
  }
};

// Responsive design system
export const responsive = {
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 768,
  isLargeDevice: width >= 768,
  spacing: (size: number) => {
    if (width < 375) return size * 0.8;
    if (width >= 768) return size * 1.2;
    return size;
  },
  fontSize: (size: number) => {
    if (width < 375) return size * 0.9;
    if (width >= 768) return size * 1.1;
    return size;
  },
} as const;

// Constants
export const CONSTANTS = {
  BORDER_RADIUS: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 999,
    small: 8,
    medium: 12,
    large: 16
  },
  OPACITY: {
    none: 0,
    low: 0.3,
    medium: 0.5,
    high: 0.7,
    full: 1,
  },
  Z_INDEX: {
    base: 0,
    drawer: 40,
    modal: 50,
    snackbar: 60,
    tooltip: 70,
  },
  ANIMATION: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
} as const;

// Export theme object
export const theme: Theme = {
  colors,
  spacing,
  typography,
  shadows,
  responsive,
  CONSTANTS,
}; 