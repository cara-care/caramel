import { Component } from 'react';
import { ViewStyle } from 'react-native';
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
declare class BottomSheetAndroid extends Component<IProps, any> {
    private height;
    private panResponder?;
    constructor(props: IProps);
    setModalVisible(visible: boolean): void;
    createPanResponder(props: IProps): void;
    open(): void;
    close(): void;
    render(): JSX.Element;
}
export default BottomSheetAndroid;
