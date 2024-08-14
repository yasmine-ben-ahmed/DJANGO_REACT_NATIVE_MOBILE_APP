import React, { useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const buttons = (appSettings) => StyleSheet.create({
  login: {
    width: "100%",
    height: 35,
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  landingpage: {
    width: "70%",
    height: 35,
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  skape: {
    width: "20%",
    height: 20,
    backgroundColor: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  }
});

export default buttons;