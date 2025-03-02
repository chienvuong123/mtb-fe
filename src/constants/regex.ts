export const BLOCKING_CHARACTERS_PARTERN = /[^a-zA-Z0-9]/g;
export const BLOCKING_VN_CHARACTERS_PARTERN = /[^\p{L}0-9]/gu;
export const BLOCKING_VN_SPACE_CHARACTERS_PARTERN = /[^\p{L}\s]/gu;
export const BLOCKING_NUMBER_PARTERN = /[^0-9]/g;
export const ACCEPTING_FULL_ALPHA_NUMERIC_SPACE_PATTERN = /^[a-zA-Z0-9\s]+$/;
export const ACCEPTING_CONTAIN_LETTER_AND_NUMBER_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*\d).+$/;
