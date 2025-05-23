import type { ThemeConfig } from 'antd';

// ct_: Color/Text
// cb_: Color/Border
// cbg_: Color/Background
// cbTable: Color/Border/Table
// cf_: Color/Function

const color = {
  primary: '#5C59E8',
  red: '#EB2D4B',
  green: '#31C23F',
  yellow: '#FFC043',
  purple: '#141ED2',
  cbg1: '#DEDEFA',
  cbg2: '#CCCFFF',
  cbg4: '#FFC9D1',
  cbg5: '#FADEDE',
  cbg6: '#FEEDEC',
  cbg7: '#1265E9',
  cbg8: '#E8F1FD',
  cbg10: '#E7F4EE',
  cbg12: '#F4F1E7',
  cbg13: '#CCE6DA',
  cbg14: '#FFEBE9',
  cbg15: '#FFF2D8',
  cbg16: '#F6F6F6',
  cbg17: '#F5F6FA',
  cbgDisabled: '#e7e7e7',
  cbInput: '#DDDDE3',
  cbInputHv: '#A6A6B0',
  cbInputActive: '#808089',
  cbTable: '#f1f2f4',
  cbDefault: '#86abeb',
  cfSuccessLight: '#e3fff2',
  cfSuccessMain: '#1abd6f',
  ctError: '#e3171f',
  ct3: '#5E6371',
  ct4: '#667085',
  ctHeading: '#262626',
  ctSubtle: '#5A5A5A',
  ctLabelForm: '#161616',
  ctMenu: '#5E6371',
  ctWhite500: '#ffffff',
  ctInk300: '#42536d',
  ctInk500: '#0f203a',
  ctInk100: '#8994a4',
  colorDisabled: '#767f85',
  transparent: 'rgba(0, 0, 0, 0)',
  menuSelectedBg: 'linear-gradient(274.21deg, #155CD9 0%, #4A8CFF 100%)',
};

const theme: ThemeConfig = {
  token: {
    fontFamily: 'SF_Pro',
    colorPrimary: color.primary,
    colorSuccess: color.green,
    colorError: color.red,
    colorWarning: color.yellow,
    green1: color.cbg10,
    green2: color.cbg10,
    green6: color.green,
    blue1: color.cbg8,
    blue6: color.cbg7,
    red1: color.cbg5,
    red6: color.red,
    purple: color.purple,
    purple1: color.cbg1,
    geekblue1: color.cbg17,
    geekblue6: color.ctLabelForm,
    colorPrimaryBg: color.cbg1,
  },
  components: {
    Tag: {
      fontSize: 14,
      borderRadiusSM: 1000,
      colorPrimaryBg: color.cbg1,
      colorPrimaryBgHover: color.cbg1,
    },
    Input: {
      colorBorder: color.cbInput,
      hoverBorderColor: color.cbInputHv,
      activeBorderColor: color.cbInputActive,
      paddingInline: 12,
      paddingBlock: 8,
      paddingBlockSM: 4,
      paddingInlineSM: 8,
      borderRadius: 8,
      borderRadiusSM: 6,
      activeShadow: '',
      fontSize: 14,
    },
    Button: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 20,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 25,
      paddingInline: 14,
      paddingInlineSM: 10,
      borderRadius: 8,
      borderRadiusSM: 4,
      defaultShadow: '',
      dangerShadow: '',
      primaryShadow: '',
    },
    Checkbox: {
      controlInteractiveSize: 20,
    },
    Pagination: {
      itemActiveBg: color.primary,
      itemBg: color.cbg2,
      colorPrimary: color.ctWhite500,
      colorPrimaryHover: color.ctWhite500,
      colorText: color.primary,
      borderRadius: 8,
      itemSize: 32,
      lineHeight: 32,
    },
    Select: {
      controlHeight: 40,
      controlHeightSM: 32,
      hoverBorderColor: color.cbInputHv,
      activeBorderColor: color.cbInput,
      paddingSM: 17,
      activeOutlineColor: '',
      paddingXXS: 0,
      optionPadding: '17.5px 16px',
      optionSelectedBg: color.transparent,
      optionSelectedColor: color.purple,
      optionSelectedFontWeight: 400,
      borderRadiusLG: 8,
      borderRadiusXS: 6,
      boxShadowSecondary: '0px 0px 12px 0px #00000014',
    },
    Menu: {
      itemMarginBlock: 8,
      itemSelectedBg: color.transparent,
      itemHoverBg: color.transparent,
      subMenuItemBg: color.transparent,
      itemColor: color.ctMenu,
      itemSelectedColor: color.purple,
      itemHoverColor: color.purple,
      subMenuItemSelectedColor: color.purple,
      iconMarginInlineEnd: 12,
      fontSize: 16,
      itemHeight: 36,
      lineWidth: 0,
      margin: 10,
    },
    Alert: {
      colorSuccessBg: color.cbg13,
      colorErrorBg: color.cbg14,
      colorWarningBg: color.cbg15,
      defaultPadding: '16px',
      fontSize: 14,
      lineWidth: 0,
      colorText: color.ct3,
      borderRadius: 12,
    },
    Divider: {
      margin: 15,
      lineWidth: 2,
    },
    Dropdown: {
      paddingXXS: 12,
      controlPaddingHorizontal: 12,
      paddingBlock: 10,
      colorText: color.ct4,
      fontSize: 16,
    },
    Form: {
      labelColor: color.ctLabelForm,
      verticalLabelPadding: '0 0 4px',
    },
    Typography: {
      fontSizeHeading2: 28,
      lineHeightHeading2: 1.286,
      titleMarginTop: 0,
      titleMarginBottom: 0,
      colorTextHeading: color.ctHeading,
    },
    Badge: {
      dotSize: 10,
    },
    DatePicker: {
      fontSizeLG: 14,
      controlHeight: 40,
    },
    InputNumber: {
      controlHeight: 40,
    },
    Segmented: {
      itemActiveBg: color.cbg1,
      itemSelectedBg: color.cbg1,
      itemHoverBg: color.cbg1,
      itemColor: color.primary,
      itemSelectedColor: color.primary,
      trackBg: color.ctWhite500,
      trackPadding: 4,
    },
  },
};

export default theme;
