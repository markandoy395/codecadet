import React, { useRef } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from '../../components/styles/homeStyle'

interface SearchBarProps {
  search: string
  onSearchChange: (text: string) => void
  onClearSearch: () => void
  onFocus?: () => void
  onBlur?: () => void
  inputRef?: React.RefObject<TextInput>
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange, onClearSearch, onFocus, onBlur, inputRef }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <FontAwesome5 name="search" size={20} color="#0D133D" />
        <TextInput
          ref={inputRef}
          style={{
            flex: 1,
            marginLeft: 8,
            backgroundColor: 'transparent',
            fontSize: 16,
          }}
          placeholder="Search resources..."
          onChangeText={onSearchChange}
          value={search}
          returnKeyType="search"
          clearButtonMode="while-editing" // iOS only
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {/* Clear button for Android and additional clear option */}
        {search.length > 0 && (
          <TouchableOpacity onPress={onClearSearch} style={{ marginLeft: 8 }}>
            <FontAwesome5 name="times-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default SearchBar
