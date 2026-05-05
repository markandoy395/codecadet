import React from 'react'
import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles/homeStyle'
import * as Linking from 'expo-linking'

const generateUniqueKey = (item: any, index: number) => {
  const baseId = item.id || item.uniqueId || index
  const role = item.role || 'default'
  return `mypath-${baseId}-${role}-${index}`
}

const isSvgUrl = (url: string) => {
  return url && (url.toLowerCase().includes('.svg') || url.toLowerCase().includes('svg'))
}

const getDomainFromUrl = (url: string) => {
  if (!url) return ''
  try {
    return url
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '')
      .split('/')[0]
  } catch (error) {
    return ''
  }
}

const getFallbackUrls = (item: any) => {
  const websiteUrl = item.link || item.url || item.website || ''
  const domain = getDomainFromUrl(websiteUrl)
  const fallbacks = []

  if (domain) {
    fallbacks.push(`https://logo.clearbit.com/${domain}`)
    fallbacks.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`)
    fallbacks.push(`https://favicons.githubusercontent.com/${domain}`)
    fallbacks.push(`https://api.faviconkit.com/${domain}/64`)
  }

  fallbacks.push('https://via.placeholder.com/150x100/e1e5e9/64748b?text=No+Image')
  return fallbacks
}

const getImageUri = (item: any, errorCount: number = 0) => {
  const fallbackUrls = getFallbackUrls(item)

  if (errorCount > 0) {
    const fallbackIndex = Math.min(errorCount - 1, fallbackUrls.length - 1)
    return fallbackUrls[fallbackIndex]
  }

  if (item.logo && typeof item.logo === 'string' && item.logo.trim() !== '' && !isSvgUrl(item.logo)) {
    return item.logo
  }

  if (item.image && typeof item.image === 'string' && item.image.trim() !== '' && !isSvgUrl(item.image)) {
    return item.image
  }

  if (item.thumbnail && typeof item.thumbnail === 'string' && item.thumbnail.trim() !== '' && !isSvgUrl(item.thumbnail)) {
    return item.thumbnail
  }

  return fallbackUrls[0] || fallbackUrls[fallbackUrls.length - 1]
}

const MyPathSection = ({ myPathItems }: { myPathItems: any[] }) => {
  const [imageErrorCounts, setImageErrorCounts] = React.useState<{ [key: string]: number }>({})

  const handleImageError = (itemKey: string, item: any) => {
    setImageErrorCounts(prev => {
      const currentCount = prev[itemKey] || 0
      const newCount = currentCount + 1

      if (newCount > 5) {
        return prev
      }

      return { ...prev, [itemKey]: newCount }
    })
  }

  const handleOpenResource = async (item: any) => {
    try {
      const url = item.link || item.url || item.website
      if (url) {
        const supported = await Linking.canOpenURL(url)
        if (supported) {
          await Linking.openURL(url)
        }
      }
    } catch (error) {
      console.error('Error opening resource:', error)
    }
  }

  const uniqueItems = React.useMemo(() => {
    const seen = new Set()
    return myPathItems.filter((item, index) => {
      const identifier = `${item.id || index}-${item.role || 'default'}-${item.name || ''}`
      if (seen.has(identifier)) {
        return false
      }
      seen.add(identifier)
      return true
    })
  }, [myPathItems])

  return (
    <View style={styles.myPathContainer}>
      <Text style={styles.myPathTitle}>Previously Viewed</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.myPathRow}>
        <View style={styles.myPathRow}>
          {uniqueItems.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat_400Regular',
                  textAlign: 'center',
                  color: '#666',
                }}
              >
                No resources yet. Tap on a Trending item to add here.
              </Text>
            </View>
          ) : (
            uniqueItems.map((item, index) => {
              const uniqueKey = generateUniqueKey(item, index)
              const errorCount = imageErrorCounts[uniqueKey] || 0
              const imageUri = getImageUri(item, errorCount)

              return (
                <Pressable key={uniqueKey} onPress={() => handleOpenResource(item)} style={{ borderRadius: 20 }}>
                  <View style={styles.myPathCard}>
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.myPathImage}
                      resizeMode="contain"
                      onError={() => handleImageError(uniqueKey, item)}
                      onLoad={() => console.log(`✅ Image loaded successfully for: ${item.name || 'Unknown'}`)}
                    />
                    <View style={styles.cardFooter}>
                      <View style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={styles.cardText}>
                          {item.name || item.title || 'Unnamed Resource'}
                        </Text>
                        {item.role && (
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 10,
                              color: '#999',
                              fontStyle: 'italic',
                              marginTop: 2,
                            }}
                          >
                            {item.role}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 20,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          zIndex: 10,
                          elevation: 5,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 3,
                        }}
                      >
                        <Ionicons name="heart" size={20} color="red" />
                      </View>
                    </View>
                  </View>
                </Pressable>
              )
            })
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default MyPathSection
