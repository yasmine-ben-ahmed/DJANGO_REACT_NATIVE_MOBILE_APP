import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import MapView, { Polygon, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import { Context } from "../globalContext/globalContext.js";
import DetailsModal from './DetailsModal.js';
import containers from "../styles/containers.js";
//import * as SMS from 'expo-sms';

const Map = () => {
  const globalContext = useContext(Context);
  const { projObj, nodeObj, nodeDataObj, userObj, domain,appSettings } = globalContext;

  const project = projObj[0];
  const geomp = project.geomp;

  const multipolygonStr = geomp.match(/MULTIPOLYGON \(\((.*?)\)\)/)[1];
  const polygons = multipolygonStr.split(/\), \(/g);
  const cleanedPolygons = polygons.map(polygon => polygon.replace(/^\(|\)$/g, ''));

  const polygonCoordinates = cleanedPolygons.map(polygon =>
    polygon
      .split(', ')
      .map(coord => {
        const [longitude, latitude] = coord.split(' ').map(Number);
        return { latitude, longitude };
      })
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "DOWN":
        return "#4CAF50"; 
      case "MODERATE":
        return "#2196F3"; 
      case "HIGH":
        return "#FFEB3B"; 
      case "VERY HIGH":
        return "#FFC107"; 
      case "EXTREME":
        return "#F44336"; 
      default:
        return "#9E9E9E"; 
    }
  };

  const getPolygonColorByNodes = (polygonCoords) => {
    let statusSet = new Set();
    nodeObj.forEach(node => {
      const nodeLatLng = { latitude: parseFloat(node.latitude), longitude: parseFloat(node.longitude) };
      if (isPointInPolygon(nodeLatLng, polygonCoords)) {
        statusSet.add(node.status);
      }
    });
    // Determine color based on the status set
    if (statusSet.has("EXTREME")) return "rgba(244, 67, 54, 0.7)"; // Deep red with 70% opacity
    if (statusSet.has("VERY HIGH")) return "rgba(255, 193, 7, 0.6)"; // Warm orange with 60% opacity
    if (statusSet.has("HIGH")) return "rgba(255, 235, 59, 0.6)"; // Gentle yellow with 60% opacity
    if (statusSet.has("MODERATE")) return "rgba(33, 150, 243, 0.6)"; // Calming blue with 60% opacity
    if (statusSet.has("DOWN")) return "rgba(76, 175, 80, 0.6)"; // Soft green with 60% opacity
    return "rgba(158, 158, 158, 0.6)"; // Neutral gray with 60% opacity
  };

  const isPointInPolygon = (point, polygon) => {
    const { latitude, longitude } = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const { latitude: yi, longitude: xi } = polygon[i];
      const { latitude: yj, longitude: xj } = polygon[j];
      const intersect = ((yi > latitude) !== (yj > latitude)) && (longitude < (xj - xi) * (latitude - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const markers = nodeObj.map(node => ({
    latitude: parseFloat(node.latitude),
    longitude: parseFloat(node.longitude),
    title: node.nom,
    position: `Lat: ${node.latitude}, Lon: ${node.longitude}`,
    reference: node.reference,
    status: node.status,
    nodeData: nodeDataObj.filter(data => data.node === node.nom),
  }));

  const mapRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLocatePress = (latitude, longitude) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
    };
  
  const handleDetailsPress = (node) => {
    setSelectedNode(node);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={containers(appSettings).cardMap}>
      <Text style={containers(appSettings).cardTitle}>{item.title}</Text>
      <Text style={containers(appSettings).cardText}>Reference: {item.reference}</Text>
      <Text style={containers(appSettings).cardText}>Position: {item.position}</Text>
      <View style={containers(appSettings).buttonContainer}>
        <TouchableOpacity
          style={[containers(appSettings).buttonMap, containers(appSettings).locateButton]}
          onPress={() => handleLocatePress(item.latitude, item.longitude)}
        >
          <Text style={containers(appSettings).buttonTextMap}>Locate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[containers(appSettings).buttonMap, containers(appSettings).detailsButton]}
          onPress={() => handleDetailsPress(item)}
        >
          <Text style={containers(appSettings).buttonTextMap}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


/*   const sendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const phoneNumber = `+216${userObj.phone}`; // Assuming the phone number needs the country code
      const { result } = await SMS.sendSMSAsync(
        [phoneNumber], // Use the phone number from userObj
        'Alert: The status is EXTREME and it may provoke a fire.'
      );
      console.log(result);
    } else {
      Alert.alert('SMS is not available on this device.');
    }
  }; */


  const sendAlertEmail = async (node) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 20000));
      
      const body = JSON.stringify({
        client_id: userObj.id,  
      });
  
      const response = await fetch(`${domain}/api/send-email-alert/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,  
      });
  
      if (response.ok) {
        console.log('!! Alert email sent successfully');
      } else {
        console.log('Failed to send alert email');
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error sending alert email:', error.message);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      const extremeNode = nodeObj.find(node => node.status === "EXTREME");
      if (extremeNode) {
        sendAlertEmail(extremeNode);
        Alert.alert(
          "Fire Alert",
          `Extreme status detected at node ${extremeNode.nom}. Immediate action is required!`,
          [
            { text: 'OK'/* , onPress: () => sendSMS() */ },
          ],
          { cancelable: false }
        );
        
      }
    }, [nodeObj])
  );

  return (
    <View style={containers(appSettings).containerMap}>
      <MapView
        ref={mapRef}
        style={containers(appSettings).map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.253342,
          longitude: 9.931675,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {polygonCoordinates.map((coords, index) => (
          <Polygon
            key={index}
            coordinates={coords}
            strokeColor="black"
            fillColor={getPolygonColorByNodes(coords)}
            strokeWidth={0.7}
          />
        ))}

        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            icon={require('../../assets/images/misc/black_marker.png')}
            title={marker.title}
          >
            <Callout>
              <View style={containers(appSettings).calloutContainer}>
                <Text style={containers(appSettings).calloutTitle}>{marker.title}</Text>
                <Text>Position: {marker.position}</Text>
                <Text>Reference: {marker.reference}</Text>
                <View style={[containers(appSettings).statusContainer, { backgroundColor: getStatusColor(marker.status) }]}>
                  <Text style={containers(appSettings).statusText}>{marker.status}</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={containers(appSettings).cardContainer}>
        <FlatList
          data={markers}
          renderItem={renderItem}
          keyExtractor={(item) => item.reference}
        />
      </View>
      <DetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        node={selectedNode}
      />
    </View>
  );
};

export default Map;
