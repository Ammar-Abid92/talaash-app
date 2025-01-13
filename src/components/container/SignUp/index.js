/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../common/Button';
import { LanguageContext } from '../../../context/LanguageContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../constants/utils';
import { Avatar } from '../../common/Avatar';
import { signUpService, uploadImage } from '../../../services/firebase';
import CustomToast from '../../common/Toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slice/userSlice';
import { saveUserToAsyncStorage } from '../../../services/helper';

const { width } = Dimensions.get('window');

const SignUpForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [I18n] = useContext(LanguageContext);
  const [theme] = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    country: '',
    city: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [uri, setUri] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastType, setToastType] = useState('');

  const validateField = (key, value) => {
    let error = '';
    switch (key) {
      case 'email':
        if (!EMAIL_REGEX.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!PHONE_REGEX.test(value)) error = 'Invalid phone number';
        break;
      case 'password':
        if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (value !== form.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (key, value) => {
    const fieldError = validateField(key, value);

    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: fieldError });
  };

  const isFormValid = () => {
    return (
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.name &&
      form.country &&
      form.city &&
      form.address &&
      form.phone &&
      Object.values(errors).every(error => !error)
    );
  };

  const handleSignUp = () => {
    setLoading(true);
    if (!isFormValid()) {
      setIsVisible(true);
      setToastTitle('Fix the highlighted errors');
      setToastType('fail');
      return;
    }

    signUpService(
      form.email,
      form.password,
      form.name,
      form.address,
      form.city,
      form.country,
      uri,
      form.phone
    )
      .then(res => {
        // saveUserToAsyncStorage(res);
        // dispatch(setUser(res));
        setIsVisible(true);
        setToastTitle('Sign up successful');
        setToastType('success');
        setLoading(false);
        setTimeout(() => {
          navigation.navigate('found');
        }
        , 1000);

      })
      .catch(error => {
        setIsVisible(true);
        setToastTitle(error.message);
        setToastType('fail');
        setLoading(false);
        console.log('Error signing up:', error);
      });
  };

  const onAvatarChange = async image => {
    try {
      const { path } = image;
      const name = path.split('/').pop();
      const URL = await uploadImage(name, path);
      setUri(URL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>
        Register yourself in Talaash App and become a part of people-finding chain
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
          value={form.name}
          onChangeText={text => handleChange('name', text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />

        <TextInput
          label={errors.phone || 'Phone number'}
          value={form.phone}
          onChangeText={text => handleChange('phone', text)}
          mode="outlined"
          keyboardType="number-pad"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          placeholder="03xxxxxxxxx or +923xxxxxxxxx"
          maxLength={13}
          error={!!errors.phone}
        />

        <TextInput
          label={errors.email || 'Email address'}
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={!!errors.email}
        />

        <TextInput
          label="Country"
          value={form.country}
          onChangeText={text => handleChange('country', text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />

        <TextInput
          label="City"
          value={form.city}
          onChangeText={text => handleChange('city', text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />

        <TextInput
          label="Address"
          value={form.address}
          onChangeText={text => handleChange('address', text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
        />

        <TextInput
          label={errors.password || 'Password'}
          value={form.password}
          onChangeText={text => handleChange('password', text)}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={!!errors.password}
        />

        <TextInput
          label={errors.confirmPassword || 'Confirm Password'}
          value={form.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={!!errors.confirmPassword}
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
          disabled={!isFormValid()}
          loader={loading}
        />
      </View>

      {isVisible && (
        <CustomToast
          isVisible={isVisible}
          onDismiss={() => setIsVisible(false)}
          title={toastTitle}
          type={toastType}
          setIsVisible={setIsVisible}
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
    textAlign: 'center',
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonStyle: {
    width: '80%',
  },
});

export default SignUpForm;
