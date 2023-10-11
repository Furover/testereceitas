import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {Home} from '../pages/home'
import {Favorites} from '../pages/favorites'

import {Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTinColor: "#121212",

                tabBarStyle:{
                    backgroundColor: "#FFF",
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen 
                name="HomeTab" 
                component={Home}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        if(focused){
                            <Ionicons name="home" color="#000" size={size} />
                        }
                    }
                }}
            />
            <Tab.Screen 
                name="FavoritesTab" 
                component={Favorites}
            />

        </Tab.Navigator>
    )
}