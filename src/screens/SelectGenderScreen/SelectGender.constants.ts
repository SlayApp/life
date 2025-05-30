import {UpdateUserDtoGenderEnum} from 'api-client';

export const GENDER_ITEMS = [
  UpdateUserDtoGenderEnum.Male,
  UpdateUserDtoGenderEnum.Female,
  UpdateUserDtoGenderEnum.NonBinary,
] as const;
