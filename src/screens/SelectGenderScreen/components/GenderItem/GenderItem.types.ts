import {UpdateUserDtoGenderEnum} from 'api-client';

export interface IGenderItemProps {
  id: UpdateUserDtoGenderEnum;
  onPress: (id: UpdateUserDtoGenderEnum) => void;
  selected: boolean;
}
