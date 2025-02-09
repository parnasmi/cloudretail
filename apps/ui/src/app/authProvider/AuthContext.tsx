import { api } from '@/shared/api/api';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  use,
  useState,
} from 'react';

type StatePair<T> = {
  value: T;
  setValue: Dispatch<React.SetStateAction<T>>;
};

type Token = Awaited<ReturnType<typeof api.createToken>> | null;

const AuthContext = createContext<StatePair<Token>>({
  value: null,
  setValue: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<Token>(null);

  return (
    <AuthContext.Provider value={{ value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }

  return context;
};
