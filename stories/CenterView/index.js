import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import style from './style';

export default function CenterView({children, align}) {
  return (
    <View style={[align ? style.main : style.mainNoAlign, styles.centerStyle]}>
      {children}
    </View>
  );
}

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  centerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
