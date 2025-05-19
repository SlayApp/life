import DatePicker from 'react-native-date-picker';

import {FluidOnboardingTemplate} from '~/components/FluidOnboardingTemplate';
import {FluidOnboardingWrapper} from '~/components/FluidOnboardingWrapper';

import {useEnterAgeScreen} from './EnterAge.hook';

export const EnterAgeScreen: React.FC = () => {
  const {date, setDate} = useEnterAgeScreen();

  return (
    <FluidOnboardingWrapper>
      <FluidOnboardingTemplate
        title="When is your birthday?"
        subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr">
        <DatePicker
          theme="light"
          mode="date"
          date={date}
          onDateChange={setDate}
        />
      </FluidOnboardingTemplate>
    </FluidOnboardingWrapper>
  );
};
