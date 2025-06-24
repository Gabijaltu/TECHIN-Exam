import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import ItemCreationForm from "../pages/ItemCreationFormPage";

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/${id}`);
        setItem(response.data);
      } catch (err) {
        setError("Failed to load item data.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading item data...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  // ItemCreationForm turi jau atpažinti item propą ir užpildyti laukus
  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5">Edit Item</h2>
      <ItemCreationForm item={item} onSuccess={() => navigate("/")} />
    </div>
  );
};

export default EditItemPage;
