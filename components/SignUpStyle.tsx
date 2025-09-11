import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    gap: 20,
    flexDirection: 'column',
  },

  circle: {
    position: 'absolute',
    width: 142,
    height: 142,
    borderRadius: 150 / 2,
  },
  yellowCircle: {
    backgroundColor: '#F5B700',
    left: 300,
    top: -10,
  },
  blueCircle: {
    backgroundColor: '#0D133D',
    left: 250,
    top: -90,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 40,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat_700Bold',
    alignSelf: 'flex-start',
    marginTop: 20, // replace top
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#0D133D',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#0D133D',
    fontFamily: 'Montserrat_400Regular', // add font
  },
  dropdown: {
    flex: 1,
    height: 50, // fixed height
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat_400Regular',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#0D133D',
  },
  signInButton: {
    backgroundColor: '#0D133D',
    padding: 18,
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
});
