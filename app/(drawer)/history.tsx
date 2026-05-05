import { KeyboardAvoidingView, View, Platform, ScrollView, Image, TextInput, Dimensions, Text, TouchableOpacity, Pressable, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React, { useState } from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import styles from '../../components/styles/HistoryStyle'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
type DrawerNav = DrawerNavigationProp<any>
// Inside HomeScreen

import { openURL } from 'expo-linking'
const { width } = Dimensions.get('window')

const HistoryScreen = () => {
  const [search, setSearch] = useState('')
  const [hamburger, setHamburger] = useState(false)
  const [heart, setHeart] = useState(false)
  const navigation = useNavigation<DrawerNav>()

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ffffff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      {/* Search bar */}
      <View style={styles.SearchBarContainer}>
        <View style={styles.SearchBarChild}>
          <FontAwesome5 name="search" size={20} color="#0D133D" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              backgroundColor: 'transparent',
              fontSize: 16,
            }}
            placeholder="Search"
            onChangeText={setSearch}
            value={search}
          />
        </View>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.SafeAreaStyle}>
          {/* My Path */}
          <View style={styles.myPathContainer}>
            <Text style={styles.myPathTitle}>History</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.myPathRow}>
              <View style={styles.myPathRow}>
                {/* Card 1 */}
                <Pressable onPress={() => Linking.openURL('https://www.youtube.com/results?search_query=react+native+link+website')} style={{ borderRadius: 20 }}>
                  <View style={styles.myPathCard}>
                    <Image
                      source={{
                        uri: `https://www.google.com/s2/favicons?sz=64&domain_url=https://www.youtube.com`,
                      }}
                      style={styles.myPathImage}
                    />

                    <View style={styles.cardFooter}>
                      <Text style={styles.cardText}>UI Designing</Text>
                      <TouchableOpacity onPress={() => setHeart(!heart)}>
                        <FontAwesome5 name="heart" size={22} color={heart ? 'red' : 'white'} solid={heart} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Pressable>
                <Pressable onPress={() => Linking.openURL('https://www.youtube.com/results?search_query=react+native+link+website')} style={{ borderRadius: 20 }}>
                  <View style={styles.myPathCard}>
                    <Image source={require('../../assets/images/ux-initial-hexagon-logo-design-vector.jpg')} style={styles.myPathImage} />
                    <View style={styles.cardFooter}>
                      <Text style={styles.cardText}>UI Designing</Text>
                      <Ionicons name="heart" size={22} color="red" />
                    </View>
                  </View>
                </Pressable>
                {/* Card 2 */}
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

export default HistoryScreen
