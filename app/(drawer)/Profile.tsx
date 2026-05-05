import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../../components/styles/ProfileStyle'
import AnimatedPressable from '../../components/AnimationButton/AnimatedPressable'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../../FirebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CodeCadetLoading from '../../components/AnimationButton/loading'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'

const getMyPathKey = (uid: string) => `myPath_${uid}`
const getProfileImageKey = (uid: string) => `profileImage_${uid}`

const ProfileScreen = () => {
  const [profile, setProfile] = useState<any>(null)
  const [pathCount, setPathCount] = useState<number>(0)
  const [favoritesCount, setFavoritesCount] = useState<number>(0)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Load profile image from AsyncStorage
  const loadProfileImage = async (uid: string) => {
    try {
      const imageKey = getProfileImageKey(uid)
      const storedImage = await AsyncStorage.getItem(imageKey)
      if (storedImage) {
        setProfileImage(storedImage)
      }
    } catch (error) {
      console.error('Error loading profile image:', error)
    }
  }

  // Save profile image to AsyncStorage
  const saveProfileImage = async (uid: string, imageUri: string) => {
    try {
      const imageKey = getProfileImageKey(uid)
      await AsyncStorage.setItem(imageKey, imageUri)
    } catch (error) {
      console.error('Error saving profile image:', error)
    }
  }

  // Request permissions and pick image
  const pickImage = async () => {
    try {
      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera roll is required!')
        return
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        setProfileImage(imageUri)

        // Save to AsyncStorage with user ID
        if (profile?.uid) {
          await saveProfileImage(profile.uid, imageUri)
        }
      }
    } catch (error) {
      console.error('Error picking image:', error)
      Alert.alert('Error', 'Failed to pick image. Please try again.')
    }
  }

  // Show options to pick image or take photo
  const showImageOptions = () => {
    Alert.alert('Select Image', 'Choose how you want to select your profile picture', [
      { text: 'Gallery', onPress: pickImage },
      { text: 'Camera', onPress: takePhoto },
      { text: 'Cancel', style: 'cancel' },
    ])
  }

  // Take photo with camera
  const takePhoto = async () => {
    try {
      // Request camera permission
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera is required!')
        return
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        setProfileImage(imageUri)

        // Save to AsyncStorage with user ID
        if (profile?.uid) {
          await saveProfileImage(profile.uid, imageUri)
        }
      }
    } catch (error) {
      console.error('Error taking photo:', error)
      Alert.alert('Error', 'Failed to take photo. Please try again.')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProfile({ uid: user.uid, ...docSnap.data() })
        }

        // Load profile image
        await loadProfileImage(user.uid)

        // ✅ Load MyPath count (from AsyncStorage)
        try {
          const key = getMyPathKey(user.uid)
          const stored = await AsyncStorage.getItem(key)
          if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) {
              setPathCount(parsed.length)
            }
          } else {
            setPathCount(0)
          }
        } catch (err) {
          console.error('Error loading myPath count:', err)
          setPathCount(0)
        }

        // ✅ Load Favorites count (from Firestore)
        try {
          const favRef = collection(db, 'users', user.uid, 'favorites')
          const snapshot = await getDocs(favRef)
          setFavoritesCount(snapshot.size) // count docs
        } catch (err) {
          console.error('Error loading favorites count:', err)
          setFavoritesCount(0)
        }
      } else {
        setProfile(null)
        setPathCount(0)
        setFavoritesCount(0)
        setProfileImage(null)
      }
    })

    return unsubscribe
  }, [])

  if (!profile) {
    return <CodeCadetLoading />
  }

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.ProfileInfo}>
        <View style={styles.ImageContainer}>
          <TouchableOpacity onPress={showImageOptions} style={styles.imagePickerContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.Image} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Ionicons name="add" size={40} color="#666" />
                <Text style={styles.placeholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text numberOfLines={1} ellipsizeMode="tail" adjustsFontSizeToFit style={styles.name}>
            {profile.username}
          </Text>
          <View>
            <Text style={{ fontSize: 12 }}>Email</Text>
            <Text numberOfLines={2} style={{ fontSize: 15, fontFamily: 'Montserrat_700Bold' }}>
              {profile.email}
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 12 }}>role</Text>
            <Text style={{ fontSize: 15, fontFamily: 'Montserrat_700Bold' }}>{profile.role}</Text>
          </View>
        </View>
      </View>

      <View style={styles.myActivity}>
        <Text style={styles.title}>My Activity</Text>

        {/* ✅ Favorites */}
        <AnimatedPressable>
          <View style={styles.totalFavorites}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit
              style={{
                fontSize: 50,
                width: '40%',
                fontFamily: 'Montserrat_400Regular',
                textAlign: 'center',
              }}
            >
              {favoritesCount}
            </Text>
            <Text
              style={{
                fontSize: 20,
                width: '50%',
                borderLeftWidth: 1,
                borderColor: 'BLACK',
                fontFamily: 'Montserrat_400Regular',
              }}
            >
              Total Favorites
            </Text>
          </View>
        </AnimatedPressable>

        {/* ✅ History (MyPath) */}
        <AnimatedPressable>
          <View style={styles.totalHistory}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit
              style={{
                color: '#FFF',
                fontSize: 50,
                width: '40%',
                fontFamily: 'Montserrat_400Regular',
                textAlign: 'center',
              }}
            >
              {pathCount}
            </Text>
            <Text
              style={{
                color: '#FFF',
                fontSize: 20,
                width: '50%',
                borderLeftWidth: 1,
                borderColor: '#FFF',
                fontFamily: 'Montserrat_400Regular',
              }}
            >
              Total History
            </Text>
          </View>
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen
