import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row' }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          console.log("route.name------>", route)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            key={route.key}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 15,
              backgroundColor: isFocused ? '#2196F3' : '#fff',
              borderColor: '#2196F3',
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 10,
              margin: 5
            }}
          >
            <Text style={{ color: isFocused ? '#fff' : '#2196F3' }} >{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
