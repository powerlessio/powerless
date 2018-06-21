import { StyleSheet } from 'react-native';

const PowerlessStyles = StyleSheet.create({
  container: {
    padding: 25,
  },
  title: {
    color: '#333',
    fontSize: 18,
    marginBottom: 15,
  },
  simpleNote: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteInfoName: {
    color: '#333',
    fontSize: 20,
    marginLeft: 17
  },
  noteInfoAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});

export { PowerlessStyles };
