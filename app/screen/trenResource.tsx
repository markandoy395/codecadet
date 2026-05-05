import { KeyboardAvoidingView, View, Platform, ScrollView, Text, TouchableOpacity, Modal, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useMemo } from 'react'
import { Ionicons } from '@expo/vector-icons'
import styles from '../../components/styles/costumeTrent'
import { useRouter } from 'expo-router'
import { SORT_OPTIONS } from 'src/constants/sortOptions'
import ResourceCard from '../../components/ResourceCard'
import { webDevResources } from '../../src/data/webDevResources'
import { uiResources } from '../../src/data/uiResources'
import { QAResources } from '../../src/data/QAResources'
import { auth, db } from '../../FirebaseConfig'
import { doc, getDoc, query, collectionGroup, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import SimpleLoading from '../../components/AnimationButton/loading' // Import your spinner component

// Move this helper function outside the component
const getTotalFavoritesCount = async (resourceId: string, role: string) => {
  try {
    const resourceRoleKey = `${resourceId}_${role}`
    const favoritesQuery = query(collectionGroup(db, 'favorites'))
    const querySnapshot = await getDocs(favoritesQuery)

    let count = 0
    querySnapshot.forEach(doc => {
      if (doc.id === resourceRoleKey) count++
    })
    return count
  } catch (error) {
    console.error('Error getting favorites count:', error)
    return 0
  }
}

// Ensure this is a proper React component
const TrendResourceScreen: React.FC = () => {
  const router = useRouter()
  const [currentResources, setCurrentResources] = useState<any[]>([])
  const [userRole, setUserRole] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [resourceLikeCounts, setResourceLikeCounts] = useState<{ [key: string]: number }>({})
  const [sortBy, setSortBy] = useState<string>('popularity')
  const [showSortModal, setShowSortModal] = useState(false)

  const getResourcesByRole = (role: string) =>
    ({
      Developer: webDevResources,
      'UI/UX Designer': uiResources,
      'Quality Assurance': QAResources,
    }[role] || uiResources)

  const loadResourceLikeCounts = async (resources: any[], role: string) => {
    const counts: { [key: string]: number } = {}
    await Promise.all(
      resources.map(async resource => {
        counts[resource.id] = await getTotalFavoritesCount(resource.id.toString(), role)
      }),
    )
    setResourceLikeCounts(counts)
  }

  const sortedResources = useMemo(() => {
    if (!currentResources.length) return []
    let sorted = [...currentResources]

    if (sortBy === 'random') {
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[sorted[i], sorted[j]] = [sorted[j], sorted[i]]
      }
      return sorted
    }

    const sortFunctions: { [key: string]: (a: any, b: any) => number } = {
      name: (a: any, b: any) => a.name.localeCompare(b.name),
      nameDesc: (a: any, b: any) => b.name.localeCompare(a.name),
      popularity: (a: any, b: any) => (resourceLikeCounts[b.id] || 0) - (resourceLikeCounts[a.id] || 0),
      newest: (a: any, b: any) => (b.dateAdded || b.id) - (a.dateAdded || a.id),
    }

    const sortFunction = sortFunctions[sortBy]
    return sortFunction ? sorted.sort(sortFunction) : sorted
  }, [currentResources, sortBy, resourceLikeCounts])

  const loadUserRole = async () => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userDocRef)

          if (userDoc.exists()) {
            const userData = userDoc.data()
            const role = userData.role || userData.jobRole || 'UI/UX Designer'
            setUserRole(role)
            const resources = getResourcesByRole(role)
            setCurrentResources(resources)
            await loadResourceLikeCounts(resources, role)
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    })
    return unsubscribe
  }

  const handleRefresh = async () => {
    if (currentResources.length && userRole) {
      await loadResourceLikeCounts(currentResources, userRole)
    }
    setRefreshKey(prev => prev + 1)
  }

  const handleSortSelect = (sortKey: string) => {
    setSortBy(sortKey)
    setShowSortModal(false)
    setRefreshKey(prev => prev + 1)
  }

  const currentSort = SORT_OPTIONS.find(opt => opt.key === sortBy)

  useEffect(() => {
    loadUserRole()
  }, [])

  if (loading) {
    return <SimpleLoading isVisible={true} loadingText="Loading trending resources..." backgroundColor="#ffffff" />
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} />
            <Text>Back</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowSortModal(true)} style={styles.sortButton}>
          <Ionicons name={currentSort?.icon || 'funnel'} size={16} color="#666" />
          <Text style={styles.sortButtonText}>{currentSort?.label || 'Sort'}</Text>
          <Ionicons name="chevron-down" size={14} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.SafeAreaStyle}>
          <View style={styles.myPathContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.myPathTitle}>Trending Resources</Text>
              <View style={styles.roleAndCountContainer}>
                {userRole && <Text style={styles.roleText}>Role: {userRole}</Text>}
                <Text style={styles.countText}>• {sortedResources.length} resources</Text>
              </View>
            </View>

            <View style={styles.myPathRow}>
              {sortedResources.map((item, index) => (
                <ResourceCard
                  key={`trending-${item.id}-${userRole}-${index}-${refreshKey}-${sortBy}`}
                  item={item}
                  userRole={userRole}
                  onRefresh={handleRefresh}
                  index={index}
                  customStyles={styles}
                  keyPrefix="trending"
                  showRoleText={true}
                  showAddFavoriteMessage={false}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

      <Modal visible={showSortModal} transparent={true} animationType="fade" onRequestClose={() => setShowSortModal(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowSortModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort Resources</Text>

            {SORT_OPTIONS.map(option => (
              <TouchableOpacity key={option.key} onPress={() => handleSortSelect(option.key)} style={[styles.sortOption, sortBy === option.key && styles.sortOptionSelected]}>
                <Ionicons name={option.icon} size={20} color={sortBy === option.key ? '#1976d2' : '#666'} />
                <Text style={[styles.sortOptionText, sortBy === option.key && styles.sortOptionTextSelected]}>{option.label}</Text>
                {sortBy === option.key && <Ionicons name="checkmark" size={20} color="#1976d2" style={styles.checkmark} />}
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setShowSortModal(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  )
}

export default TrendResourceScreen
