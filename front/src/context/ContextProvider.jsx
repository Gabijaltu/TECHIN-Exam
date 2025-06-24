import { AuthProvider } from "./AuthContext";
import { ItemProvider } from "./ItemContext";
import { SnackbarProvider } from "./SnackProvider";

export function ContextProvider({ children }) {
  return (
    <AuthProvider>
      <ItemProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ItemProvider>
    </AuthProvider>
  );
}