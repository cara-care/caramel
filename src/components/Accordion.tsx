import React from 'react';
import {ImageURISource, ViewStyle, FlatList, ImageStyle, TextStyle} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
import {AccordionRow} from '..';

interface IProps {
  list: {
    image?: ImageURISource;
    name: string;
    description: string;
    iconStyle?: ImageStyle;
    titleStyle?: TextStyle;
    descriptionStyle?: TextStyle;
    arrowStyle?: ImageStyle;
    separatorStyle?: ViewStyle;
    onOpen?: () => void;
    onClose?: () => void;
  }[];
  style?: ViewStyle;
  disableAutoClose?: boolean;
}

interface IState {}

class Accordion extends React.Component<IProps, IState> {
  private dropdowns: {index: number; view: AccordionRow}[] = [];

  renderRow(
    item: {
      image?: ImageURISource | undefined;
      name: string;
      description: string;
      iconStyle?: ImageStyle;
      titleStyle?: TextStyle;
      descriptionStyle?: TextStyle;
      arrowStyle?: ImageStyle;
      separatorStyle?: ViewStyle;
      onOpen?: () => void;
      onClose?: () => void;
    },
    index: number,
  ) {
    return (
      <AccordionRow
        ref={ref => {
          /**
           * if the list was already filled and the prop changed
           * clean it up
           */
          if (this.dropdowns.find(x => x.index === index)) {
            this.dropdowns = [];
          }

          if (ref) {
            this.dropdowns.push({index, view: ref});
          }
        }}
        iconStyle={item.iconStyle}
        titleStyle={item.titleStyle}
        descriptionStyle={item.descriptionStyle}
        arrowStyle={item.arrowStyle}
        separatorStyle={item.separatorStyle}
        onClose={() => {
          if (item.onClose) {
            item.onClose();
          }
        }}
        onOpen={() => {
          if (!this.props.disableAutoClose) {
            this.dropdowns.forEach(dropdown => {
              if (dropdown.index !== index) {
                dropdown.view.changeStatus(false);
              }
            });
          }
          if (item.onOpen) {
            item.onOpen();
          }
        }}
        name={item.name}
        description={item.description}
        image={item.image}
      />
    );
  }

  render = () => {
    const {list, style} = this.props;

    return (
      <FlatList
        keyExtractor={item => item.name}
        style={style}
        data={list}
        renderItem={({item, index}) => this.renderRow(item, index)}
      />
    );
  };
}

export default Accordion;
