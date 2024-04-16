import React, { createContext, useState, useContext } from 'react';

// Create a context
const SubjectContext = createContext();

// Create a provider component
export const SubjectProvider = ({ children }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  
  return (
    <SubjectContext.Provider value={{ selectedSubject, setSelectedSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

// Custom hook to use the subject context
export const useSubject = () => useContext(SubjectContext);
