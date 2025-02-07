/* eslint-disable react-hooks/exhaustive-deps */
import type { UserDTO } from '@dtos';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

interface IJwtInfo {
  token: string | null;
  refreshToken: string | null;
}

// === Base Atoms ===
const userAtom = atom<UserDTO | null>(null);
const jwtInfoAtom = atom<IJwtInfo | null>(null);

// === Custom Hooks ===
const useUserStore = () => {
  const [user, setUser] = useAtom(userAtom);
  const [jwtInfo, setJwtInfo] = useAtom(jwtInfoAtom);
  const token = localStorage.getItem('token') ?? '';
  const refreshToken = localStorage.getItem('refresh_token') ?? '';

  const loginSuccess = (data: IJwtInfo) => {
    setJwtInfo(data);
  };

  const logout = () => {
    setUser(null);
    setJwtInfo(null);
    localStorage.clear();
  };

  useEffect(() => {
    setJwtInfo({
      token,
      refreshToken,
    });
  }, []);

  return {
    user,
    jwtInfo,
    loginSuccess,
    logout,
    setUser,
    isAuthenticated: token ?? !!user?.id,
  };
};

export default useUserStore;
