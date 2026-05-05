import { KeyboardAvoidingView, View, Platform, ScrollView, Linking, Alert, Text, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { webDevResources } from '../../src/data/webDevResources'
import { uiResources } from '../../src/data/uiResources'
import { QAResources } from '../../src/data/QAResources'
import getFallbackUrl from '../../utils/getFallbackUrl'
import MyPathSection from '../../components/home/MyPathSection'
import TrendingSection from '../../components/home/TrendingSection'
import NewThisWeekSection from '../../components/home/NewThisWeekSection'
import SearchBar from '../../components/search/SearchBar'
import SearchResults from '../../components/search/SearchResult'
import SearchSuggestions from '../../components/search/SearchSuggestions'
import { performSearch, hasSearchResults, isSearchMode, getSearchSuggestions } from '../../utils/SearchUtils'
import { auth, db } from 'FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged, User } from 'firebase/auth'
import SpinnerLoadingSuccess from '../../components/AnimationButton/loading' // Adjust the path as needed

interface Resource {
  id: number
  name: string
  link: string
  logo?: string
  title?: string
  description?: string
  category?: string
}

interface UserData {
  role?: string
  jobRole?: string
}

type DrawerNav = DrawerNavigationProp<any>

const HomeScreen = () => {
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigation = useNavigation<DrawerNav>()
  const [myPathItems, setMyPathItems] = useState<Resource[]>([])
  const [userRole, setUserRole] = useState<string>('')
  const [currentResources, setCurrentResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchInputRef = useRef<TextInput>(null!)
  const isMountedRef = useRef(true)
  const userDataCache = useRef<{ uid: string; role: string } | null>(null)
  const authUnsubscribeRef = useRef<(() => void) | null>(null)
  const authListenerSetup = useRef(false)

  const getResourceLogo = useCallback((resource: Resource): string => {
    if (resource.logo) {
      return resource.logo
    }
    return getFallbackUrl(resource.link)
  }, [])

  const getResourcesByRole = useCallback((role: string): Resource[] => {
    switch (role) {
      case 'Developer':
        return webDevResources || []
      case 'UI/UX Designer':
        return uiResources || []
      case 'Quality Assurance':
        return QAResources || []
      default:
        return uiResources || []
    }
  }, [])

  const fetchUserData = useCallback(async (user: User) => {
    if (userDataCache.current && userDataCache.current.uid === user.uid) {
      return userDataCache.current.role
    }

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData
        const role = userData.role || userData.jobRole || 'UI/UX Designer'

        userDataCache.current = { uid: user.uid, role }
        return role
      } else {
        const defaultRole = 'UI/UX Designer'
        userDataCache.current = { uid: user.uid, role: defaultRole }
        return defaultRole
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      const defaultRole = 'UI/UX Designer'
      userDataCache.current = { uid: user.uid, role: defaultRole }
      return defaultRole
    }
  }, [])

  const setupAuthListener = useCallback(() => {
    if (authListenerSetup.current) return

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!isMountedRef.current) return

      if (user) {
        if (!userDataCache.current || userDataCache.current.uid !== user.uid) {
          setIsLoading(true)
          const role = await fetchUserData(user)

          if (isMountedRef.current) {
            setUserRole(role)
            setCurrentResources(getResourcesByRole(role))
            setIsLoading(false)
          }
        } else {
          const cachedRole = userDataCache.current.role
          if (isMountedRef.current) {
            setUserRole(cachedRole)
            setCurrentResources(getResourcesByRole(cachedRole))
          }
        }
      } else {
        userDataCache.current = null
        if (isMountedRef.current) {
          setUserRole('UI/UX Designer')
          setMyPathItems([]) // clear user's MyPath when logged out

          setCurrentResources(getResourcesByRole('UI/UX Designer'))
        }
      }
    })

    authUnsubscribeRef.current = unsubscribe
    authListenerSetup.current = true
  }, [fetchUserData, getResourcesByRole])
  const getMyPathKey = (uid: string) => `myPath_${uid}`

  const handleOpenResource = useCallback(
    async (item: Resource) => {
      if (!item?.link) {
        Alert.alert('Error', 'Invalid resource link')
        return
      }

      try {
        const supported = await Linking.canOpenURL(item.link)
        if (supported) {
          setMyPathItems(prev => {
            const existingItem = prev.find(p => p.id === item.id)
            const resourceWithLogo = { ...item, logo: getResourceLogo(item) }

            let updatedPath
            if (existingItem) {
              const filteredItems = prev.filter(p => p.id !== item.id)
              updatedPath = [resourceWithLogo, ...filteredItems]
            } else {
              updatedPath = [resourceWithLogo, ...prev]
            }

            if (auth.currentUser) {
              const key = getMyPathKey(auth.currentUser.uid)
              AsyncStorage.setItem(key, JSON.stringify(updatedPath)).catch(e => {
                console.error('Error saving My Path:', e)
              })
            }

            return updatedPath
          })

          await Linking.openURL(item.link)
        } else {
          Alert.alert('Error', 'Cannot open this link')
        }
      } catch (error) {
        console.error('Error opening resource:', error)
        Alert.alert('Error', 'Failed to open resource')
      }
    },
    [getResourceLogo],
  )

  const loadMyPath = useCallback(async () => {
    try {
      if (auth.currentUser) {
        const key = getMyPathKey(auth.currentUser.uid)
        const stored = await AsyncStorage.getItem(key)

        if (stored && isMountedRef.current) {
          const parsedData = JSON.parse(stored)
          if (Array.isArray(parsedData)) {
            setMyPathItems(parsedData)
          }
        }
      }
    } catch (error) {
      console.error('Error loading My Path (visited resources):', error)
      if (auth.currentUser) {
        const key = getMyPathKey(auth.currentUser.uid)
        AsyncStorage.removeItem(key).catch(e => console.error('Error clearing corrupted data:', e))
      }
    }
  }, [])

  const handleSearchChange = useCallback((text: string) => {
    setSearch(text)
    setShowSuggestions(text.trim().length > 0)
  }, [])

  const clearSearch = useCallback(() => {
    setSearch('')
    setShowSuggestions(false)
  }, [])

  const handleSearchFocus = useCallback(() => {
    if (search.trim().length > 0) {
      setShowSuggestions(true)
    }
  }, [search])

  const handleSearchBlur = useCallback(() => {
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }, [])

  const handleSuggestionPress = useCallback(
    (suggestion: Resource) => {
      setShowSuggestions(false)
      searchInputRef.current?.blur()
      handleOpenResource(suggestion)
    },
    [handleOpenResource],
  )

  const handleSuggestionSelect = useCallback((suggestion: Resource) => {
    setSearch(suggestion.name)
    setShowSuggestions(false)
    searchInputRef.current?.blur()
  }, [])

  const filteredResources = useMemo(() => {
    return performSearch(currentResources, search)
  }, [currentResources, search])

  const filteredMyPathItems = useMemo(() => {
    return performSearch(myPathItems, search)
  }, [myPathItems, search])

  const searchSuggestions = useMemo(() => {
    const allResources = [...currentResources, ...myPathItems]
    return getSearchSuggestions(allResources, search, 5)
  }, [currentResources, myPathItems, search])

  const isSearching = useMemo(() => isSearchMode(search), [search])
  const searchHasResults = useMemo(() => hasSearchResults(filteredResources, filteredMyPathItems), [filteredResources, filteredMyPathItems])

  useFocusEffect(
    useCallback(() => {
      loadMyPath()
    }, [loadMyPath]),
  )

  useEffect(() => {
    isMountedRef.current = true
    setupAuthListener()

    return () => {
      isMountedRef.current = false
      authListenerSetup.current = false
      if (authUnsubscribeRef.current) {
        authUnsubscribeRef.current()
        authUnsubscribeRef.current = null
      }
    }
  }, [setupAuthListener])

  if (isLoading) {
    return <SpinnerLoadingSuccess isVisible={true} loadingText="Loading your content..." backgroundColor="#ffffff" />
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#ffffff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <View style={{ position: 'relative', zIndex: 1000 }}>
        <SearchBar search={search} onSearchChange={handleSearchChange} onClearSearch={clearSearch} onFocus={handleSearchFocus} onBlur={handleSearchBlur} inputRef={searchInputRef} />

        <SearchSuggestions suggestions={searchSuggestions} onSuggestionPress={handleSuggestionPress} onSuggestionSelect={handleSuggestionSelect} visible={showSuggestions} searchTerm={search} />
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            backgroundColor: '#ffffff',
          }}
        >
          <MyPathSection myPathItems={isSearching ? filteredMyPathItems : myPathItems} />

          <TrendingSection uiResources={filteredResources} handleOpenResource={handleOpenResource} userRole={userRole} />

          {!isSearching && <NewThisWeekSection />}

          {isSearching && !searchHasResults && <SearchResults search={search} filteredResources={filteredResources} filteredMyPathItems={filteredMyPathItems} hasResults={searchHasResults} />}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default HomeScreen
