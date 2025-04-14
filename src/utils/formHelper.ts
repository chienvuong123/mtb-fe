export const getValueFromEvent = (value: string, pattern?: RegExp) =>
  pattern ? value.normalize('NFC').replace(pattern, '') : value;
