import {isToday, isYesterday} from 'date-fns';
import {useMemo} from 'react';
import {View} from 'react-native';

import {Text} from '~/components/Text';

import {styles} from './ChatDateHeaderMessage.styles';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface IProps {
  date: string;
}

export const ChatDateHeaderMessage: React.FC<IProps> = ({date}) => {
  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);

    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';

    return `${dayNames[dateObj.getDay()]}, ${
      monthNames[dateObj.getMonth()]
    } ${dateObj.getDate()}`;
  }, [date]);

  return (
    <View style={styles.container}>
      <Text color="tertiary" variant="small">
        {formattedDate}
      </Text>
    </View>
  );
};
