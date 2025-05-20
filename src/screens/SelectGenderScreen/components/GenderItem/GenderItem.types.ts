import {EUserGender} from '~/enums/EUserGender';

export interface IGenderItemProps {
  id: EUserGender;
  title: string;
  onPress: (id: EUserGender) => void;
  selected: boolean;
}
