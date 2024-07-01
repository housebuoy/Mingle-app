import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  const login = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    await AsyncStorage.setItem('@auth_token', userData.token); // Save the token
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.removeItem('@auth_token'); // Remove the token
  };

  const loadTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token) {
        setIsLoggedIn(true);
        // Optionally, refresh the user object or navigate to the main content of the app
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;