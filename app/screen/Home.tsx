import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import styles from '../../components/homeStyle';
import { openURL } from 'expo-linking';
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [hamburger, setHamburger] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Image
            style={{
              width: width * 0.3,
              height: width * 0.3,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={require('../../assets/images/codeCadetLogo.png')}
          />

          {/* Top bar */}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => setHamburger(!hamburger)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FontAwesome5
                  name={hamburger ? 'times' : 'bars'}
                  size={24} // inner size
                  color="#0D133D"
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#0D133D',
                borderRadius: 15,
                paddingHorizontal: 10,
                height: 50,
                flex: 1,
                marginLeft: 10,
              }}
            >
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
          {/* My Path */}
          <View style={styles.myPathContainer}>
            <Text style={styles.myPathTitle}>My Path</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.myPathRow}
            >
              <View style={styles.myPathRow}>
                {/* Card 1 */}
                <Pressable
                  onPress={() =>
                    Linking.openURL(
                      'https://www.youtube.com/results?search_query=react+native+link+website'
                    )
                  }
                  style={{ borderRadius: 20 }}
                >
                  <View style={styles.myPathCard}>
                    <Image
                      source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')}
                      style={styles.myPathImage}
                    />
                    <View style={styles.cardFooter}>
                      <Text style={styles.cardText}>UI Designing</Text>
                      <Ionicons name="heart" size={22} color="red" />
                    </View>
                  </View>
                </Pressable>
                {/* Card 2 */}
                <View style={styles.myPathCard}>
                  <Image
                    source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')}
                    style={styles.myPathImage}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>Color Palette</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Trending Resources */}
          <View style={styles.myPathContainer}>
            <Text style={styles.myPathTitle}>Trending Resources</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.myPathRow}
            >
              <View style={styles.myPathRow}>
                <View style={styles.myPathCard}>
                  <Image
                    source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')}
                    style={styles.myPathImage}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>UI Designing</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>

                <View style={styles.myPathCard}>
                  <Image
                    source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')}
                    style={styles.myPathImage}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>Color Palette</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* New this Week */}
          <View style={styles.myPathContainer}>
            <Text style={styles.myPathTitle}>New this Week</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.myPathRow}
            >
              <View style={styles.myPathRow}>
                <View style={styles.myPathCard}>
                  <Image
                    source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')}
                    style={styles.myPathImage}
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText}>UI Designing</Text>
                    <Ionicons name="heart" size={22} color="red" />
                  </View>
                </View>

                <View style={styles.myPathCard}>
                  <Image
                    source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')}
                    style={styles.myPathImage}
                  />
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
  );
};

export default HomeScreen;
