import React from 'react';
import {
  Platform,
  ProgressBarAndroid,
  ProgressBarAndroidProps,
  ProgressViewIOS,
  ProgressViewIOSProps,
} from 'react-native';

const ProgressBar: React.FC<
  ProgressBarAndroidProps | ProgressViewIOSProps
> = props => {
  switch (Platform.OS) {
    case 'android':
      return <ProgressBarAndroid {...props} />;
    case 'ios':
      return <ProgressViewIOS {...props} />;
    default:
      return null;
  }
};

export default ProgressBar;
