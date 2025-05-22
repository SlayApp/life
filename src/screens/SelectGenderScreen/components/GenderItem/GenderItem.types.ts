import {UpdateUserDtoGenderEnum} from 'api-client/api';

export interface IGenderItemProps {
  id: UpdateUserDtoGenderEnum;
  onPress: (id: UpdateUserDtoGenderEnum) => void;
  selected: boolean;
}
