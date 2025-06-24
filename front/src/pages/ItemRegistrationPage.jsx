import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { URL } from "../helpers/localhostURL";
import axios from "axios";
import RegistrationCard from "../components/RegistrationCard";
import { useAuth } from "../context/AuthContext";

function ItemRegistrationPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(`${URL}/api/items/${id}`, {
          auth: {
            username: user.username,
            password: user.password,
          },
        });

        setItems(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [id]);

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="grid grid-cols-4">
        {items.map((itemDate) => (
          <RegistrationCard itemDate={itemDate} setItems={setItems} />
        ))}
      </div>
    </>
  );
}

export default ItemRegistrationPage;