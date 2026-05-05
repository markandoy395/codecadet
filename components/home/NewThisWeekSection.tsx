import React from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import styles from '../styles/homeStyle'

const NewThisWeekSection = () => {
  return (
    <View style={styles.myPathContainer}>
      <View style={styles.SeeMore}>
        <Text style={styles.myPathTitle}>New this Week</Text>
        <TouchableOpacity onPress={() => router.push('../screen/costumeTrend')}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Montserrat_400Regular',
              textDecorationLine: 'underline',
              marginLeft: 4,
            }}
          >
            See More
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.myPathRow}>
        <View style={styles.myPathRow}>
          <View style={styles.myPathCard}>
            <Image source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')} style={styles.myPathImage} />
            <View style={styles.cardFooter}>
              <Text style={styles.cardText}>UI Designing</Text>
              <Ionicons name="heart" size={22} color="red" />
            </View>
          </View>
          <View style={styles.myPathCard}>
            <Image source={require('../../assets/images/482004300_1401503631258760_5347778807532897741_n.jpg')} style={styles.myPathImage} />
            <View style={styles.cardFooter}>
              <Text style={styles.cardText}>Color Palette</Text>
              <View style={styles.heartContainer}>
                <Ionicons name="heart" size={22} color="red" />
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Poppins-SemiBold',
                    color: 'red',
                  }}
                >
                  200
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default NewThisWeekSection
