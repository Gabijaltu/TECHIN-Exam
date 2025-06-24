import { AuthProvider } from "./AuthContext";
import { ItemProvider } from "./ItemContext";

export function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <ItemProvider>
        {children}
      </ItemProvider>
    </AuthProvider>
  );
}