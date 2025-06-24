import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../helpers/localhostURL";
import Button from "../components/Button";
import { updateStatus } from "../helpers/update";

function RegistrationApproval() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${URL}/api/items/pending`);
        setItems(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, []);

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="grid grid-cols-4">
        {items.map((request) => (
          <div className=" m-3 p-2 flex flex-col bg-[#DEB887]">
            <p>Trip name: {request.itemName}</p>
            <p>Date: {request.itemDate}</p>
            <p>Username: {request.username}</p>
            <p>{request.currentlyBooked}/20</p>
            <Button
              buttonType={"registration"}
              onClick={() => updateStatus(request.registrationId, "APPROVED")}
            >
              Approve
            </Button>
            <Button
              buttonType={"registration"}
              onClick={() => updateStatus(request.registrationId, "REJECTED")}
            >
              Reject
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}

export default RegistrationApproval;
