import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';

const CustomDrawer = ({navigation, props}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            bottom: '5%',
            position: 'absolute',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'black'}}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
