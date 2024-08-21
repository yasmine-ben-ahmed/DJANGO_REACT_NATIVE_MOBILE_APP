import React, { useContext } from 'react';
import containers from "../styles/containers.js";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Context } from "../globalContext/globalContext.js";
import fonts from "../styles/fonts.js";

function Welcome({ navigation }) {
  const globalContext = useContext(Context);
  const {  appSettings, userObj } = globalContext;

  const handleStart = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={{ uri: `http://192.168.0.120:8000/static/index/images/5.jpg` }} style={containers(appSettings).background}> 
      <View style={containers(appSettings).overlay}>
        <View style={containers(appSettings).header}>
          <Text style={[fonts(appSettings).h1, containers(appSettings).welcomeText]}>Welcome </Text>
          <Text style={[fonts(appSettings).h1, containers(appSettings).welcomeText]}> {userObj.firstName} {userObj.lastName} !</Text>
        </View>
        <Text style={[fonts(appSettings).p, containers(appSettings).thankYouText]}>Thank you for using our app. We are thrilled to have you!</Text>


        <TouchableOpacity style={containers(appSettings).startButton} onPress={handleStart}>
          <Text style={containers(appSettings).startButtonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


export default Welcome;
