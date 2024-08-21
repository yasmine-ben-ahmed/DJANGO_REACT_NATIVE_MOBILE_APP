import React, { useContext,useState  } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { Context } from "../globalContext/globalContext.js";
import containers from "../styles/containers.js";

const defaultImageUri = 'http://192.168.0.120:8000/static/images/user.jpg';

const EditProfile = ({ navigation }) => {
  const globalContext = useContext(Context);
  const { userObj, appSettings, setUserObj,domain } = globalContext;

  // Initialize state variables for the input fields
  const [email, setEmail] = useState(userObj.email);
  const [firstName, setFirstName] = useState(userObj.firstName);
  const [lastName, setLastName] = useState(userObj.lastName);
  const [phone, setPhone] = useState(userObj.phone);
  const [pseudo, setPseudo] = useState(userObj.pseudo);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError(""); 
  
    // Prepare the request body with the profile data
    const body = JSON.stringify({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      pseudo: pseudo,
    });
  
    try {
      // Send the POST request to update the profile
      const response = await fetch(`${domain}/api/update_profile/${userObj.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
  
      // Check if the response is OK
      if (response.ok) {

        const updatedUser = {
          ...userObj,
          email,
          firstName,
          lastName,
          phone,
          pseudo,
        };
        setUserObj(updatedUser);
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        // Handle errors returned from the server
        setError(errorData.error || "Failed to update profile. Please try again.");
        Alert.alert('Error', errorData.error || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again.");
      Alert.alert('Error', "An unexpected error occurred. Please try again.");
    }
  };
  
  return (
    <ImageBackground
      source={{ uri: `${domain}/static/index/images/3.jpg` }}
      style={containers(appSettings).background}
      imageStyle={containers(appSettings).backgroundImage}
    >
      <View style={containers(appSettings).containerProfile}>
        {userObj ? (
          <View style={containers(appSettings).userInfoContainer}>
            <Image
              source={{
                uri: userObj.image
                  ? `${domain}/static${userObj.image}`
                  : defaultImageUri,
              }}
              style={containers(appSettings).profileImage}
            />
            <Text style={containers(appSettings).title}>Welcome Dear Client !</Text>
            <Text style={containers(appSettings).subtitle}>Modify your information here:</Text>

              {/* Email */}
              <View style={containers(appSettings).inputRow}>
              <Text style={containers(appSettings).label}>Email:</Text>
              <TextInput
                style={containers(appSettings).input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* First Name */}
            <View style={containers(appSettings).inputRow}>
              <Text style={containers(appSettings).label}>First Name:</Text>
              <TextInput
                style={containers(appSettings).input}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            {/* Last Name */}
            <View style={containers(appSettings).inputRow}>
              <Text style={containers(appSettings).label}>Last Name:</Text>
              <TextInput
                style={containers(appSettings).input}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            {/* Phone Number */}
            <View style={containers(appSettings).inputRow}>
              <Text style={containers(appSettings).label}>Phone Number:</Text>
              <TextInput
                style={containers(appSettings).input}
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Pseudo */}
            <View style={containers(appSettings).inputRow}>
              <Text style={containers(appSettings).label}>Pseudo:</Text>
              <TextInput
                style={containers(appSettings).input}
                value={pseudo}
                onChangeText={setPseudo}
              />
            </View>

            <TouchableOpacity style={containers(appSettings).editButton} onPress={handleSave}>
              <Text style={containers(appSettings).editButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={containers(appSettings).noDataText}>No user data available</Text>
        )}
      </View>
    </ImageBackground>
  );
};


export default EditProfile;
