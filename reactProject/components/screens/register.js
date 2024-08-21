import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import InputField from '../styles/inputField';
import { Context } from "../globalContext/globalContext.js";
import containers from "../styles/containers.js";
import fonts from "../styles/fonts.js";
import buttons from "../styles/buttons.js";
import GoogleIcon from '../../assets/images/misc/google.png';
import FacebookIcon from '../../assets/images/misc/facebook.png';
import TwitterIcon from '../../assets/images/misc/twitter.png';

function Register({ }) {
  const globalContext = useContext(Context);
  const { setIsLoggedIn, appSettings, domain, setUserObj, setToken } = globalContext;

  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [pseudo, setPseudo] = useState(""); 
  const [error, setError] = useState("");

  function handleLogin() {

    setError("")

    let body = JSON.stringify({

      'email': email.toLowerCase(),
      'firstName': firstName,
      'lastName': lastName,
      'password': password,
      'phone': phoneNumber,
      'pseudo': pseudo,
    })

    fetch(`${domain}/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:body
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError("User already exists")
          throw res.json()
        }
      })
      .then(json => {
        setUserObj(json)
        //setToken(json.token)
        setIsLoggedIn(true)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const togglePasswordVisibility = () => {
    setSecurePassword(prevState => !prevState);
  };

  return (
    <View style={containers(appSettings).outerPage }>
      <View style={containers(appSettings).formBox}>
        <Text style={[fonts(appSettings).h1]}>Sign Up</Text>
{/* 
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 25 }}>
          <TouchableOpacity onPress={() => console.log('Google Login')}>
            <Image source={GoogleIcon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Facebook Login')}>
            <Image source={FacebookIcon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Twitter Login')}>
            <Image source={TwitterIcon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View> */}

        <Text style={{ textAlign: 'center', color: '#fff', marginTop: 30 }}>
          Register with email ...
        </Text>

        <Text style={fonts(appSettings).errorLabel}>{error}</Text>

        <InputField
          label="First Name"
          icon="man"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />

        <InputField
          label="Last Name"
          icon="man"
          onChangeText={text => setLastName(text)}
          value={lastName}
        />

        <InputField
          label="Email Address"
          icon="email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />

      <InputField
          label="Phone Number" 
          icon="phone"
          keyboardType="phone-pad"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />

        <InputField
          label="Pseudo" 
          icon="man"
          onChangeText={text => setPseudo(text)}
          value={pseudo}
        /> 

      <InputField
          label="Password"
          icon="lock"
          secureTextEntry={securePassword}
          onChangeText={text => setPassword(text)}
          value={password}
          onEyePress={togglePasswordVisibility}
        />
        
        <TouchableOpacity style={[buttons(appSettings).login]} onPress={() => handleLogin()}>
          <Text style={{ fontWeight: 'bold', color:"#666"}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Register;
