import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ImageURISource,
  ImageStyle,
  TextStyle,
  ViewStyle,
  LayoutAnimation,
} from 'react-native';
import theme from '../utils/Theme';

interface IProps {
  name: string;
  description: string;
  image?: ImageURISource;
  iconStyle?: ImageStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  arrowStyle?: ImageStyle;
  separatorStyle?: ViewStyle;
  rowContainerStyle?: ViewStyle;
  onOpen?: () => void;
  onClose?: () => void;
  animate?: boolean;
}

interface IState {
  isOpen: boolean;
}

class AccordionRow extends React.Component<IProps, IState> {
  private arrowDown: ImageURISource = require('../../images/iconArrowDown.png');
  private arrowUp: ImageURISource = require('../../images/iconArrowUp.png');

  state = {isOpen: false};

  changeStatus(isOpen: boolean) {
    if (this.props.animate) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    this.setState({isOpen});
  }

  render = () => {
    const {
      name,
      description,
      image,
      iconStyle,
      titleStyle,
      descriptionStyle,
      arrowStyle,
      separatorStyle,
      onOpen,
      onClose,
      rowContainerStyle,
    } = this.props;

    const {isOpen} = this.state;

    return (
      <View style={styles.root}>
        <TouchableOpacity
          onPress={() => {
            if (!isOpen === true && !!onOpen) {
              onOpen();
            } else if (onClose) {
              onClose();
            }

            this.setState({isOpen: !isOpen});
          }}>
          <View style={[styles.contentContainer, rowContainerStyle]}>
            <View style={styles.imageTextContainer}>
              {!!image && (
                <Image style={[styles.icon, iconStyle]} source={image} />
              )}

              <Text style={[styles.dropdownName, titleStyle]}>{name}</Text>
            </View>
            <Image
              style={[styles.arrow, arrowStyle]}
              source={isOpen ? this.arrowUp : this.arrowDown}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={[
            styles.description,
            descriptionStyle,
            {height: isOpen ? 'auto' : 0, marginBottom: isOpen ? 15 : 0},
          ]}>
          {description}
        </Text>
        <View style={[styles.separator, separatorStyle]} />
      </View>
    );
  };
}

export default AccordionRow;

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  description: {
    marginLeft: 50,
    marginRight: 20,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.dusk2,
  },
  arrow: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.dusk2,
    opacity: 0.2,
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  imageTextContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  dropdownName: {
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.dusk2,
  },
});
