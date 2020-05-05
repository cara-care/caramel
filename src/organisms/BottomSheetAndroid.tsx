import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
  PanResponderInstance,
  ViewStyle,
  Text,
} from 'react-native';

const ORIENTATIONS: (
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right')[] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

interface CustomStyle {
  wrapper?: ViewStyle;
  container?: ViewStyle;
  draggableIcon?: ViewStyle;
}

interface IProps {
  minClosingHeight?: number;
  duration?: number;
  onClose: (() => void) | null;
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  closeOnPressBack?: boolean;
  closeOnButtonPress?: boolean;
  animationType?: 'none' | 'slide' | 'fade' | undefined;
  customStyles?: CustomStyle;
  options: Array<string>;
  onPressWithIndex: (buttonIndex: number) => void;
  cancelButtonIndex?: number;
  buttonHeight: number;
}

class BottomSheetAndroid extends Component<IProps, any> {
  private height: number = 0;
  private panResponder?: PanResponderInstance;
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };

    this.height = props.buttonHeight * props.options.length + 30;

    if (!this.height) {
      this.height = 300;
    }
    this.createPanResponder(props);
  }

  setModalVisible(visible: boolean) {
    const {minClosingHeight, duration, onClose} = this.props;
    const {animatedHeight, pan} = this.state;
    if (visible) {
      this.setState({modalVisible: visible});
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: this.height!,
        duration,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight!,
        duration,
      }).start(() => {
        pan.setValue({x: 0, y: 0});
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });

        if (typeof onClose === 'function') {
          onClose();
        }
      });
    }
  }

  createPanResponder(props: IProps) {
    const {closeOnDragDown} = props;
    const {pan} = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () =>
        closeOnDragDown ? closeOnDragDown : false,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(
            e,
            gestureState,
          );
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.height! / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const {
      animationType,
      closeOnPressMask,
      closeOnPressBack,
      closeOnButtonPress,
      options,
      customStyles,
      cancelButtonIndex,
    } = this.props;
    const {animatedHeight, pan, modalVisible} = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    return (
      <Modal
        transparent
        animationType={animationType}
        visible={modalVisible}
        supportedOrientations={ORIENTATIONS}
        onRequestClose={() => {
          if (closeOnPressBack) {
            this.setModalVisible(false);
          }
        }}>
        <KeyboardAvoidingView
          enabled={Platform.OS === 'ios'}
          behavior="padding"
          style={[
            styles.wrapper,
            customStyles ? customStyles.wrapper : undefined,
          ]}>
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : null)}
          />
          <Animated.View
            {...(this.panResponder ? this.panResponder.panHandlers : undefined)}
            style={[
              panStyle,
              styles.container,
              {height: animatedHeight},
              customStyles ? customStyles.container : undefined,
            ]}>
            {options &&
              options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    if (index !== cancelButtonIndex) {
                      this.props.onPressWithIndex(index);
                      if (closeOnButtonPress) {
                        this.close();
                      }
                    } else if (cancelButtonIndex) {
                      this.close();
                    }
                  }}
                  style={[styles.button, {height: this.props.buttonHeight}]}>
                  <Text style={styles.text}>{option}</Text>
                </TouchableOpacity>
              ))}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 32,
    color: '#2e7df6',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: '#535D7E',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#00000077',
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 0,
    overflow: 'hidden',
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc',
  },
});

export default BottomSheetAndroid;
