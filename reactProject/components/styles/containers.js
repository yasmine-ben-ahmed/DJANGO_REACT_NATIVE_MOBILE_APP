import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const containers = (appSettings) => StyleSheet.create({

  outerPage: {
    backgroundColor: ("backgroundColor" in appSettings)? appSettings['backgroundColor'] : "#00AAA3",
    color: ("foregroundColor" in appSettings)? appSettings['foregroundColor'] : "#000000",
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    margin: 0
  },

  formBox: {
    width: "80%",
    height: "60%",
    backgroundColor: "#00AAA3",
    margin: 0,
    borderRadius: 15,
    padding: "6%",
  },

  /* ***************** welcome.js ******************* */

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  thankYouText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
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
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

    /* ***************** home.js ******************* */
    
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 14,
      color: '#333',
      marginBottom:20,
    },
    dear: {
      color: '#005B59',
      fontSize: 23,
      fontWeight: 'bold',
      width: '100%',
      marginBottom: 30,
      paddingBottom: 0,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f9f9f9',
    },
  
    status: {
      color: '#666',
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#EEFCFB',
      borderRadius: 10,
      padding: 15,
      margin: 15,
      elevation: 3,  // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginRight:20,
      color: '#654280',
    },
    buttonClickHere: {
      backgroundColor: '#654280',
      width: 75 ,
      borderRadius: 10,
      marginBottom:20,
      
    },
    button: {
      backgroundColor: '#654280',
      width: 75 ,
      borderRadius: 10,
      margin:5
    },
    buttonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center',
    },
    projectItem: {
      marginBottom: 10,
    },
    projectName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF6DB2',
    },
    description: {
      fontSize: 16,
      color: '#666',
    },
    contactText: {
      fontSize: 16,
      color: '#444',
      marginBottom: 5,
    },
    contactLabel: {
      fontWeight: 'bold',
      color: '#000',
    },
    noProjectsText: {
      fontSize: 12,
      color: '#999',
      marginBottom: 6,
    },

      /* ***************** profile.js ******************* */
      backgroundImage: {
        opacity: 1,  
      },
      containerProfile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
      },
      userInfoContainer: {
        backgroundColor: '#E7FEFE',
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
        maxWidth: 400,
      },
      profileImage: {
        width: 220,
        height: 220,
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

      editButton: {
        flexDirection: 'row', // Align items in a row
        alignItems: 'center', // Center items vertically
        marginTop: 20,
        backgroundColor: '#005B59',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        elevation: 3,
      },
      editButtonText: {
        color: '#fff',
        marginLeft: 10,
      },

      inputRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10, 
      },
      label: {
        fontSize: 16,
        marginRight: 10, 
        width: '30%', 
      },
      input: {
        flex: 1, 
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        borderRadius: 5,
        color:'#999'
      },

        /* ***************** forgotpassword.js ******************* */
        iconContainer: {
          borderRadius: 100, 
          width: 160, 
          height: 160, 
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3, 
          borderColor: '#fff',
          marginTop: 50 
        },

          /* ***************** map.js ******************* */

          containerMap: {
            flex: 1,
          },
          map: {
            flex: 1,
          },
          calloutContainer: {
            width: 180,
            padding: 5,
          },
          calloutTitle: {
            fontWeight: 'bold',
            marginBottom: 5,
          },
          statusContainer: {
            padding: 5,
            borderRadius: 4,
            alignItems: 'center',
          },
          statusText: {
            color: 'white',
            fontWeight: 'bold',
          },
          cardContainer: {
            height: 320,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            paddingBottom: 10,
          },
          cardMap: {
            padding: 15,
            margin: 10,
            borderRadius: 8,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#ddd',
          },
          cardTitle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          cardText: {
            fontSize: 14,
          },
          buttonContainer: {
            flexDirection: 'row',
            marginTop: 10,
          },
          buttonMap: {
            flex: 1,
            borderRadius: 20,
            margin: 5,
            padding: 10,
            alignItems: 'center',
          },
          locateButton: {
            backgroundColor: '#95B1AF',
          },
          detailsButton: {
            backgroundColor: '#324B4A',
          },
          buttonTextMap: {
            color: 'white',
            fontWeight: 'bold',
          },

});


export const headerStyle = {
  headerShown: true,
  headerStyle: { backgroundColor: '#00AAA3' },
  headerTintColor: 'white',
  headerTitle: '',
};

export const headerHome = {
  headerShown: true,
  headerStyle: { backgroundColor: '#005B59' },
  headerTintColor: 'white',
  headerTitle: '',
};

export const backButton = (navigation) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 10 }}>
      <Ionicons name="chevron-back" size={24} color="white" />
    </TouchableOpacity>
  ),
});



export default containers;
