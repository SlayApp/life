import {memo} from 'react';

import {useUpdateInsets} from '~/hooks/useUpdateInsets';

export const Insets: React.FC = memo(() => {
  useUpdateInsets();

  return null;
});
