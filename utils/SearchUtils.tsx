interface Resource {
  id: number
  name: string
  link: string
  logo?: string
  title?: string
  description?: string
  category?: string
}

/**
 * Enhanced search function to search through multiple fields
 * @param items - Array of resources to search through
 * @param searchTerm - The search term to look for
 * @returns Filtered array of resources matching the search term
 */
export const performSearch = (items: Resource[], searchTerm: string): Resource[] => {
  if (!searchTerm.trim()) return items

  const searchLower = searchTerm.toLowerCase().trim()

  return items.filter((resource: Resource) => {
    return (
      resource?.name?.toLowerCase().includes(searchLower) ||
      resource?.title?.toLowerCase().includes(searchLower) ||
      resource?.description?.toLowerCase().includes(searchLower) ||
      resource?.category?.toLowerCase().includes(searchLower)
    )
  })
}

/**
 * Get search suggestions based on search term
 * @param items - Array of resources to search through
 * @param searchTerm - The search term to look for
 * @param limit - Maximum number of suggestions to return
 * @returns Array of suggested resources
 */
export const getSearchSuggestions = (items: Resource[], searchTerm: string, limit: number = 5): Resource[] => {
  if (!searchTerm.trim()) return []

  const searchLower = searchTerm.toLowerCase().trim()

  // Score each resource based on relevance
  const scoredItems = items
    .map((resource: Resource) => {
      let score = 0

      // Exact match in name gets highest score
      if (resource?.name?.toLowerCase() === searchLower) {
        score += 100
      } else if (resource?.name?.toLowerCase().startsWith(searchLower)) {
        score += 50
      } else if (resource?.name?.toLowerCase().includes(searchLower)) {
        score += 20
      }

      // Title matches
      if (resource?.title?.toLowerCase().startsWith(searchLower)) {
        score += 30
      } else if (resource?.title?.toLowerCase().includes(searchLower)) {
        score += 10
      }

      // Category matches
      if (resource?.category?.toLowerCase().includes(searchLower)) {
        score += 15
      }

      // Description matches (lower priority)
      if (resource?.description?.toLowerCase().includes(searchLower)) {
        score += 5
      }

      return { resource, score }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.resource)

  return scoredItems
}

/**
 * Check if search has any results
 * @param filteredResources - Filtered resources array
 * @param filteredMyPathItems - Filtered MyPath items array
 * @returns Boolean indicating if there are any search results
 */
export const hasSearchResults = (filteredResources: Resource[], filteredMyPathItems: Resource[]): boolean => {
  return filteredResources.length > 0 || filteredMyPathItems.length > 0
}

/**
 * Determine if we're in search mode
 * @param search - The search string
 * @returns Boolean indicating if user is actively searching
 */
export const isSearchMode = (search: string): boolean => {
  return search.trim().length > 0
}
