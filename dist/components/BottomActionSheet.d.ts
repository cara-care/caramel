import { Component } from 'react';
import { ViewStyle } from 'react-native';
interface CustomStyle {
    wrapper?: ViewStyle;
    container?: ViewStyle;
    draggableIcon?: ViewStyle;
}
interface IProps {
    options: Array<string>;
    ios?: {
        destructiveButtonIndex?: number;
    };
    cancelButtonIndex?: number;
    android?: {
        minClosingHeight?: number;
        duration?: number;
        onClose: (() => void) | null;
        closeOnDragDown?: boolean;
        closeOnPressMask?: boolean;
        closeOnPressBack?: boolean;
        closeOnButtonPress?: boolean;
        animationType?: 'none' | 'slide' | 'fade' | undefined;
        customStyles?: CustomStyle;
    };
    onPressWithIndex: (buttonIndex: number) => void;
}
declare class BottomActionSheet extends Component<IProps, any> {
    private ANDROID_SHEET_BUTTON_HEIGHT;
    static defaultProps: IProps;
    private bottomSheetAndroid?;
    private ios;
    constructor(props: IProps);
    openSheet: () => void;
    closeSheet: () => void;
    render(): JSX.Element;
}
export default BottomActionSheet;
