import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainNavigator from './navigator';
import useCachedResources from './hooks/useCachedResources';
import Colors from './constants/colors';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useEffect } from 'react';

export default function App() {

  const loadingResources = useCachedResources()

  if (loadingResources) {
    return (
      <SafeAreaProvider>
        <StatusBar translucent={false} backgroundColor={Colors.white} />
        <Provider store={store} >
          <NavigationContainer>
            <MainNavigator/>
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    );
  }else{
    return null
  }
}