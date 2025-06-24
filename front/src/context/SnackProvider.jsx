import { createContext, useState, useContext } from "react";



const SnackbarContext = createContext({
  showSnackbar: () => {},
});



export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    status: "info",
    message: "",
  });

  const showSnackbar = (message, status) => {
    setSnackbar({ message, status, open: true });

    //Auto hide after 3 seconds
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <Snackbar message={snackbar.message} status={snackbar.status} />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

// Custom Snackbar component using plain CSS
const Snackbar = ({ message, status }) => {
  return (
    <div
      className={`absolute p-8 text-2xl top-0 w-full ${
        status === "success" ? "bg-green-700" : "bg-green-700"
      }`}
    >
      {message}
      {/* <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-white text-2xl"
      >
        &times;
      </button> */}
    </div>
  );
};