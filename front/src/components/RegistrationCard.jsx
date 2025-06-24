import Button from "./Button";
import { postRegistration } from "../helpers/post";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useSnackbar } from "../context/SnackProvider";

function RegistrationCard({ itemDate, setItems }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  async function handleRegistration() {
    setLoading(true);

    const response = await postRegistration(itemDate.id, user);

    if (!response.ok) {
      setLoading(false);
      showSnackbar("Registration successful");
      return;
    }

    setItems((prev) => prev.filter((item) => item.id !== response.data.id));
    showSnackbar("Action successful", "success");
    setLoading(false);
  }

  return (
    <>
      <div
        key={itemDate.id}
        className="bg-[#DEB887] m-3 p-3 rounded flex justify-around items-center"
      >
        <div>
          <p>{itemDate.date}</p>
          <p>{itemDate.itemName}</p>
        </div>
        <Button
          buttonType={"registration"}
          onClick={handleRegistration}
          loading={loading}
        >
          {loading ? "Loading ..." : "Register"}
        </Button>
      </div>
    </>
  );
}
export default RegistrationCard;