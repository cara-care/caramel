import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

interface IProps {
  children: any;
  align: any;
}

export default class CenterView extends Component<IProps, any> {
  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <View
        style={[
          this.props.align ? styles.main : styles.mainNoAlign,
          styles.centerStyle,
        ]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainNoAlign: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});
