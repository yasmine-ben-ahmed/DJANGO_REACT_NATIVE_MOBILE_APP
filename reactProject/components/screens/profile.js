import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon library
import { Context } from "../globalContext/globalContext.js";

import containers from "../styles/containers.js";




const ProfileScreen = ({ navigation }) => {
  const globalContext = useContext(Context);
  const { userObj, appSettings,domain } = globalContext;
  const defaultImageUri = `${domain}/static/images/user.jpg`;
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
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
            <Text style={containers(appSettings).title}>Welcome, {userObj.firstName}!</Text>
            <Text style={containers(appSettings).subtitle}>Here are your details:</Text>
            <View style={containers(appSettings).userDetails}>
              <Text style={containers(appSettings).userDetailLabel}>Email:</Text>
              <Text style={containers(appSettings).userDetailValue}>{userObj.email}</Text>
            </View>
            <View style={containers(appSettings).userDetails}>
              <Text style={containers(appSettings).userDetailLabel}>First Name:</Text>
              <Text style={containers(appSettings).userDetailValue}>{userObj.firstName}</Text>
            </View>
            <View style={containers(appSettings).userDetails}>
              <Text style={containers(appSettings).userDetailLabel}>Last Name:</Text>
              <Text style={containers(appSettings).userDetailValue}>{userObj.lastName}</Text>
            </View>
            <View style={containers(appSettings).userDetails}>
              <Text style={containers(appSettings).userDetailLabel}>Phone Number:</Text>
              <Text style={containers(appSettings).userDetailValue}>{userObj.phone}</Text>
            </View>
            <View style={containers(appSettings).userDetails}>
              <Text style={containers(appSettings).userDetailLabel}>Pseudo:</Text>
              <Text style={containers(appSettings).userDetailValue}>{userObj.pseudo}</Text>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity style={containers(appSettings).editButton} onPress={handleEditProfile}>
              <Icon name="edit" size={20} color="#fff" />
              <Text style={containers(appSettings).editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={containers(appSettings).noDataText}>No user data available</Text>
        )}
      </View>
    </ImageBackground>
  );
};


export default ProfileScreen;
