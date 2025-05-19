import {CODE_INPUTS} from '../../VerifyPhoneNumber.constants';
import {CodeItem} from '../CodeItem';

interface IProps {
  code: string;
}

export const CodeField: React.FC<IProps> = ({code}) => {
  return CODE_INPUTS.map(item => (
    <CodeItem
      key={`code-item-${item}`}
      focused={item === 0 || Boolean(code.at(item))}
      value={code.at(item)}
    />
  ));
};
