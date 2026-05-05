import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    flexWrap: 'wrap', // now works
    justifyContent: 'space-around',
  },
  myPathCard: {
    width: 160,
    height: 220,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    gap: 10,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginBottom: 10,
    overflow: 'hidden', // makes image corners smooth
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
  },
});
