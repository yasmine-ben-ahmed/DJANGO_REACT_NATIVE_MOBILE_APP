// components/screens/ResetPassword.js
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Alert } from 'react-native';
import InputField from '../styles/inputField';
import { Context } from "../globalContext/globalContext.js";
import containers from "../styles/containers.js";
import fonts from "../styles/fonts.js";
import margins from "../styles/margins.js";
import buttons from "../styles/buttons.js";
import Icon from 'react-native-vector-icons/FontAwesome';

function ResetPassword({route, navigation }) {
  const globalContext = useContext(Context);
  const { appSettings, domain } = globalContext;

  //const [email, setEmail] = useState(""); // This can be pre-filled if passed via navigation params
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [securePassword, setSecurePassword] = useState(true);

  const { email } = route.params;


  const togglePasswordVisibility = () => {
    setSecurePassword(prevState => !prevState);
  };

  const togglePasswordVisibility1 = () => {
    setSecurePassword(prevState => !prevState);
  };


  const handle = () => {
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    let body = JSON.stringify({
      email: email.toLowerCase(),
      code: code,
      new_password: newPassword
    });

    fetch(`${domain}/api/verify_code_and_reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then(res => res.json())
    .then(result => {
      if (result.message) {
        Alert.alert('Success', 'Your password has been reset successfully.');
        navigation.navigate('Login');
      } else {
        setError(result.error || "Failed to reset password. Please try again.");
        throw new Error('Failed to reset password');
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  return (
    <View style={containers(appSettings).outerPage}>
                  <View style={containers(appSettings).iconContainer}>
        <Icon name="lock" size={100} color="#fff"  />
      </View>
      <View style={[containers(appSettings).formBox, {marginTop: 10}]}>
        <Text style={[fonts(appSettings).h1]}>Password Reset</Text>
        <Text style={fonts(appSettings).errorLabel}>{error}</Text>

        <Text style={{ color: "#ccc", textAlign: "left", marginBottom: 20 }}>
          Enter the code sent to your email and your new password.
        </Text>

        <InputField
          label="Code"
          icon="key"
          keyboardType="numeric"
          onChangeText={text => {
            const formattedText = text.replace(/\D/g, '').slice(0, 4);
            setCode(formattedText);
          }}
          value={code}
        />

<Text style={{ color: "#ccc", textAlign: "left", marginTop: 20, marginBottom: 20 }}>
          Enter your new password.
        </Text>

        <InputField
          label="New Password"
          icon="lock"
          secureTextEntry={securePassword}
          onChangeText={text => setNewPassword(text)}
          value={newPassword}
          onEyePress={togglePasswordVisibility}
        />


        <InputField
          label="Confirm New Password"
          icon="lock"
          secureTextEntry={securePassword}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          onEyePress={togglePasswordVisibility1}
        />

        <TouchableOpacity style={[buttons(appSettings).login, margins.topTenPercent]} onPress={handle}>
          <Text style={{ fontWeight: 'bold', color: "#666" }}>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
export default ResetPassword;
