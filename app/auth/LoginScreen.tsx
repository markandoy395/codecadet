import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import styles from '../../components/logInStyle';
import { useRouter } from 'expo-router';
import validator from 'validator';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();

  const handleLogIn = () => {
    if (email === 'ADMIN' && password === 'ADMIN') {
      setEmail('');
      setPassword('');
      router.push('/screen/Home');
    } else {
      alert('Wrong Email and Password');
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/codeCadetLogo.png')}
          />

          <Text style={styles.title}>Sign In</Text>

          {/* Email */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              placeholder="Email or User Name"
              onChangeText={setEmail}
              autoCapitalize="characters"
              value={email}
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              secureTextEntry={secureText}
              onChangeText={setPassword}
              placeholder="Enter Password"
              value={password}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons
                name={secureText ? 'eye-off' : 'eye'}
                size={22}
                color="#0D133D"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.forgetPass}>Forget Password?</Text>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => handleLogIn()}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Montserrat',
                fontSize: 15,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <View style={styles.dontHaveAccount}>
            <Text>Don’t have account ? </Text>
            <TouchableOpacity onPress={() => router.push('./SignUp')}>
              <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
