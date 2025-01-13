/* eslint-disable prettier/prettier */
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { EMAIL_REGEX } from '../../../constants/utils';
import { ThemeContext } from '../../../context/ThemeContext';
import { setUser } from '../../../redux/slice/userSlice';
import { signInService } from '../../../services/firebase';
import { saveUserToAsyncStorage } from '../../../services/helper';
import CustomButton from '../../common/Button';
import CustomToast from '../../common/Toast';

const SignInForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [theme] = useContext(ThemeContext);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastType, setToastType] = useState('');
  const [loading, setLoading] = useState(false);

  // Real-time Validation
  useEffect(() => {
    const newErrors = {};
    if (form.email && !EMAIL_REGEX.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (form.password && form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
  }, [form.email, form.password]);

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: '' }); // Clear the error for the field being edited
  };

  const handleSignIn = () => {
    setLoading(true);

    if (Object.keys(errors).length > 0 || !form.email || !form.password) {
      setIsVisible(true);
      setToastTitle('Fix the highlighted errors');
      setToastType('fail');
      setLoading(false);
      return;
    }

    signInService(form.email, form.password)
      .then(userData => {
        saveUserToAsyncStorage(userData);
        dispatch(setUser(userData));
        setIsVisible(true);
        setToastTitle('Sign in successful');
        setToastType('success');
        setLoading(false);
        navigation.navigate('account'); // Navigate after successful login
      })
      .catch(error => {
        setIsVisible(true);
        setToastTitle(error.message || 'Sign in failed');
        setToastType('fail');
        setLoading(false);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={{ ...styles.header, color: theme.dark }}>
        You need to login to report the missing person
      </Text>

      <ScrollView style={styles.container}>
        <TextInput
          label={errors.email || 'Email address'}
          value={form.email}
          onChangeText={text => handleInputChange('email', text)}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={!!errors.email}
        />

        <TextInput
          label={errors.password || 'Your password'}
          value={form.password}
          onChangeText={text => handleInputChange('password', text)}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          activeOutlineColor={theme.backgroundColor}
          error={!!errors.password}
        />

        <Text
          style={{ ...styles.signUpText, color: theme.dark }}
          onPress={() => navigation.navigate('authRoutes')}>
          New user? Sign up please
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton
          type="contained"
          title="Log in"
          btnColor={theme.backgroundColor}
          txtColor="#ffffff"
          style={styles.buttonStyle}
          onPress={handleSignIn}
          disabled={Object.keys(errors).length > 0 || !form.email || !form.password || loading}
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonStyle: {
    width: '80%',
  },
  signUpText: {
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default SignInForm;
