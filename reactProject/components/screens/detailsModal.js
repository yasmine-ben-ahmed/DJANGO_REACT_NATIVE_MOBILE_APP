import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const DetailsModal = ({ visible, onClose, node }) => {
  if (!node) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>{node.title}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.detail}>Position: <Text style={styles.detailValue}>{node.position}</Text></Text>
              <Text style={styles.detail}>Reference: <Text style={styles.detailValue}>{node.reference}</Text></Text>
              <Text style={styles.detail}>Status: <Text style={styles.statusValue}>{node.status}</Text></Text>
            </View>
            <Text style={styles.subtitle}>Data:</Text>
            {node.nodeData.map((data, index) => (
              <View key={index} style={styles.dataContainer}>
                <Text style={styles.dataText}>Humidity: <Text style={styles.dataValue}>{data.humidity}</Text></Text>
                <Text style={styles.dataText}>Rain: <Text style={styles.dataValue}>{data.rain}</Text></Text>
                <Text style={styles.dataText}>Temperature: <Text style={styles.dataValue}>{data.temperature}</Text></Text>
                <Text style={styles.dataText}>Wind: <Text style={styles.dataValue}>{data.wind}</Text></Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  detailValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  statusValue: {
    fontWeight: 'bold',
    color: '#007BFF', 
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#333',
  },
  dataContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  dataText: {
    fontSize: 14,
    marginVertical: 3,
    color: '#555',
  },
  dataValue: {
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#005B59',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 3,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DetailsModal;
