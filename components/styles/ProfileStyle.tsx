import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  Container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  ProfileInfo: {
    borderRadius: 20,
    height: 250,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    overflow: 'hidden', // keeps corners clean
  },

  ImageContainer: {
    flex: 1, // 50%
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  Image: {
    width: '100%', // so it won’t stretch weird
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },

  info: {
    flex: 1, // 50%
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  name: {
    fontSize: 40,
    fontFamily: 'Montserrat_700Bold',
    textTransform: 'uppercase',
  },
  myActivity: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    width: '100%',
    borderRadius: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
  },
  totalFavorites: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  totalHistory: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#0D133D',
    width: '100%',
    borderRadius: 20,
  },
  imagePickerContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // adjust based on your existing Image style
    overflow: 'hidden',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // adjust based on your existing Image style
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Montserrat_400Regular',
    marginTop: 5,
  },
})
