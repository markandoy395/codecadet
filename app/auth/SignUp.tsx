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
import styles from '../../components/SignUpStyle';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { push } from 'expo-router/build/global-state/routing';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();
  const data = [
    { label: 'Developer', value: 'Developer' },
    { label: 'UI/UX Designer', value: 'UI/UX Designer' },
    { label: 'Quality Assurance', value: 'Quality Assurance' },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.container}>
          <View style={[styles.circle, styles.blueCircle]}></View>
          <View style={[styles.circle, styles.yellowCircle]}></View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={require('../../assets/icon/arrow_back_ios_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png')}
            />
            <Text style={{ fontFamily: 'Montserrat_700Bold' }}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Sign Up</Text>

          {/* Username */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={setUsername}
              value={username}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={secureText}
              onChangeText={setPassword}
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={secureText}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>

          {/* Role */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user-circle" size={20} color="#0D133D" />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Role"
              value={role}
              onChange={(item) => setRole(item.value)}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signInButton}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Montserrat',
                fontSize: 15,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text>Already have an account ? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
