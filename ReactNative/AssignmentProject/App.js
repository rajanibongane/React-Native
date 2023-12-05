import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import Loader from './src/components/Loader';
import { Provider } from "react-redux";
import { store } from "./src/redux/app/store"

export default function App() {
  return (
    <Provider store={store}>
      <Loader/>
    <AppNavigator/>
    </Provider>
  );
  }

