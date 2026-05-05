import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth, db } from '../../FirebaseConfig'
import CodeCadetLoading from '../../components/AnimationButton/loading'
import styles from '../../components/styles/logInStyle'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secureText, setSecureText] = useState(true)
  const router = useRouter()
  const [loading, setLoading] = useState(false) // 🔥 loading state

  // sign in
  const signIn = async () => {
    try {
      setLoading(true)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log('User signed in:', user.email)

      // Fetch profile data from Firestore
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userData = docSnap.data()
        console.log('User profile:', userData)

        // Navigate to Home and pass data
        router.replace({
          pathname: '/Home',
          params: {
            uid: user.uid,
            email: user.email,
            username: userData.username,
            role: userData.role,
            gender: userData.gender,
          },
        })
      } else {
        console.log('No user profile found!')
        Alert.alert('Error', 'No user profile found in Firestore.')
      }

      setEmail('')
      setPassword('')
    } catch (error: any) {
      console.log(error)
      Alert.alert('Sign in failed', error.message)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Sign up
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('User signed up:', userCredential.user.email)
      Alert.alert('Success', 'Account created! Please sign in.')
    } catch (error: any) {
      console.log(error)
      Alert.alert('Sign up failed', error.message)
    }
  }

  // 🔥 Show loader while signing in
  if (loading) {
    return <CodeCadetLoading />
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 10 }} behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} keyboardVerticalOffset={100}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/images/codeCadetLogo.png')} />

          <Text style={styles.title}>Sign In</Text>

          {/* Email */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#0D133D" />
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" autoCapitalize="none" />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#0D133D" />
            <TextInput style={styles.input} secureTextEntry={secureText} onChangeText={setPassword} placeholder="Password" value={password} autoCapitalize="none" />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              <Ionicons name={secureText ? 'eye-off' : 'eye'} size={22} color="#0D133D" />
            </TouchableOpacity>
          </View>

          <Text style={styles.forgetPass}>Forget Password?</Text>

          {/* Firebase Sign In */}
          <TouchableOpacity style={styles.signInButton} onPress={signIn}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 15 }}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.dontHaveAccount}>
            <Text>Don’t have account? </Text>
            <TouchableOpacity onPress={() => router.push('./SignUp')}>
              <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
