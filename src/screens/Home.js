import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';

export default function Home(props) {
  const token = useSelector(state => state?.reducer?.userToken);
  console.log('userDetails---------->>', token);

  const logout = () => {
    auth()
      .signOut()
      .then(res => console.log('User signed out!  ' + JSON.stringify(res)));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity onPress={() => logout()} style={styles.headerView}>
        <Image source={require('../images/logout.png')} style={styles.edit} />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: '90%',
          height: '60%',
        }}>
        <Text style={styles.mainText}>Welcome Home Page</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  edit: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    marginLeft: '80%',
  },
  mainText: {
    fontSize: 40,
    alignSelf: 'center',
    textAlign: 'center',

    color: 'darkred',
  },
  headerView: {
    alignSelf: 'flex-end',
    marginTop: '10%',
    marginRight: '10%',
  },
});
