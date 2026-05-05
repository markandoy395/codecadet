import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import styles from '../styles/homeStyle'
import ResourceCard from '../../components/ResourceCard'
interface TrendingSectionProps {
  uiResources: any[]
  handleOpenResource: (item: any) => Promise<void>
  userRole: string
}
const TrendingSection = ({ uiResources, handleOpenResource, userRole }: TrendingSectionProps) => {
  const handleSeeMore = () => {
    router.push({
      pathname: '../screen/trenResource',
      params: {
        userRole: userRole,
        resources: JSON.stringify(uiResources),
      },
    })
  }

  return (
    <View style={styles.myPathContainer}>
      <View style={styles.SeeMore}>
        <Text style={styles.myPathTitle}>Trending Resources</Text>
        <TouchableOpacity onPress={handleSeeMore}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Montserrat_400Regular',
                marginLeft: 4,
                textDecorationLine: 'underline',
              }}
            >
              See More
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.myPathRow}>
        <View style={styles.myPathRow}>
          {uiResources.map((item, index) => (
            <ResourceCard
              key={`trending-home-${item.id}-${userRole}-${index}-${Math.random().toString(36).substr(2, 9)}`}
              item={item}
              handleOpenResource={handleOpenResource}
              userRole={userRole}
              index={index}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default TrendingSection
