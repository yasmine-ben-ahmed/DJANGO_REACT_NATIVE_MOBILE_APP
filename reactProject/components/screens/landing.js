import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Context } from "../globalContext/globalContext.js";
import containers from "../styles/containers.js";
import fonts from "../styles/fonts.js";
import buttons from "../styles/buttons.js";
import LoginIcon from '../../assets/images/misc/login.png';

function Landing({ navigation }) {
  const globalContext = useContext(Context);
  const {  appSettings } = globalContext;

  return (
    <View style={containers(appSettings).outerPage}>
      <Image source={LoginIcon} style={{ width: 300, height: 300 }} />
      <Text style={[fonts(appSettings).h1,{ marginTop: -20 }]}>Welcome, Client !</Text>

      <TouchableOpacity
        style={[buttons(appSettings).landingpage, { marginTop: 80 }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ fontWeight: 'bold', color:"#666"}}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[buttons(appSettings).landingpage, { marginTop: 25 }]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ fontWeight: 'bold', color:"#666"}}>Sign Up</Text>
      </TouchableOpacity>


    </View>
  );
}

export default Landing;
