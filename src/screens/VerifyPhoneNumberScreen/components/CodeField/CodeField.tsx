import {CODE_INPUTS} from '../../VerifyPhoneNumber.constants';
import {CodeItem} from '../CodeItem';

interface IProps {
  code: string;
}

export const CodeField: React.FC<IProps> = ({code}) => {
  return CODE_INPUTS.map(item => <CodeItem key={item} value={code.at(item)} />);
};
