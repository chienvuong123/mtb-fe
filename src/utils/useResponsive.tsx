// useResponsive.ts
import { Grid } from 'antd';
import { useEffect, useState } from 'react';

const { useBreakpoint } = Grid;

export interface ResponsiveInfo {
  // Breakpoints hiện tại
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;

  // Helpers
  isMobile: boolean; // xs hoặc sm
  isTablet: boolean; // md
  isDesktop: boolean; // lg hoặc xl hoặc xxl

  // Các giá trị padding phổ biến
  headerPadding: React.CSSProperties;
  contentPadding: React.CSSProperties;

  // Các giá trị kích thước phổ biến
  fontSize: {
    small: number;
    medium: number;
    large: number;
  };
}

const useResponsive = (): ResponsiveInfo => {
  const screens = useBreakpoint();
  const [, setWindowWidth] = useState<number>(window.innerWidth);

  // Lắng nghe sự thay đổi kích thước cửa sổ
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Xác định các giá trị helper
  const isMobile = !!screens.xs;
  const isTablet = !!screens.md;
  const isDesktop = !!(screens.lg || screens.xl || screens.xxl);

  // Xác định các giá trị padding phổ biến
  const headerPadding = isMobile
    ? { padding: '0 15px' }
    : { padding: '0 50px' };

  // eslint-disable-next-line no-nested-ternary
  const contentPadding = isMobile
    ? { padding: '10px' }
    : isTablet
      ? { padding: '15px 20px' }
      : { padding: '24px 50px' };

  // Xác định các giá trị font-size phổ biến
  const fontSize = {
    small: isMobile ? 12 : 14,
    medium: isMobile ? 14 : 16,
    large: isMobile ? 18 : 22,
  };

  return {
    // Trạng thái breakpoint
    xs: !!screens.xs,
    sm: !!screens.sm,
    md: !!screens.md,
    lg: !!screens.lg,
    xl: !!screens.xl,
    xxl: !!screens.xxl,

    // Helpers
    isMobile,
    isTablet,
    isDesktop,

    // Padding
    headerPadding,
    contentPadding,

    // Font sizes
    fontSize,
  };
};

export default useResponsive;
