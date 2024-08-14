import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import InputField from '../styles/inputField';
import { Context } from "../globalContext/globalContext.js";
import containers from "../styles/containers.js";
import fonts from "../styles/fonts.js";
import margins from "../styles/margins.js";
import buttons from "../styles/buttons.js";

import GoogleIcon from '../../assets/images/misc/google.png';
import FacebookIcon from '../../assets/images/misc/facebook.png';
import TwitterIcon from '../../assets/images/misc/twitter.png';

function Login({ navigation }) {
  const globalContext = useContext(Context);
  const { setIsLoggedIn, appSettings, domain, setUserObj, setProjObj, setSupObj, setNodeDataObj, setNodeObj } = globalContext;

  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
  
    let body = JSON.stringify({
      'username': email.toLowerCase(),
      'password': password
    });
  
    fetch(`${domain}/api/client/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(res => {
      if (res.ok) {
        return res.json(); 
      } else {
        setError("Invalid Credentials");
        throw new Error('Invalid credentials'); 
      }
    })
    .then(json => {
      // Log all fields from JSON response
      //console.log("----Full JSON Response:", json);
  
      // Set state or perform further actions with the data
      setUserObj(json.client);
      setProjObj(json.projects);
      setSupObj(json.supervisor);
      setNodeDataObj(json.data_entries);
      setNodeObj(json.nodes);

      console.log("--1--Client projects data:", json.client);
      console.log("--2--Projects projects data:", json.projects);
      console.log("--3--Supervisor projects data:", json.supervisor);
      console.log("--4--Nodes projects data:", json.nodes);
      console.log("--5--Data Nodes projects data:", json.data_entries);

      setIsLoggedIn(true);
      navigation.navigate('Welcome', {
        userObj: json.client, 
        projObj: json.projects 
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const togglePasswordVisibility = () => {
    setSecurePassword(prevState => !prevState);
  };

  return (
    <View style={containers(appSettings).outerPage}>
      <View style={[containers(appSettings).formBox, { marginTop: 120 }]}>
        <Text style={[fonts(appSettings).h1]}>Sign In</Text>
        <Text style={fonts(appSettings).errorLabel}>{error}</Text>

        <InputField
          label="Email Address"
          icon="email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <InputField
          label="Password"
          icon="lock"
          secureTextEntry={securePassword}
          onChangeText={text => setPassword(text)}
          value={password}
          onEyePress={togglePasswordVisibility}
        />

        <TouchableOpacity style={[buttons(appSettings).login, margins.topTenPercent]} onPress={handleLogin}>
          <Text style={{ fontWeight: 'bold', color: "#666" }}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword} style={{ marginTop: 10 }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', color: '#CCC', marginTop: 30 }}>
          Or, login with ...
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
          <TouchableOpacity onPress={() => console.log('Google Login')}>
            <Image source={GoogleIcon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Facebook Login')}>
            <Image source={FacebookIcon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Twitter Login')}>
            <Image source={TwitterIcon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 40 }}>
          <Text style={{ color: '#CCC'}}>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#fff', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login;
