import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'expo-router'
import { Image, Dimensions, View, Text, BackHandler, Platform } from 'react-native'
import { useFocusEffect, useNavigationState } from '@react-navigation/native'
import AnimatedPressable from '../../components/AnimationButton/AnimatedPressable'
import { useAppFonts } from '../../src/constants/fonts'
import { auth, db } from 'FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import MaleIcon from '../../assets/svg/male.svg'
import FemaleIcon from '../../assets/svg/female.svg'
import OtherIcon from '../../assets/svg/other.svg'

export default function Layout() {
  const router = useRouter()
  const [ColorHeart, setColorHeart] = useState(false)
  const { width } = Dimensions.get('window')
  const fontsLoaded = useAppFonts()
  const [userData, setUserData] = useState<any>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Get navigation state using the proper hook
  const navigationState = useNavigationState(state => state)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setUserData(docSnap.data())
        }
        setIsLoggedIn(true)
      } else {
        setUserData(null)
        setIsLoggedIn(false)
      }
    })

    return () => unsubscribe()
  }, [])

  // Prevent going back to login screen when logged in
  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) return

      const onBackPress = () => {
        // If we're in the drawer navigator and logged in,
        // prevent going back to login but allow navigation within drawer
        if (navigationState && isLoggedIn) {
          // Check if we're at the root of drawer (no more back stack)
          if (navigationState.index === 0) {
            // Prevent exiting the app/going to login, stay on current screen
            return true
          }
        }

        // Allow normal back navigation within drawer screens
        return false
      }

      if (Platform.OS === 'android') {
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
        return () => subscription.remove()
      }
    }, [isLoggedIn, navigationState]),
  )

  if (!fontsLoaded) {
    return null
  }

  function CustomDrawerContent(props: any) {
    const handleLogout = async () => {
      try {
        // Clear all local state data first
        setUserData(null)
        setIsLoggedIn(false)
        setColorHeart(false)

        // Sign out from Firebase
        await signOut(auth)

        // Navigate to login screen
        router.replace('/auth/LoginScreen')
      } catch (error) {
        console.error('Logout error:', error)
        // Even if signOut fails, clear local data for security
        setUserData(null)
        setIsLoggedIn(false)
        setColorHeart(false)
        router.replace('/auth/LoginScreen')
      }
    }

    return (
      <DrawerContentScrollView {...props}>
        <AnimatedPressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#f8f9fa',
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
            marginBottom: 10,
          }}
        >
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              overflow: 'hidden',
            }}
          >
            {userData?.gender === 'Male' && <MaleIcon width={70} height={70} />}
            {userData?.gender === 'Female' && <FemaleIcon width={70} height={70} />}
            {userData?.gender === 'Other' && <OtherIcon width={70} height={70} />}
          </View>

          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#0D133D' }}>{userData?.username || 'Guest'}</Text>
            <Text style={{ fontSize: 14, color: 'gray', marginTop: 4 }} numberOfLines={1} ellipsizeMode="tail">
              {userData?.email || ''}
            </Text>
          </View>
        </AnimatedPressable>

        <DrawerItemList {...props} />

        <DrawerItem label="Logout" onPress={handleLogout} icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />} />
      </DrawerContentScrollView>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          swipeEnabled: true, // Allow swipe gestures within drawer
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#ffffff',
          },
          drawerActiveTintColor: '#ffffff',
          drawerInactiveTintColor: 'black',
          drawerActiveBackgroundColor: '#0D133D',
          drawerInactiveBackgroundColor: '#ffffff',
          drawerItemStyle: {
            borderRadius: 18,
            marginVertical: 2,
            paddingHorizontal: 10,
          },
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
        }}
      >
        {/* Your existing Drawer.Screen components */}
        <Drawer.Screen
          name="Profile"
          options={{
            title: 'Profile',
            drawerIcon: ({ color, size }) => <FontAwesome5 name="user" size={size} color={color} />,
          }}
        />

        <Drawer.Screen
          name="Home"
          options={{
            title: '',
            drawerLabel: 'Home',
            headerTitle: () => (
              <Image
                style={{
                  width: width * 0.3,
                  height: width * 0.3,
                  resizeMode: 'contain',
                  marginBottom: 20,
                  marginTop: 40,
                }}
                source={require('../../assets/images/codeCadetLogo.png')}
              />
            ),
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />

        <Drawer.Screen
          name="history"
          options={{
            title: 'History',
            drawerIcon: ({ color, size }) => <FontAwesome5 name="clock" size={size} color={color} />,
          }}
        />

        <Drawer.Screen
          name="Favorite"
          options={{
            title: 'Favorites',
            drawerIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={'red'} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
