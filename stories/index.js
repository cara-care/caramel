import React from 'react';
import {StyleSheet, Button, View, Platform} from 'react-native';

import {storiesOf} from '@storybook/react-native';

/** eslint-disable-next-line import/extensions */
import CenterView from './CenterView';
import {Slider, Text, BottomActionSheet} from '../src/';
import theme from '../src/utils/Theme';

storiesOf('Slider', module)
  .addDecorator(getStory => <CenterView align={false}>{getStory()}</CenterView>)
  .add('Slider', () => (
    <Slider
      minimum={0}
      maximum={10}
      onValueChange={number => {
        console.log(number);
      }}
      thumbWidth={50}
      showTooltipOnSlide={true}
      leftText={'Not at all'}
      rightText={'Extreme'}
      existingValue={5}
      thumbStyle={styles.thumbStyle}
    />
  ));

storiesOf('Texts', module)
  .addDecorator(getStory => <CenterView align={true}>{getStory()}</CenterView>)
  .add('Header 1', () => (
    <Text type="header1" style={{color: theme.colors.dusk}}>
      Hello World
    </Text>
  ))
  .add('Header 2', () => (
    <Text type="header2" style={{color: theme.colors.primary}}>
      Hello World
    </Text>
  ))
  .add('Header 3', () => (
    <Text type="header3" style={{color: theme.colors.darkGrey}}>
      Hello World
    </Text>
  ))
  .add('Header 4', () => (
    <Text type="header4" style={{color: theme.colors.raspberryRed}}>
      Hello World
    </Text>
  ));

storiesOf('BottomActionSheet', module)
  .addDecorator(getStory => <CenterView align={true}>{getStory()}</CenterView>)
  .add('BottomActionSheet', () => (
    <View>
      <Button
        onPress={() => {
          this.bottomActionSheet.openSheet();
        }}
        title="Open"
      />
      <BottomActionSheet
        ref={ref => {
          this.bottomActionSheet = ref;
        }}
        options={['OK', 'Cancel']}
        cancelButtonIndex={1}
        onPressWithIndex={index => {
          if (Platform.OS === 'android' && index === 0) {
            this.bottomActionSheet.closeSheet();
          }
          console.log(index);
        }}
      />
    </View>
  ));

const styles = StyleSheet.create({
  thumbStyle: {
    height: 31,
    borderRadius: 15.5,
    borderColor: 'rgb(243, 243, 243)',
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.0,
    elevation: 5,
  },
});
