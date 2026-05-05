import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, Image, Pressable, Linking, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './styles/homeStyle'
import getFallbackUrl from '../utils/getFallbackUrl'
import { getResourceRoleKey, getTotalFavoritesCount, toggleFavorite } from '../utils/favoritesHelpers'
import { auth, db } from '../FirebaseConfig'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import MyCustomModal from './AnimationButton/modal'

interface ResourceCardProps {
  item: any
  userRole: string
  onRefresh?: () => void
  handleOpenResource?: (item: any) => void
  index?: number
  showAddFavoriteMessage?: boolean
  customStyles?: any
  keyPrefix?: string
  showRoleText?: boolean
  onLinkPress?: (link: string) => void
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  item,
  userRole,
  onRefresh,
  handleOpenResource,
  index,
  showAddFavoriteMessage = false,
  customStyles,
  keyPrefix = 'resource',
  showRoleText = true,
  onLinkPress,
}) => {
  const getInitialImageUri = () => {
    if (!item) return 'https://via.placeholder.com/64x64/cccccc/666666?text=?'
    if (item.logo) return item.logo
    try {
      return item.link ? `https://www.google.com/s2/favicons?domain=${new URL(item.link).hostname}&sz=64` : 'https://via.placeholder.com/64x64/cccccc/666666?text=?'
    } catch {
      return 'https://via.placeholder.com/64x64/cccccc/666666?text=?'
    }
  }

  const [imgUri, setImgUri] = useState(getInitialImageUri())
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  const cardStyles = customStyles || styles
  const uniqueCardKey = useMemo(() => `${keyPrefix}-${item?.id || 'unknown'}-${userRole}-${index}-${Math.random().toString(36).substr(2, 9)}`, [item?.id, userRole, index, keyPrefix])

  useEffect(() => {
    const initializeFavorites = async () => {
      const user = auth.currentUser
      if (!user?.uid || !item?.id || !userRole) {
        setLoading(false)
        return
      }

      try {
        const resourceRoleKey = getResourceRoleKey(item.id.toString(), userRole)
        const favRef = doc(db, 'users', user.uid, 'favorites', resourceRoleKey)
        const docSnap = await getDoc(favRef)
        setLiked(docSnap.exists())

        const totalCount = await getTotalFavoritesCount(item.id, userRole)
        setLikeCount(totalCount)

        // Update resource document
        const resourceRef = doc(db, 'resources', resourceRoleKey)
        await setDoc(
          resourceRef,
          {
            id: item.id,
            name: item.name || 'Unknown Resource',
            link: item.link || '',
            logo: item.logo || imgUri,
            role: userRole,
            likeCount: totalCount,
            lastUpdated: serverTimestamp(),
          },
          { merge: true },
        )
      } catch (error) {
        console.error('Error initializing favorites:', error)
        setLiked(false)
        setLikeCount(0)
      } finally {
        setLoading(false)
      }
    }

    initializeFavorites()
  }, [item?.id, userRole])

  const handlePress = async () => {
    if (!item?.link) return

    if (handleOpenResource) {
      handleOpenResource(item)
    } else if (onLinkPress) {
      onLinkPress(item.link)
    } else {
      try {
        await Linking.openURL(item.link)
      } catch (error) {
        console.error('Error opening URL:', error)
      }

      // Store in AsyncStorage
      try {
        const stored = await AsyncStorage.getItem('myPath')
        let myPath = stored ? JSON.parse(stored) : []
        const roleSpecificItem = {
          ...item,
          roleKey: getResourceRoleKey(item.id.toString(), userRole),
          role: userRole,
          uniqueId: `${item.id}_${userRole}_${Date.now()}`,
        }

        if (!myPath.find((i: any) => i.roleKey === roleSpecificItem.roleKey)) {
          myPath.push(roleSpecificItem)
          await AsyncStorage.setItem('myPath', JSON.stringify(myPath))
        }
      } catch (e) {
        console.error('Error saving My Path:', e)
      }
    }
  }

  const handleToggleFavorite = async (e: any) => {
    e?.stopPropagation?.()

    if (!item?.id || !auth.currentUser || loading) {
      if (!auth.currentUser) Alert.alert('Authentication Required', 'Please log in to add favorites')
      return
    }

    try {
      await toggleFavorite(item, userRole, liked, setLiked, setLikeCount, onRefresh)
      if (showAddFavoriteMessage && !liked) {
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 1500)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      Alert.alert('Error', 'Failed to update favorite. Please try again.')
    }
  }

  if (!item) {
    return (
      <View style={[cardStyles?.myPathCard, { padding: 20, alignItems: 'center' }]}>
        <Text style={{ color: '#666', fontSize: 14 }}>Resource not available</Text>
      </View>
    )
  }

  return (
    <View key={uniqueCardKey} style={cardStyles.myPathCard}>
      <Pressable onPress={handlePress} style={{ borderRadius: 20 }}>
        <Image source={{ uri: imgUri }} style={cardStyles.myPathImage} resizeMode="contain" onError={() => setImgUri(getFallbackUrl(item.link))} />
      </Pressable>

      <View style={[cardStyles.cardFooter, { padding: 10 }]}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={cardStyles.cardText}>
            {item?.name || 'Unknown Resource'}
          </Text>
          {showRoleText && (
            <Text numberOfLines={1} style={{ fontSize: 12, color: '#666', fontStyle: 'italic' }}>
              For {userRole}
            </Text>
          )}
        </View>

        <Pressable
          onPress={handleToggleFavorite}
          disabled={loading}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 20,
            backgroundColor: 'rgba(0,0,0,0.05)',
            zIndex: 10,
            elevation: 5,
          }}
          android_ripple={{ color: 'rgba(255, 107, 107, 0.3)', borderless: false }}
        >
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? '#FF6B6B' : '#666'} />
          <Text style={{ fontSize: 14, marginLeft: 6, fontWeight: 'bold', color: liked ? '#FF6B6B' : '#666' }}>{loading ? '...' : likeCount || 0}</Text>
        </Pressable>

        {showAddFavoriteMessage && showMessage && <MyCustomModal message="✅ Added to Favorite" />}
      </View>
    </View>
  )
}

export default ResourceCard
