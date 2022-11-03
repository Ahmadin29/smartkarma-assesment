import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Text from '../components/Text';
import Index from '../screen';
import Search from '../screen/search';

export default function MainNavigator() {

    const Stack = createNativeStackNavigator();
    
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Index"
                component={Index}
                options={{
                    headerShown:false,
                }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title:"Search Stocks"
                }}
            />
        </Stack.Navigator>
    )
}