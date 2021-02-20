import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTracked} from '../../provider';
import {Actions} from '../../provider/Actions';
import {SIZE} from '../../utils/SizeUtils';

export const SelectionIcon = ({setActionStrip, item}) => {
  const [state, dispatch] = useTracked();
  const {colors, selectionMode, selectedItemsList} = state;
  const [selected, setSelected] = useState(false);


  useEffect(() => {
    if (selectionMode) {
     
      setActionStrip(false);
      let exists = selectedItemsList.filter(
        (o) => o.dateCreated === item.dateCreated,
      );

      if (exists[0]) {
        if (!selected) {
          setSelected(true);
        }
      } else {
        if (selected) {
          setSelected(false);
        }
      }
    }
  }, [selectedItemsList, item.id]);

  onPress = () => {
    if (item.title === 'General' && item.type === 'topic') return;
    dispatch({
      type: Actions.SELECTED_ITEMS,
      item: item,
    });
  };

  return (
    selectionMode && (
      <View
        style={{
          display: 'flex',
          opacity: 1,
          width: "10%",
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 8,
        }}>
        {item.type !== 'topic' ||
        (item.type === 'topic' && item.title !== 'General') ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 70,
            }}>
            <Icon
              size={SIZE.lg}
              color={selected ? colors.accent : colors.icon}
              name={
                selected
                  ? 'check-circle-outline'
                  : 'checkbox-blank-circle-outline'
              }
            />
          </TouchableOpacity>
        ) : null}
      </View>
    )
  );
};
