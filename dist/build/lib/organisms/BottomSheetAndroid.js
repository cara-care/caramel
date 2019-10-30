"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ORIENTATIONS = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];
class BottomSheetAndroid extends react_1.Component {
    constructor(props) {
        super(props);
        this.height = 0;
        this.state = {
            modalVisible: false,
            animatedHeight: new react_native_1.Animated.Value(0),
            pan: new react_native_1.Animated.ValueXY(),
        };
        this.height = props.buttonHeight * props.options.length + 30;
        if (!this.height) {
            this.height = 300;
        }
        this.createPanResponder(props);
    }
    setModalVisible(visible) {
        const { minClosingHeight, duration, onClose } = this.props;
        const { animatedHeight, pan } = this.state;
        if (visible) {
            this.setState({ modalVisible: visible });
            react_native_1.Animated.timing(animatedHeight, {
                toValue: this.height,
                duration,
            }).start();
        }
        else {
            react_native_1.Animated.timing(animatedHeight, {
                toValue: minClosingHeight,
                duration,
            }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                this.setState({
                    modalVisible: visible,
                    animatedHeight: new react_native_1.Animated.Value(0),
                });
                if (typeof onClose === 'function') {
                    onClose();
                }
            });
        }
    }
    createPanResponder(props) {
        const { closeOnDragDown } = props;
        const { pan } = this.state;
        this.panResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: () => closeOnDragDown ? closeOnDragDown : false,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    react_native_1.Animated.event([null, { dy: pan.y }])(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (this.height / 4 - gestureState.dy < 0) {
                    this.setModalVisible(false);
                }
                else {
                    react_native_1.Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
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
        const { animationType, closeOnPressMask, closeOnPressBack, closeOnButtonPress, options, customStyles, cancelButtonIndex, } = this.props;
        const { animatedHeight, pan, modalVisible } = this.state;
        const panStyle = {
            transform: pan.getTranslateTransform(),
        };
        return (<react_native_1.Modal transparent animationType={animationType} visible={modalVisible} supportedOrientations={ORIENTATIONS} onRequestClose={() => {
            if (closeOnPressBack) {
                this.setModalVisible(false);
            }
        }}>
        <react_native_1.KeyboardAvoidingView enabled={react_native_1.Platform.OS === 'ios'} behavior="padding" style={[
            styles.wrapper,
            customStyles ? customStyles.wrapper : undefined,
        ]}>
          <react_native_1.TouchableOpacity style={styles.mask} activeOpacity={1} onPress={() => (closeOnPressMask ? this.close() : null)}/>
          <react_native_1.Animated.View {...(this.panResponder ? this.panResponder.panHandlers : undefined)} style={[
            panStyle,
            styles.container,
            { height: animatedHeight },
            customStyles ? customStyles.container : undefined,
        ]}>
            {options &&
            options.map((option, index) => (<react_native_1.TouchableOpacity key={index} onPress={() => {
                if (index !== cancelButtonIndex) {
                    this.props.onPressWithIndex(index);
                    if (closeOnButtonPress) {
                        this.close();
                    }
                }
                else if (cancelButtonIndex) {
                    this.close();
                }
            }} style={[styles.button, { height: this.props.buttonHeight }]}>
                  <react_native_1.Text style={styles.text}>{option}</react_native_1.Text>
                </react_native_1.TouchableOpacity>))}
          </react_native_1.Animated.View>
        </react_native_1.KeyboardAvoidingView>
      </react_native_1.Modal>);
    }
}
const styles = react_native_1.StyleSheet.create({
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
exports.default = BottomSheetAndroid;
//# sourceMappingURL=BottomSheetAndroid.js.map