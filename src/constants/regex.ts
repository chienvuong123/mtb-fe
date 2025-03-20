// blocking
export const BLOCKING_CHARACTERS_PARTERN = /[^a-zA-Z0-9]/g;
export const BLOCKING_VN_CHARACTERS_PARTERN = /[^\p{L}0-9]/gu;
export const BLOCKING_VN_SPACE_CHARACTERS_PARTERN = /[^\p{L}\s]/gu;
export const BLOCKING_NUMBER_PARTERN = /[^0-9]/g;
export const BLOCKING_NUMBER_SPACE_COMMA_PATTERN = /[^\p{L}0-9\s,]+$/gu;
export const BLOCKING_ALPHA_NUMERIC_COMMA_PATTERN = /[^a-zA-Z0-9@]/g;

// accepting
export const ACCEPTING_FULL_ALPHA_NUMERIC_SPACE_PATTERN = /^[a-zA-Z0-9\s]+$/;
export const ACCEPTING_CONTAIN_LETTER_AND_NUMBER_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*\d).+$/;
export const ACCEPTING_NUMBER_SPACE_COMMA_PATTERN = /^[\p{L}0-9\s,]+$/u;

// others
export const ACCEPTING_FULL_ALPHA_NUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;
export const REMOVE_ACCENTS_REGEX = /[\u0300-\u036f]/g;

export const URL_REGEX =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
