import { createContext, useContext, useState } from "react";

const SignInModalContext = createContext(null);

export const SignInModalProvider = ({ children }) => {
  // Initial user data could be set here, if available
  const [isVisible, setIsVisible] = useState(false);

  // Function to update user data
  const updateIsVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <SignInModalContext.Provider value={{ isVisible, updateIsVisible }}>
      {children}
    </SignInModalContext.Provider>
  );
};

export const useSignInModal = () => {
  return useContext(SignInModalContext);
};
