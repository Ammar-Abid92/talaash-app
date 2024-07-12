/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Dimensions} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import CustomButton from '../../common/Button';
import {LanguageContext} from '../../../context/LanguageContext';
import {ThemeContext} from '../../../context/ThemeContext';
import {EMAIL_REGEX, PHONE_REGEX} from '../../../constants/utils';
import {useEffect} from 'react';
import {Avatar} from '../../common/Avatar';
import {signUp, signUpService, uploadImage} from '../../../services/firebase';
import CustomToast from '../../common/Toast';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/slice/userSlice';
import {saveUserToAsyncStorage} from '../../../services/helper';

const {height, width, fontScale} = Dimensions.get('window');

const SignUpForm = ({navigation}) => {
  const dispatch = useDispatch();
  const [I18n, changeLanguage] = useContext(LanguageContext);
  const [theme, setTheme] = useContext(ThemeContext);

  const [uri, setUri] = useState(undefined);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastType, setToastType] = useState('');

  useEffect(() => {
    if (password != confirmPassword) {
      setErrors({
        ...errors,
        password: 'Password is not matched',
      });
    } else {
      setErrors({
        ...errors,
        password: '',
      });
    }
  }, [password, confirmPassword]);

  const handleSignUp = () => {
    console.log('Sign up pressed');

    if (!EMAIL_REGEX.test(email)) {
      setErrors({
        ...errors,
        email: 'Wrong email format',
      });
    }

    if (!PHONE_REGEX.test(phone)) {
      setErrors({
        ...errors,
        phone: 'Phone number is wrong',
      });
    }

    if (!errors.email && !errors.password && !errors.phone) {
      signUpService(email, password, name, address, city, country, uri, phone)
        .then(res => {
          console.log(res);
          saveUserToAsyncStorage(res);
          dispatch(setUser(res));
          setIsVisible(true);
          setToastTitle('Sign up successful');
          setToastType('success');
          navigation.navigate('found');
        })
        .catch(e => {
          setIsVisible(true);
          console.log(e);
          setToastTitle(e);
          setToastType('fail');
        });
    } else {
      setIsVisible(true);
      setToastTitle('Fill the form correctly');
      setToastType('fail');
    }
  };

  const onAvatarChange = async image => {
    const {path} = image;
    let name = path.split('/')[path.split('/').length - 1];
    let URL = await uploadImage(name, path);
    console.log('URL HERE------>', URL);
    setUri(URL);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>
        Register yourself in Talaash App and become a part of people finding
        chain
      </Text>

      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Avatar
            onChange={onAvatarChange}
            source={require('../../../assets/images/absent-user.png')}
            avatarWidth={100}
            avatarHeight={100}
            defaultURI={uri}
            setUri={setUri}
          />
        </View>

        <TextInput
          label="Full Name"
          value={name}
          onChangeText={text => setName(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />

        <TextInput
          label={errors?.phone ? errors.phone : 'Phone number'}
          value={phone}
          onChangeText={text => {
            setErrors({
              ...errors,
              phone: '',
            });
            setPhone(text);
            console.log('Phone Number --->', phone);
          }}
          mode="outlined"
          keyboardType="number-pad"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          placeholder="03xxxxxxxxx or +923xxxxxxxxx"
          maxLength={13}
          error={errors.phone}
        />
        <TextInput
          label={errors?.email ? errors.email : 'Email address'}
          value={email}
          onChangeText={text => {
            setErrors({
              ...errors,
              email: '',
            });
            setEmail(text);
          }}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={errors.email}
        />
        <TextInput
          label="Country"
          value={country}
          onChangeText={text => setCountry(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />
        <TextInput
          label="City"
          value={city}
          onChangeText={text => setCity(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={text => setAddress(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />
        <TextInput
          label={errors?.password ? errors.password : 'Your password'}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={errors.password}
        />
        <TextInput
          label={errors?.password ? errors.password : 'Confirm your password'}
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={errors.password}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          type="contained"
          title="Register"
          btnColor={theme.backgroundColor}
          txtColor="#ffffff"
          style={styles.buttonStyle}
          onPress={handleSignUp}
          disabled={
            !errors.email && !errors.password && !errors.phone ? false : true
          }
        />
      </View>

      {isVisible && (
        <CustomToast
          isVisible={isVisible}
          onDismiss={() => setIsVisible(false)}
          title={toastTitle}
          type={toastType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    width: 300,
  },
  container: {
    flex: 0.75,
    marginTop: 20,
  },
  input: {
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    flex: 0.2,
    width: width * 0.91,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '80%',
  },
});

export default SignUpForm;
