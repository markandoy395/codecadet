import { KeyboardAvoidingView, View, Platform, ScrollView, Image, TextInput, Text, Pressable, Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import styles from '../../components/styles/FavoriteStyle'
import { auth, db } from '../../FirebaseConfig' // adjust path as needed
import { collection, getDocs } from 'firebase/firestore'
import SimpleLoading from '../../components/AnimationButton/loading' // Import your spinner component

type DrawerNav = DrawerNavigationProp<any>

const FavoriteScreen = () => {
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<any[]>([])
  const [imageStates, setImageStates] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation<DrawerNav>()

  // Helper function to get fallback URL
  const getFallbackUrl = (websiteUrl: string) => {
    const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    return `https://logo.clearbit.com/${domain}`
  }

  // Handle image error with fallback sequence
  const handleImageError = (favId: string, fav: any) => {
    const currentUri = imageStates[favId] || fav.logo

    if (currentUri === fav.logo && fav.thumbnail) {
      // Try thumbnail next
      setImageStates(prev => ({ ...prev, [favId]: fav.thumbnail }))
    } else {
      // Use final fallback
      setImageStates(prev => ({ ...prev, [favId]: getFallbackUrl(fav.link || '') }))
    }
  }

  const fetchFavorites = async () => {
    const user = auth.currentUser // Web SDK syntax
    if (!user?.uid) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      // Web SDK syntax for collection reference
      const favRef = collection(db, 'users', user.uid, 'favorites')
      const snapshot = await getDocs(favRef)

      const favs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Extract the role from the document for display (if it exists in the data)
        displayRole: doc.data().role || null,
      }))

      setFavorites(favs)
      console.log(`Fetched ${favs.length} favorites`)
    } catch (err) {
      console.error('Error fetching favorites:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFavorites()

    // Refresh favorites when screen comes into focus
    const unsubscribe = navigation.addListener('focus', fetchFavorites)
    return unsubscribe
  }, [navigation])

  const filteredFavorites = favorites.filter(fav => fav.name?.toLowerCase().includes(search.toLowerCase()))

  if (isLoading) {
    return <SimpleLoading isVisible={true} loadingText="Loading favorites..." backgroundColor="#ffffff" />
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ffffff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      {/* Search Bar */}
      <View style={styles.SearchBarContainer}>
        <View style={styles.SearchBarChild}>
          <FontAwesome5 name="search" size={20} color="#0D133D" />
          <TextInput style={{ flex: 1, marginLeft: 8, fontSize: 16 }} placeholder="Search favorites..." value={search} onChangeText={setSearch} />
        </View>
      </View>

      {/* Favorites Grid */}
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.SafeAreaStyle}>
          <Text style={styles.myPathTitle}>Favorites</Text>
          <View style={styles.myPathRow}>
            {filteredFavorites.length === 0 ? (
              <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: '#666',
                    marginBottom: 10,
                  }}
                >
                  {search ? 'No matches found' : 'No favorites yet'}
                </Text>
                <Text style={{ fontSize: 24 }}>⭐</Text>
                {!search && (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: '#999',
                      marginTop: 10,
                      paddingHorizontal: 20,
                    }}
                  >
                    Tap the heart icon on any resource to add it to your favorites
                  </Text>
                )}
              </View>
            ) : (
              filteredFavorites.map(fav => (
                <Pressable key={fav.id} onPress={() => Linking.openURL(fav.link)} style={({ pressed }) => [styles.myPathCard, { opacity: pressed ? 0.85 : 1 }]}>
                  <Image
                    source={{
                      uri: imageStates[fav.id] || fav.logo || fav.thumbnail || `https://www.google.com/s2/favicons?sz=64&domain_url=${fav.link}`,
                    }}
                    style={styles.myPathImage}
                    onError={() => handleImageError(fav.id, fav)}
                    resizeMode="contain"
                  />
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardText} numberOfLines={1}>
                      {fav.name}
                    </Text>
                    {/* Show role if it exists */}
                    {fav.displayRole && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#666',
                          fontStyle: 'italic',
                          marginTop: 2,
                        }}
                      >
                        For {fav.displayRole}
                      </Text>
                    )}
                  </View>
                </Pressable>
              ))
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default FavoriteScreen
