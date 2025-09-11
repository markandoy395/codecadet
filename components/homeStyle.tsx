import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  myPathContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  myPathTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D133D',
    marginBottom: 15,
  },
  myPathRow: {
    flexDirection: 'row',
    paddingRight: 2, // gives padding at the end
    paddingLeft: 2,
  },
  myPathCard: {
    width: 160,
    height: 200,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1, // soft
    shadowRadius: 10, // blur radius
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    marginBottom: 10,
    marginRight: 15,
    padding: 5,
  },
  myPathImage: {
    borderRadius: 20,
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
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
