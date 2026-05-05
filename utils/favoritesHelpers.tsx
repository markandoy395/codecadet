// favoritesHelpers.js - Compact version
import { auth, db } from '../FirebaseConfig'
import { doc, setDoc, deleteDoc, updateDoc, query, collectionGroup, getDocs, serverTimestamp } from 'firebase/firestore'

export const getResourceRoleKey = (resourceId: string, role: string) => `${resourceId}_${role}`

export const getTotalFavoritesCount = async (resourceId: string, role: string) => {
  try {
    const resourceRoleKey = getResourceRoleKey(resourceId, role)
    const favoritesQuery = query(collectionGroup(db, 'favorites'))
    const querySnapshot = await getDocs(favoritesQuery)

    let count = 0
    querySnapshot.forEach(docSnap => {
      if (docSnap.id === resourceRoleKey) count++
    })

    return count
  } catch (error) {
    console.error('Error getting favorites count:', error)
    return 0
  }
}

export const toggleFavorite = async (
  item: any,
  userRole: string,
  liked: boolean,
  setLiked: (liked: boolean) => void,
  setLikeCount: (count: number | ((prev: number) => number)) => void,
  onRefresh?: () => void,
) => {
  const user = auth.currentUser
  if (!user?.uid || !item?.id || !userRole) return

  const resourceRoleKey = getResourceRoleKey(item.id.toString(), userRole)
  const favRef = doc(db, 'users', user.uid, 'favorites', resourceRoleKey)
  const resourceRef = doc(db, 'resources', resourceRoleKey)

  try {
    // Optimistic update
    setLiked(!liked)
    setLikeCount(prev => (liked ? Math.max(0, prev - 1) : prev + 1))

    if (liked) {
      // Unlike
      await deleteDoc(favRef)
    } else {
      // Like
      await setDoc(favRef, {
        id: item.id,
        name: item.name ?? '',
        link: item.link ?? '',
        logo: item.logo ?? '',
        role: userRole,
        createdAt: serverTimestamp(),
      })
    }

    // Get actual count and update resource
    const newCount = await getTotalFavoritesCount(item.id, userRole)
    await setDoc(
      resourceRef,
      {
        id: item.id,
        name: item.name,
        link: item.link,
        logo: item.logo,
        role: userRole,
        likeCount: newCount,
        lastUpdated: serverTimestamp(),
      },
      { merge: true },
    )

    setLikeCount(newCount)
    onRefresh?.()
  } catch (error) {
    console.error('Error toggling favorite:', error)
    // Revert on error
    setLiked(liked)
    setLikeCount(prev => (liked ? prev + 1 : Math.max(0, prev - 1)))
  }
}
