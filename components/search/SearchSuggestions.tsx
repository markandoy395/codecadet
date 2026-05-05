import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
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

interface SearchSuggestionsProps {
  suggestions: Resource[]
  onSuggestionPress: (suggestion: Resource) => void
  onSuggestionSelect: (suggestion: Resource) => void
  visible: boolean
  searchTerm: string
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSuggestionPress, onSuggestionSelect, visible, searchTerm }) => {
  if (!visible || suggestions.length === 0) {
    return null
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return parts.map((part, index) => (
      <Text
        key={index}
        style={{
          fontWeight: part.toLowerCase() === highlight.toLowerCase() ? 'bold' : 'normal',
          color: part.toLowerCase() === highlight.toLowerCase() ? '#007AFF' : '#333',
        }}
      >
        {part}
      </Text>
    ))
  }

  const renderSuggestion = ({ item }: { item: Resource }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
      }}
      onPress={() => onSuggestionPress(item)}
      activeOpacity={0.7}
    >
      {/* Resource Logo */}
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          backgroundColor: '#f5f5f5',
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {item.logo ? <Image source={{ uri: item.logo }} style={{ width: 24, height: 24, borderRadius: 4 }} resizeMode="contain" /> : <FontAwesome5 name="globe" size={16} color="#666" />}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#333' }}>{highlightText(item.name, searchTerm)}</Text>
        {item.title && item.title !== item.name && <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>{highlightText(item.title, searchTerm)}</Text>}
        {item.category && <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{item.category}</Text>}
      </View>

      {/* Arrow Icon */}
      <TouchableOpacity style={{ padding: 8, marginLeft: 8 }} onPress={() => onSuggestionSelect(item)}>
        <FontAwesome5 name="arrow-up" size={14} color="#999" style={{ transform: [{ rotate: '45deg' }] }} />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View
      style={{
        position: 'absolute',
        top: 60, // Adjust based on your search bar height
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        maxHeight: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 1000,
        borderWidth: 1,
        borderColor: '#e0e0e0',
      }}
    >
      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={(item, index) => `suggestion-${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ borderRadius: 12 }}
      />
    </View>
  )
}

export default SearchSuggestions
