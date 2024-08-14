import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Context } from "../globalContext/globalContext.js";
import containers, { headerStyle,headerHome, backButton } from "../styles/containers.js";
import Landing from '../screens/landing.js';
import Login from '../screens/login.js';
import Register from '../screens/register.js';
import Welcome from '../screens/Welcome.js';
import ProjectDetails from '../screens/projectDetails.js';
import ForgotPassword from '../screens/forgotPassword.js';
import ResetPassword from '../screens/resetPassword.js';
import Map from '../screens/map.js';
import TabNavigator from './TabNavigator'; // Import the TabNavigator

const Stack = createNativeStackNavigator();

function Navigator(props) {
  const globalContext = useContext(Context);
  const { isLoggedIn, userObj, setIsLoggedIn } = globalContext;

  return (
    <Stack.Navigator initialRouteName="Landing">
      {(!isLoggedIn || !userObj) ? (
        <>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={({ navigation }) => ({
              ...headerStyle,
            })}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={({ navigation }) => ({
              ...headerStyle,
              ...backButton(navigation),
            })}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={({ navigation }) => ({
              ...headerStyle,
              ...backButton(navigation),
            })}
          />

        </>
      ) : (
/* */ 
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        
        options={({ navigation }) => ({
          ...headerHome,
          headerRight: () => (
            <TouchableOpacity
            onPress={() => {
              setIsLoggedIn(false);
              if (navigation.canGoBack()) {
                navigation.popToTop();
              }
            }}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Quit</Text>
            </TouchableOpacity>
          ),
        })}
      /> 
      
      )
      }

<Stack.Screen
            name="Map"
            component={Map}
            options={({ navigation }) => ({
              ...headerStyle,
              ...backButton(navigation),
            })}
          />

          <Stack.Screen
            name="ProjectDetails"
            component={ProjectDetails}
            options={({ navigation }) => ({
              ...headerHome,
              ...backButton(navigation),
            })}
          />

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={({ navigation }) => ({
              ...headerStyle,
              ...backButton(navigation),
            })}
          />

          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={({ navigation }) => ({
              ...headerStyle,
              ...backButton(navigation),
            })}
          />

<Stack.Screen
            name="Home"
            component={TabNavigator}
            options={({ navigation }) => ({
              ...headerHome,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    setIsLoggedIn(false);
                    navigation.popToTop()
                  }}
                  style={{ marginRight: 15 }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Quit</Text>
                </TouchableOpacity>
              ),
            })}
          />

    </Stack.Navigator>

    
  );
}

export default Navigator;
