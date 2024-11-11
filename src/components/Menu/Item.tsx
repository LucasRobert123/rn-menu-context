import React from 'react';
import { Text, TouchableHighlight, View} from 'react-native';

import styles from './styles';

interface ItemProps {
  children: React.ReactNode;
  onPress: () => void;
}

const Item = (props: ItemProps) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}>
      <View style={styles.item}>
        <Text
          numberOfLines={1}
          allowFontScaling={false}
          style={styles.title}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default Item;
