import {TInterest} from '../../SelectInterests.types';

export interface IInterestItemProps {
  interest: TInterest;
  onRemoveInterestPress: (id: string) => void;
}
