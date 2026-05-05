import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

interface Resource {
  id: number
  name: string
  link: string
  logo?: string
  title?: string
  description?: string
  category?: string
}

interface SearchResultsProps {
  search: string
  filteredResources: Resource[]
  filteredMyPathItems: Resource[]
  hasResults: boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({ search, filteredResources, filteredMyPathItems, hasResults }) => {
  if (!hasResults) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 40,
        }}
      >
        <FontAwesome5 name="search" size={48} color="#ccc" />
        <Text
          style={{
            marginTop: 16,
            fontSize: 18,
            color: '#666',
            textAlign: 'center',
          }}
        >
          No results found for "{search}"
        </Text>
        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            color: '#999',
            textAlign: 'center',
          }}
        >
          Try different keywords or check your spelling
        </Text>
      </View>
    )
  }

  return null // Results are handled by individual sections
}

export default SearchResults
