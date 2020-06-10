import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'

Icon.loadFont()

import HomeView from '../views/HomeView/HomeView'
import CategoryView from '../views/CategoryView/CategoryView'
import MyMenuView from '../views/MyMenuView/MyMenuView'

const Tab = createBottomTabNavigator()

const mainRoutes = [
  {
    name: 'home',
    view: HomeView,
    icon: <Icon name="home" size={25} color="#333333" />,
    focusedIcon: <Icon name="home" size={25} color="#333333" />,
  },
  {
    name: 'category',
    view: CategoryView,
    icon: <Icon name="appstore-o" size={25} color="#333333" />,
    focusedIcon: <Icon name="appstore-o" size={25} color="#333333" />,
  },
  {
    name: 'user',
    view: MyMenuView,
    icon: <Icon name="user" size={25} color="#333333" />,
    focusedIcon: <Icon name="user" size={25} color="#333333" />,
  },
]

function BottomTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0.5,
          borderTopColor: '#aaa',
        },
        tabStyle: {
          height: 60,
        },
      }}
      // initialLayout={{height: 80}}
    >
      {mainRoutes.map((route) => (
        <Tab.Screen
          key={`screen-${route.name}`}
          name={route.name}
          component={route.view}
          options={{
            tabBarIcon: () => route.icon,
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default BottomTab
