import { Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React, { useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import styles from '../../components/styles/SignUpStyle'
import { useRouter } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../FirebaseConfig'
import CodeCadetLoading from '../../components/AnimationButton/loading' // Import your loading component

const SignUpScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [gender, setGender] = useState('')
  const [secureTextPassword, setSecureTextPassword] = useState(true)
  const [secureTextConfirm, setSecureTextConfirm] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const roleData = [
    { label: 'Developer', value: 'Developer' },
    { label: 'UI/UX Designer', value: 'UI/UX Designer' },
    { label: 'Quality Assurance', value: 'Quality Assurance' },
  ]

  const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ]

  // Validation functions
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isStrongPassword = (password: string): boolean => {
    return password.length >= 6
  }

  const validateForm = (): { isValid: boolean; error?: string } => {
    if (!username.trim()) {
      return { isValid: false, error: 'Username is required' }
    }

    if (username.trim().length < 3) {
      return {
        isValid: false,
        error: 'Username must be at least 3 characters',
      }
    }

    if (!email.trim()) {
      return { isValid: false, error: 'Email is required' }
    }

    if (!isValidEmail(email)) {
      return { isValid: false, error: 'Please enter a valid email address' }
    }

    if (!password) {
      return { isValid: false, error: 'Password is required' }
    }

    if (!isStrongPassword(password)) {
      return {
        isValid: false,
        error: 'Password must be at least 6 characters long',
      }
    }

    if (!confirmPassword) {
      return { isValid: false, error: 'Please confirm your password' }
    }

    if (password !== confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' }
    }

    if (!role) {
      return { isValid: false, error: 'Please select your role' }
    }

    if (!gender) {
      return { isValid: false, error: 'Please select your gender' }
    }

    return { isValid: true }
  }

  const showError = (message: string): void => {
    Alert.alert('Error', message, [{ text: 'OK' }])
  }

  const showSuccess = (message: string): void => {
    Alert.alert('Success', message, [{ text: 'OK' }])
  }

  const handleSignUp = async () => {
    const validation = validateForm()

    if (!validation.isValid) {
      return
    }

    setIsLoading(true)

    try {
      // 1️⃣ Create user in Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password)
      const user = userCredential.user

      // 2️⃣ Update displayName
      await updateProfile(user, { displayName: username.trim() })

      // 3️⃣ Save extra info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        role: role,
        gender: gender,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      })

      showSuccess('Account created successfully!')
      router.back() // go back to login
    } catch (error: unknown) {
      console.error('Sign up error:', error)

      // Handle specific Firebase errors
      let errorMessage = 'Sign up failed. Please try again.'

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as { code: string; message?: string }

        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please use a different email or try signing in.'
            break
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please choose a stronger password.'
            break
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address. Please check and try again.'
            break
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your connection and try again.'
            break
          default:
            errorMessage = firebaseError.message ?? errorMessage
        }
      }

      showError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Show CodeCadet loading animation during account creation
  if (isLoading) {
    return <CodeCadetLoading />
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>
          <View style={[styles.circle, styles.blueCircle]}></View>
          <View style={[styles.circle, styles.yellowCircle]}></View>

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} accessibilityLabel="Go back to login screen" accessibilityRole="button">
            <Image style={{ height: 20, width: 20 }} source={require('../../assets/icon/arrow_back_ios_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png')} />
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
              autoCapitalize="none"
              accessibilityLabel="Username input"
              accessibilityHint="Enter your desired username"
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
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email input"
              accessibilityHint="Enter your email address"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={secureTextPassword}
              onChangeText={setPassword}
              value={password}
              autoCapitalize="none"
              accessibilityLabel="Password input"
              accessibilityHint="Enter your password, minimum 6 characters"
            />
            <TouchableOpacity onPress={() => setSecureTextPassword(!secureTextPassword)} accessibilityLabel={secureTextPassword ? 'Show password' : 'Hide password'} accessibilityRole="button">
              <Ionicons name={secureTextPassword ? 'eye-off' : 'eye'} size={22} color="#0D133D" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#0D133D" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={secureTextConfirm}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              autoCapitalize="none"
              accessibilityLabel="Confirm password input"
              accessibilityHint="Re-enter your password to confirm"
            />
            <TouchableOpacity
              onPress={() => setSecureTextConfirm(!secureTextConfirm)}
              accessibilityLabel={secureTextConfirm ? 'Show confirm password' : 'Hide confirm password'}
              accessibilityRole="button"
            >
              <Ionicons name={secureTextConfirm ? 'eye-off' : 'eye'} size={22} color="#0D133D" />
            </TouchableOpacity>
          </View>

          {/* Role */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user-circle" size={20} color="#0D133D" />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={roleData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Role"
              value={role}
              onChange={item => setRole(item.value)}
              accessibilityLabel="Role selection dropdown"
            />
          </View>

          {/* Gender */}
          <View style={styles.inputContainer}>
            <FontAwesome name="venus-mars" size={20} color="#0D133D" />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={genderData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              value={gender}
              onChange={item => setGender(item.value)}
              accessibilityLabel="Gender selection dropdown"
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signInButton} onPress={handleSignUp} accessibilityLabel="Create account" accessibilityRole="button">
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
              marginTop: 10,
            }}
          >
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()} accessibilityLabel="Go to sign in screen" accessibilityRole="button">
              <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
