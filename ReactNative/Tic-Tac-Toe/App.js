import { StyleSheet, Text, View } from 'react-native';
import TicTacToe from './src/components/TicTacToe';

export default function App() {
  return (
    <View style={styles.container}>
      <TicTacToe/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
