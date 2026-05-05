import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  // Existing styles
  SearchBarContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
  },
  SearchBarChild: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0D133D',
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 50,
    flex: 1,
    marginLeft: 10,
  },
  SafeAreaStyle: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  myPathContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  myPathTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D133D',
    marginBottom: 12,
    paddingLeft: 8,
  },
  myPathRow: {
    flexDirection: 'row',
    flexWrap: 'wrap', // grid layout
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  myPathCard: {
    width: '47%', // two cards per row
    height: 220,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  myPathImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D133D',
    flexShrink: 1,
  },

  // New TrendResourceScreen styles
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
  },
  titleContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  roleAndCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roleText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  countText: {
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginBottom: 4,
  },
  sortOptionSelected: {
    backgroundColor: '#e3f2fd',
  },
  sortOptionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: 'normal',
  },
  sortOptionTextSelected: {
    color: '#1976d2',
    fontWeight: '600',
  },
  checkmark: {
    marginLeft: 'auto',
  },
  cancelButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
})
