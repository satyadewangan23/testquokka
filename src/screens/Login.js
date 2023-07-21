import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {actions} from '../redux/reducer';
const commanState = {
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  checkValidEmail: false,
};
export default function Login(props) {
  const [state, setState] = useState(commanState);
  const [checkedImg, setCheckedImg] = useState(0);

  const dispatch = useDispatch();
  var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  var passwordReg =
    /^(?=.*[0-9])(?=.*[!@#$%^&*?;,+<>])[a-zA-Z0-9!@#$%^&*?;,+<>]{8,}$/;

  const saveEmailPass = async () => {
    if (emailReg.test(state.email) && passwordReg.test(state.password)) {
      auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then(res => {
          console.log(
            'User account created & signed in!' + JSON.stringify(res.user),
          );

          response = JSON.stringify(res.user.email);

          dispatch(actions.setUserToken(response));
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            alert('That email address is invalid!');
          }

          alert(error);
        });
    } else {
      alert('Please Enter Valid Email and Password');
      setState({
        ...state,
        emailError: state.emailError ? '' : 'This field is required',
        passwordError: state.passwordError ? '' : 'This field is required',
      });
    }
  };

  const onchangeEmailFunction = text => {
    if (text.length !== 0) {
      var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text)) {
        setState({
          ...state,
          email: text,
          emailError: '',
          checkValidEmail: false,
        });
      } else {
        setState({
          ...state,
          email: text,
          checkValidEmail: true,
          emailError: 'Please enter a valid email address',
        });
      }
    } else {
      setState({
        ...state,
        email: '',
        emailError: 'This field is required',
      });
    }
  };

  const passwordFunction = text => {
    if (text.length !== 0) {
      var reg =
        /^(?=.*[0-9])(?=.*[!@#$%^&*?;,+<>])[a-zA-Z0-9!@#$%^&*?;,+<>]{8,}$/;
      if (reg.test(text)) {
        setState({...state, password: text, passwordError: ''});
      } else {
        setState({
          ...state,
          password: text,
          passwordError:
            'Password must be at least 8 characters long and contain at least one number',
        });
      }
    } else {
      setState({
        ...state,
        password: '',
        passwordError: 'This field is required',
      });
    }
  };



  const disableBtn = () => {
    alert('Please check the term and condition');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.mainText}>Login</Text>

      <TextInput
        style={styles.textInputBox}
        placeholder={'Email'}
        value={state.email}
        onChangeText={text => onchangeEmailFunction(text)}
      />
      {state.emailError ? (
        <View style={{marginTop: '2%', marginLeft: '5%'}}>
          <Text style={{color: 'red', fontSize: 12}}>{state.emailError}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.textInputBox}
        placeholder={'Password'}
        value={state.password}
        onChangeText={text => passwordFunction(text)}
      />

      {state.passwordError ? (
        <View style={{marginTop: '2%', marginLeft: '5%'}}>
          <Text style={{color: 'red', fontSize: 12}}>
            {state.passwordError}
          </Text>
        </View>
      ) : null}

      <View style={styles.rowContainer}>
        {checkedImg === 0 ? (
          <TouchableOpacity
            onPress={() => setCheckedImg(1)}
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'blue',
              height: 30,
              width: 30,
            }}></TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setCheckedImg(0)}>
            <Image
              source={require('../images/checkedBlue.png')}
              style={styles.img}
            />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.tcText,
            {
              color: 'black',
              opacity: 0.8,
            },
          ]}>
          I confirm that I have read, understood and agreed to the General{' '}
          <Text
            style={{
              color: 'blue',
            }}>
            Terms and Conditions
          </Text>
        </Text>
      </View>
      {checkedImg === 0 ? (
        <TouchableOpacity style={styles.button1} onPress={disableBtn}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={saveEmailPass}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInputBox: {
    width: '90%',
    height: 50,
    marginLeft: 15,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 12,
    marginTop: 20,
    padding: 10,
    color: 'black',

    // alignSelf: 'center',
    // backgroundColor: 'red',
    // alignSelf: 'center',
  },
  button: {
    backgroundColor: '#003B73',
    height: 50,
    width: '90%',
    borderRadius: 12,
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  button1: {
    backgroundColor: 'gray',
    height: 50,
    width: '90%',
    borderRadius: 12,
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  mainText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: '15%',
    marginBottom: '10%',
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: '20%',
    width: '90%',
    // backgroundColor: 'green',
  },
  img: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
  },
  tcText: {
    fontSize: 14,

    lineHeight: 24,
    width: '85%',
    // backgroundColor: 'green',
  },
});
