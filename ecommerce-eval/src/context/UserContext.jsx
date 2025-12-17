import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const login = (userData) => {
    // Determine if it's a guest (no password provided) or a regular user
    const isGuest = !userData.password;

    const finalUser = {
        name: userData.name || "Amogh Bajpai",
        email: userData.email,
        // If guest, password is null. If user, use provided or default.
        password: isGuest ? null : (userData.password || "password123"), 
        address: "No address saved.",
        orders: [1, 2, 3], // Mocking 3 previous orders for demonstration
        isGuest: isGuest
    };
    setUser(finalUser);
  };

  const logout = () => {
    setUser(null);
  };

  // Function to update user details and trigger re-render in components
  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);