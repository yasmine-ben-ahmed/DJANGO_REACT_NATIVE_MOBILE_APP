import React, { useState, useEffect, useRef, createContext} from "react";


const Context = createContext()

const Provider = ( { children } ) => {


  const [ domain, setDomain ] = useState("http://192.168.0.120:8000")
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ userObj, setUserObj ] = useState()
  const [ projObj, setProjObj ] = useState()
  const [ supObj, setSupObj ] = useState()
  const [ nodeObj, setNodeObj ] = useState()
  const [ nodeDataObj, setNodeDataObj ] = useState()
  const [ appSettings, setAppSettings ] = useState({})

  const setToken = async (token) => {
    await SecureStore.setItemAsync('token', token);
  }


  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn,
    appSettings,
    setAppSettings,
    userObj,
    setUserObj,
    projObj, 
    setProjObj,
    supObj, 
    setSupObj,
    nodeDataObj, 
    setNodeDataObj,
    nodeObj, 
    setNodeObj,
    setToken,
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };