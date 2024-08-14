// components/screens/ForgotPassword.js
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Alert } from 'react-native';
import InputField from '../styles/inputField';
import { Context } from "../globalContext/globalContext.js";
import containers from "../styles/containers.js";
import fonts from "../styles/fonts.js";
import margins from "../styles/margins.js";
import buttons from "../styles/buttons.js";

import Icon from 'react-native-vector-icons/FontAwesome';


function ForgotPassword({ navigation }) {
  const globalContext = useContext(Context);
  const { appSettings, domain } = globalContext;

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handle = () => {
    setError("");
    
    let body = JSON.stringify({ email: email.toLowerCase() });
  
    fetch(`${domain}/api/reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(res => {
      if (res.ok) {
        return res.json(); // Convert the response to JSON only if it's ok
      } else {
        return res.json().then(result => {
          setError(result.error || "Failed to send password reset link. Please try again.");
          throw new Error('Failed to send reset link');
        });
      }
    })
    .then(result => {
      if (!error) {
        Alert.alert('Success', 'A password reset link has been sent to your email.');
        navigation.navigate('ResetPassword', { email: email.toLowerCase() });
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };
  
  
  return (
    <View style={containers(appSettings).outerPage}>
            <View style={containers(appSettings).iconContainer}>
        <Icon name="lock" size={100} color="#fff"  />
      </View>
      <View style={[containers(appSettings).formBox, {marginTop: 20}]}>
        <Text style={[fonts(appSettings).h1]}>Password Reset</Text>
        <Text style={fonts(appSettings).errorLabel}>{error}</Text>

        <Text style={{ color: "#ccc", textAlign: "center", marginBottom: 20 }}>
          Enter your email address to begin the precess.
        </Text>

        <InputField
          label="Email Address"
          icon="email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <TouchableOpacity style={[buttons(appSettings).login, margins.topTenPercent]} onPress={() => handle()}>
          <Text style={{ fontWeight: 'bold', color: "#666" }}>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}


export default ForgotPassword;
