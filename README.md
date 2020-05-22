# caramel
Cross-platform UI component library for React Native by [Cara Care](https://cara.care/).\
More on https://caramel.cara.care/.

## Installation
```
yarn add @cara-care/caramel
```
or with `npm`
```
npm install @cara-care/caramel --save
```

## Peer Dependencies
* [react-navigation](https://github.com/react-navigation/react-navigation)

## Documentation
You can find a list of components and their documentations at https://caramel.cara.care.

## Start using
```
import React from 'react';
import {Container, Text, Accordion} from '@cara-care/caramel';

const App: () => React$Node = () => {
  return (
    <Container>
      <Text type="header1">Welcome to caramel</Text>
      <Accordion
        list={[
          {
            image: require('./caramel.png'),
            name: 'Caramel 1',
            description: 'Lorem ipsum dolor sit amet.',
          },
          {
            image: require('./caramel.png'),
            name: 'Caramel 2',
            description: 'Lorem ipsum dolor sit amet.',
          },
        ]}
        animate
      />
    </Container>
  );
};

export default App;
```

## Caramel for web
If you'd like to use caramel components for your web applications, you can do this using [react-native-web](https://github.com/necolas/react-native-web). We have prepared an example project for you [here](https://github.com/cara-care/caramel-web). And here it is in action: https://caramel-web.cara.care/.

## Want to contribute?
We always welcome your help. If you want to help develop caramel further, you can use our [Storybook](https://storybook.js.org/docs/guides/guide-react-native/) project on https://github.com/cara-care/caramel-storybook. With Storybook's help, you can see the visual representations of what you did and easily test everything.

## Attribution
* Slider component based on [jeanregisser's react-native-slider](https://github.com/jeanregisser/react-native-slider).
* Android version of the Bottom Sheet based on [nysamnang's react-native-raw-bottom-sheet](https://github.com/nysamnang/react-native-raw-bottom-sheet).

<p align="center">
  <h1 align="center">🍱 💩 Cara Care 🧠 😌</h1>
</p>
<p align="center">
  <a href="https://apps.apple.com/app/apple-store/id1133687886">Download iOS</a> • <a href="https://play.google.com/store/apps/details?id=com.gohidoc.cara">Download Android</a>
<br><br>
</p>

Cara Care is a mobile app that allows people with chronic stomach disorders to track the food they consume and get advised by professional nutritionists to improve their condition.
