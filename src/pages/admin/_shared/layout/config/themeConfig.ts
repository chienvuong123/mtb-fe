import type { ThemeConfig } from 'antd';

// ct_: Color/Text
// cb_: Color/Border
// cbg_: Color/Background
// cbTable: Color/Border/Table
// cf_: Color/Function

const color = {
  primary: '#0d57d8',
  cbg3: '#edf3fc',
  cbg4: '#073481',
  cbgDisabled: '#e7e7e7',
  cbTable: '#f1f2f4',
  cbDefault: '#86abeb',
  cfSuccessLight: '#e3fff2',
  cfSuccessMain: '#1abd6f',
  ctError: '#e3171f',
  ctWhite500: '#ffffff',
  ctInk300: '#42536d',
  ctInk500: '#0f203a',
  ctInk100: '#8994a4',
  colorDisabled: '#767f85',
  menuSelectedBg: 'linear-gradient(274.21deg, #155CD9 0%, #4A8CFF 100%)',
};

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Noto Sans JP, sans-serif',
    fontSize: 16,
    colorPrimary: color.primary,
    colorPrimaryText: color.ctInk500,
  },
  components: {
    Radio: {
      radioSize: 24,
      dotSize: 11,
    },
    Typography: {
      fontSizeHeading3: 28,
    },
    Button: {
      fontWeight: 700,
      paddingInline: 16,
      controlHeightSM: 32,
      controlHeight: 48,
      controlHeightLG: 60,
      borderRadius: 8,
      borderRadiusLG: 8,
      borderRadiusSM: 8,
    },
    Input: {
      activeBorderColor: color.primary,
      colorBorder: color.cbDefault,
      colorError: color.ctError,
      colorText: color.ctInk500,
      colorTextDisabled: color.colorDisabled,
      colorTextPlaceholder: color.ctInk100,
      // paddingInline: 16,
      // paddingInlineSM: 12,
      // lineHeight: 1.5,
      controlHeight: 48,
      controlHeightSM: 40,
      fontSize: 16,
      fontSizeIcon: 20,
      lineWidth: 2,
      borderRadius: 4,
      borderRadiusSM: 4,
    },
    Table: {
      colorFillAlter: color.cbg4,
      headerBorderRadius: 0,
    },
    Form: {
      labelColor: color.ctInk500,
      labelFontSize: 18,
      verticalLabelPadding: '0 0 4px 0',
      labelHeight: 48,
      itemMarginBottom: 0,
    },
    Select: {
      colorBorder: color.cbDefault,
      borderRadius: 4,
      borderRadiusSM: 4,
      controlHeight: 48,
      controlHeightSM: 40,
      colorTextPlaceholder: color.ctInk100,
      fontWeightStrong: 700,
      optionSelectedFontWeight: 700,
      fontSize: 16,
      fontSizeIcon: 16,
      lineWidth: 2,
      lineHeight: 1.5,
      colorBgContainerDisabled: color.cbgDisabled,
      colorTextDisabled: color.colorDisabled,
      optionSelectedBg: color.ctWhite500,
      optionSelectedColor: color.primary,
    },
    Menu: {
      itemHeight: 51,
      itemMarginInline: 12,
      itemMarginBlock: 8,
      itemPaddingInline: 12,
      itemColor: color.ctWhite500,
      itemHoverBg: color.cbg3,
      itemHoverColor: color.primary,
      itemSelectedColor: color.ctWhite500,
      itemSelectedBg: color.menuSelectedBg,
    },
    Progress: {
      defaultColor: color.primary,
      remainingColor: color.cbg3,
      circleTextColor: color.ctInk500,
    },
    Collapse: {
      borderRadiusLG: 8,
      colorBorder: color.primary,
      fontSizeIcon: 20,
    },
    Slider: {
      dotActiveBorderColor: color.ctWhite500,
      dotBorderColor: color.ctWhite500,
    },
  },
};

export default theme;
