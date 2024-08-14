import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Context } from "../globalContext/globalContext.js";
import ProjectDetailsModal from '../screens/projectDetails.js'; 
import containers from "../styles/containers.js";

function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const globalContext = useContext(Context);
  const { supObj, userObj, projObj,appSettings } = globalContext;
  const text = "We are honored to supervise your field from fire and protect it. You can manage your field anywhere, control its state, and feel safe. In case of fire, alerts will be sent to you and to our supervisor so that quick actions can be taken to minimize damages. We hope you find this service useful!";

  const handleProjectDetails = () => {
    setModalVisible(true);
  };

  const handleClientDetails = () => {
    navigation.navigate('Profile');
  };

  const handleMap = () => {
    navigation.navigate('Map');
  };

  return (
    <ImageBackground source={{ uri: `http://192.168.0.120:8000/static/index/images/3.jpg` }} style={containers(appSettings).background}> 
      <View>
        <ScrollView>
          <View style={containers(appSettings).card}>
            <Text style={containers(appSettings).dear}>Dear client {userObj.firstName} {userObj.lastName}!</Text>
            <Text style={containers(appSettings).sectionTitle}>Profile Details</Text>
            <View style={containers(appSettings).row}>
              <Text style={containers(appSettings).text}>In case you want your profile information </Text>
              <TouchableOpacity style={containers(appSettings).buttonClickHere} onPress={handleClientDetails}>
                <Text style={containers(appSettings).buttonText}>Click here</Text>
              </TouchableOpacity>
            </View>

            <View style={containers(appSettings).row}>
              <Text style={containers(appSettings).sectionTitle}>Welcome to Your Project</Text>
              {projObj && projObj.length > 0 ? (
                projObj.map((project, index) => (
                  <View key={index} style={containers(appSettings).projectItem}>
                    <Text style={containers(appSettings).projectName}>{project.nomp}</Text>
                  </View>
                ))
              ) : (
                <Text style={containers(appSettings).noProjectsText}>No projects available.</Text>
              )}
            </View>

            <View style={containers(appSettings).row}>
              <Text style={containers(appSettings).text}>In case you want your project information </Text>
              <TouchableOpacity style={containers(appSettings).buttonClickHere} onPress={handleProjectDetails}>
                <Text style={containers(appSettings).buttonText}>Click here</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={containers(appSettings).card}>
            <Text style={containers(appSettings).sectionTitle}>About Our Service</Text>
            <Text style={containers(appSettings).text}>{text.split('. ').join('.\n')}</Text>
          </View>

          <View style={containers(appSettings).card}>
            <Text style={containers(appSettings).sectionTitle}>Field Status</Text>
            <TouchableOpacity style={containers(appSettings).button} onPress={handleMap}>
              <Text style={containers(appSettings).buttonText}> Click here </Text>
            </TouchableOpacity>
            <Text style={containers(appSettings).text}>In case you want to see the state of your field in real-time</Text>
            <Text style={containers(appSettings).sectionTitle}>Supervisor contact</Text>
            <Text style={containers(appSettings).text}>If you require further assistance or need to reach out to your supervisor, please find their contact information below:</Text>
            <Text style={containers(appSettings).contactText}>
              <Text style={containers(appSettings).contactLabel}>Name: </Text> 
              {supObj ? `${supObj.firstName} ${supObj.lastName}` : ' N/A'}
            </Text>
            <Text style={containers(appSettings).contactText}>
              <Text style={containers(appSettings).contactLabel}>Phone: </Text> 
              {supObj ? supObj.phone : ' N/A'}
            </Text>
            <Text style={containers(appSettings).contactText}>
              <Text style={containers(appSettings).contactLabel}>Email: </Text> 
              {supObj ? supObj.email : ' N/A'}
            </Text>
          </View>

          <ProjectDetailsModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default Home;
