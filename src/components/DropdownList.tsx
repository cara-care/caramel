import React from 'react';
import {ImageURISource, ViewStyle, FlatList} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
import {DropdownRow} from '..';

interface IProps {
  list: {image?: ImageURISource; name: string; description: string}[];
  style?: ViewStyle;
  disableAutoClose?: boolean;
}

interface IState {}

class DropdownList extends React.Component<IProps, IState> {
  private dropdowns: {index: number; view: DropdownRow}[] = [];

  renderRow(
    item: {
      image?: ImageURISource | undefined;
      name: string;
      description: string;
    },
    index: number,
  ) {
    return (
      <DropdownRow
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
        onOpen={() => {
          if (!this.props.disableAutoClose) {
            this.dropdowns.forEach(dropdown => {
              if (dropdown.index !== index) {
                dropdown.view.changeStatus(false);
              }
            });
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

export default DropdownList;
