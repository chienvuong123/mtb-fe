// blocking
export const BLOCKING_CHARACTERS_PARTERN = /[^a-zA-Z0-9]/g;
export const BLOCKING_VN_CHARACTERS_PARTERN = /[^\p{L}0-9]/gu;
export const BLOCKING_VN_SPACE_CHARACTERS_PARTERN = /[^\p{L}\s]/gu;
export const BLOCKING_NUMBER_PARTERN = /[^0-9]/g;
export const BLOCKING_NUMBER_SPACE_COMMA_PATTERN = /[^\p{L}0-9\s,]+$/gu;

// accepting
export const ACCEPTING_FULL_ALPHA_NUMERIC_SPACE_PATTERN = /^[a-zA-Z0-9\s]+$/;
export const ACCEPTING_CONTAIN_LETTER_AND_NUMBER_PATTERN =
  /^(?=.*[a-zA-Z])(?=.*\d).+$/;
export const ACCEPTING_NUMBER_SPACE_COMMA_PATTERN = /^[\p{L}0-9\s,]+$/u;
export const ACCEPTING_PHONE_NUMBER_PATTERN = /^\d{10}$/;
export const ACCEPTING_TEXT_AND_NO_CHARACTER_PATTERN = /^[\p{L}\p{N}\s]+$/u;
export const ACCEPTING_EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// others
export const REMOVE_ACCENTS_REGEX = /[\u0300-\u036f]/g;
