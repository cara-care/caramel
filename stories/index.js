import React from 'react';
import {StyleSheet, Button, View, Platform, Alert} from 'react-native';

import {storiesOf} from '@storybook/react-native';

/** eslint-disable-next-line import/extensions */
import CenterView from './CenterView';
import {
  Slider,
  Text,
  AnimatedProgressBar,
  ColorText,
  BottomActionSheet,
  OneLineScore,
  DropdownList,
  DropdownRow,
  IconButton,
} from '../src/';
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

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView align={false}>{getStory()}</CenterView>)
  .add('IconButton', () => (
    <IconButton
      onPress={() => Alert.alert('I really do!')}
      textStyle={{fontFamily: theme.typography.medium}}
      text={'I have icons'}
      rightIcon={require('../images/iconArrowDown.png')}
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

storiesOf('ColorText', module)
  .addDecorator(getStory => <CenterView align={true}>{getStory()}</CenterView>)
  .add('Multiple Colors', () => (
    <ColorText style={{color: theme.colors.dusk}}>
      [color:#ff0000]Hello[/color] [color:#00ff00]this is a[/color]
      [color:#0000ff]very colorful[/color] text!
    </ColorText>
  ))
  .add('Bold', () => (
    <ColorText style={{color: theme.colors.dusk}}>
      [b]Hello this is a very colorful text![/b]
    </ColorText>
  ))
  .add('Italic', () => (
    <ColorText style={{color: theme.colors.dusk}}>
      [i]Hello this is a very colorful text![/i]
    </ColorText>
  ))
  .add('Underline', () => (
    <ColorText style={{color: theme.colors.dusk}}>
      [u]Hello this is a very colorful text![/u]
    </ColorText>
  ))
  .add('Link', () => (
    <ColorText
      style={{color: theme.colors.dusk}}
      linkTextStyle={{color: theme.colors.primary}}
      linkEvents={[
        () => Alert.alert('Here is the alert!'),
        () => Alert.alert('Second alert!'),
      ]}>
      [link]Show me an alert![/link] and then [link]the second alert![/link]
    </ColorText>
  ));

storiesOf('ProgressBar', module)
  .addDecorator(getStory => <CenterView align={true}>{getStory()}</CenterView>)
  .add('AnimatedProgressBar', () => (
    <AnimatedProgressBar
      style={styles.animatedProgress}
      background={{height: 4}}
      foreground={{height: 4}}
      percentage={50}
    />
  ))
  .add('One Line Score', () => (
    <OneLineScore middleCount={2} percentage={60} color={'red'} />
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
        }}
      />
    </View>
  ));

storiesOf('Dropdown', module)
  .addDecorator(getStory => <CenterView align={true}>{getStory()}</CenterView>)
  .add('Dropdown List', () => (
    <View style={{width: '100%'}}>
      <DropdownList
        list={[
          {name: 'Name', description: 'description', image: undefined},
          {name: 'Name2', description: 'Description2', image: undefined},
        ]}
      />
    </View>
  ))
  .add('Dropdown Row', () => (
    <View style={{width: '100%'}}>
      <DropdownRow name={'name'} description={'description'} />
    </View>
  ));

const styles = StyleSheet.create({
  animatedProgress: {
    position: 'absolute',
    top: '50%',
    left: 60,
    right: 60,
  },
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
