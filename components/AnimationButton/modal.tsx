import React from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'

const MyCustomModal = ({ message }: { message: string }) => {
  return (
    <Modal transparent animationType="fade" visible>
      <View style={styles.overlay}>
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D133D',
  },
})

export default MyCustomModal
