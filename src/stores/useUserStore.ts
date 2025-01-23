import { atom, useAtom } from 'jotai';

// === Define Types ===
interface User {
  id: string;
  name: string;
  email: string;
}

// === Base Atoms ===
const userAtom = atom<User | null>(null);

// === Custom Hooks ===
const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const login = async () => {
    // Handle login logic
    // const userData = await apiLogin(email, password);
    const userData: User = {
      id: '1',
      name: 'Test User',
      email: 'email',
    };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
};

export default useUser;
