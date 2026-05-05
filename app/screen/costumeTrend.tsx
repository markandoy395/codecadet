import { KeyboardAvoidingView, StyleSheet, View, Platform, ScrollView, Image, Dimensions, Text, TouchableOpacity, Pressable, Linking } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import styles from '../../components/styles/costumeTrent'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
type DrawerNav = DrawerNavigationProp<any>
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { openURL } from 'expo-linking'
const { width } = Dimensions.get('window')
const router = useRouter()
const costumeTrendScreen = () => {
  const [search, setSearch] = useState('')
  const [hamburger, setHamburger] = useState(false)
  const [heart, setHeart] = useState(false)
  const navigation = useNavigation<DrawerNav>()

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'column' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <View
          style={{
            padding: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 40,
            gap: 10,
          }}
        >
          <Ionicons name={'arrow-back'} size={20}></Ionicons>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <SafeAreaView style={styles.SafeAreaStyle}>
          {/* My Path */}
          <View style={styles.myPathContainer}>
            <Text style={styles.myPathTitle}>New This Week</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.myPathRow}>
              <View style={styles.myPathRow}>
                <View style={styles.myPathCard}>
                  <Image source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')} style={styles.myPathImage} />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>Color Palette</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>

                <View style={styles.myPathCard}>
                  <Image source={require('../../assets/images/ux-initial-hexagon-logo-design-vector.jpg')} style={styles.myPathImage} />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>Color Palette</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>

                <View style={styles.myPathCard}>
                  <Image source={require('../../assets/images/ux-initial-hexagon-logo-design-vector.jpg')} style={styles.myPathImage} />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>Color Palette</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>

                <View style={styles.myPathCard}>
                  <Image source={require('../../assets/images/ux-initial-hexagon-logo-design-vector.jpg')} style={styles.myPathImage} />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>Color Palette</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default costumeTrendScreen
