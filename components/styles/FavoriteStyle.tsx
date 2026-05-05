import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  SearchBarContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchBarChild: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0D133D',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  SafeAreaStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  myPathContainer: {
    width: '100%',
    marginTop: 10,
  },
  myPathTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D133D',
    marginBottom: 14,
    paddingLeft: 4,
  },
  myPathRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // keeps cards aligned
  },
  myPathCard: {
    width: '48%', // responsive: always 2 per row
    height: 220,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 14,
    overflow: 'hidden',
  },
  myPathImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardFooter: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D133D',
  },
})
