import {UpdateUserDtoGenderEnum} from 'api-client/api';

export const GENDER_ITEMS = [
  UpdateUserDtoGenderEnum.Male,
  UpdateUserDtoGenderEnum.Female,
  UpdateUserDtoGenderEnum.NonBinary,
] as const;
