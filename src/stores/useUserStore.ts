import { atom, useAtom } from 'jotai';

// === Define Types ===
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'email',
  role: 'ADMIN',
};

// === Base Atoms ===
const userAtom = atom<User | null>(mockUser);

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
      role: 'ADMIN',
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
