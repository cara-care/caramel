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
  ThermoScore,
  Accordion,
  AccordionRow,
  IconButton,
  CoverScrollView,
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
  .add('Strikethrough', () => (
    <ColorText style={{color: theme.colors.dusk}}>
      [s]Hello this is a very colorful text![/s]
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
  .add('ThermoScore', () => (
    <ThermoScore middleCount={2} firstPercentage={60} firstColor={'red'} />
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

storiesOf('Accordion', module)
  .addDecorator(getStory => <CenterView align={true}>{getStory()}</CenterView>)
  .add('Accordion List', () => (
    <View style={{width: '100%'}}>
      <Accordion
        animate
        list={[
          {name: 'Name', description: 'description', image: undefined},
          {name: 'Name2', description: 'Description2', image: undefined},
        ]}
      />
    </View>
  ))
  .add('Accordion Row', () => (
    <View style={{width: '100%'}}>
      <AccordionRow
        name={'name'}
        description={'description'}
        image={require('../images/iconArrowDown.png')}
      />
    </View>
  ));

storiesOf('CoverView', module)
  .addDecorator(getStory => <View>{getStory()}</View>)
  .add('CoverView', () => (
    <View style={{width: '100%'}}>
      <CoverScrollView>
        <Text style={{color: 'black'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida
          aliquet fringilla. Duis vestibulum, felis eget interdum auctor, mauris
          mi feugiat purus, at venenatis elit nisi quis turpis. Etiam finibus ut
          mi volutpat sagittis. Cras volutpat malesuada eleifend. In cursus
          risus nec maximus dapibus. Nulla urna eros, elementum at magna
          commodo, tempus auctor justo. Aenean nulla nisi, lacinia faucibus nisl
          ut, pretium facilisis nisl. Nam tincidunt tincidunt justo. Nulla id
          dictum purus. Morbi hendrerit commodo sapien. Nulla euismod vulputate
          odio at vehicula. Pellentesque eu sollicitudin ex, ac eleifend neque.
          Sed quis ante congue, elementum leo vel, interdum velit. Curabitur
          condimentum non velit nec maximus. Nulla faucibus, elit sit amet
          accumsan tempus, enim libero ultrices erat, sit amet molestie quam est
          quis est. Donec eget aliquet purus. Quisque sed ex nec metus commodo
          tristique. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Maecenas aliquam nisi id egestas
          posuere. Cras consectetur at urna nec cursus. Cras orci eros, varius
          non metus id, volutpat ultricies libero. Cras pellentesque diam
          consequat, faucibus magna et, auctor nisi. Donec sit amet varius
          mauris, non malesuada leo. Sed accumsan nisl eros, vitae efficitur
          quam ultrices a. Nulla auctor vulputate quam in pretium. Nullam eget
          nisi at ipsum vehicula facilisis. Sed eu venenatis libero. Ut porta
          cursus efficitur. Mauris congue enim eget turpis blandit, id ultricies
          nisi congue. Maecenas quis ligula imperdiet, fringilla magna nec,
          dignissim nisl. Suspendisse convallis consectetur bibendum. Maecenas
          pulvinar eget metus vel pellentesque. Aliquam arcu arcu, tristique et
          accumsan vel, aliquet quis orci. Mauris hendrerit, elit et finibus
          elementum, risus elit dictum mi, sit amet malesuada tortor erat at
          tellus. Vestibulum et velit tempus, tristique lacus quis, consequat
          elit. Praesent faucibus felis vel enim sodales, non cursus tellus
          volutpat. Morbi eu diam convallis, porttitor lacus vel, vulputate
          turpis. Etiam luctus est a lacus sodales feugiat. Aliquam ultrices
          tempor lectus ac volutpat. Integer volutpat a justo vel sollicitudin.
          Aenean risus tellus, aliquet vel tortor sit amet, fermentum malesuada
          nunc. Fusce maximus odio a elit hendrerit lobortis. Cras faucibus
          mauris id placerat eleifend. Donec mattis metus sit amet orci cursus,
          sed rhoncus augue porttitor. Fusce placerat odio id faucibus
          malesuada. Sed vestibulum felis a risus mollis egestas. Nullam a
          porttitor tellus, eget sodales metus. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus.
        </Text>
      </CoverScrollView>
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
