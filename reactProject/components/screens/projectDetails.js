import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import { Context } from "../globalContext/globalContext.js";
import LoginIcon from '../../assets/images/misc/login.png';

const formatDate = (dateString) => {
    return dateString.substring(0, 10);
};

const ProjectDetailsModal = ({ visible, onClose }) => {
  const globalContext = useContext(Context);
  const { userObj, projObj } = globalContext;

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <ImageBackground
          source={{ uri: `http://192.168.0.120:8000/static/index/images/3.jpg` }}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.container}>
            <View style={styles.userInfoContainer}>
              <Image source={LoginIcon} style={{ width: 250, height: 250 }} />
              <Text style={styles.title}>Welcome, {userObj.firstName}!</Text>
              <Text style={styles.subtitle}>Here are your project details:</Text>

              {projObj && projObj.length > 0 ? (
                projObj.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailLabel}>Name:</Text>
                      <Text style={styles.userDetailValue}>{project.nomp}</Text>
                    </View>

                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailLabel}>City:</Text>
                      <Text style={styles.userDetailValue}>{project.cityp}</Text>
                    </View>

                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailLabel}>Start Date:</Text>
                      <Text style={styles.userDetailValue}>{formatDate(project.debutp)}</Text>
                    </View>

                    <View style={styles.userDetails}>
                      <Text style={styles.userDetailLabel}>End Date:</Text>
                      <Text style={styles.userDetailValue}>{formatDate(project.finp)}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noProjectsText}>No projects available.</Text>
              )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            </View>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', 
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    width: '100%',  
    maxWidth: 330,  
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  userDetails: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  userDetailLabel: {
    fontWeight: '600',
    color: '#333333',
  },
  userDetailValue: {
    color: '#666666',
  },
  noDataText: {
    fontSize: 18,
    color: '#999999',
    textAlign: 'center',
    marginTop: 40,
  },
  startButton: {
    backgroundColor: '#005B59',
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
    width: '60%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#999',
    borderRadius: 15,
    padding: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default ProjectDetailsModal;
