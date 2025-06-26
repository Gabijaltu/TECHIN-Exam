import { AuthProvider } from "./AuthContext";
import { ServiceProvider } from "./ServiceContext";

export function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <ServiceProvider>
      {children}
      </ServiceProvider>
    </AuthProvider>
  );
}
