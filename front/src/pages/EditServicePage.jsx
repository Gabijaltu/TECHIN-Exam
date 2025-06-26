import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import ServiceCreationForm from "./ServiceCreationFormPage.jsx";

const EditServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await api.get(`/services/${id}`);
        setService(serviceResponse.data);
      } catch (err) {
        setError("Failed to load service data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading service data...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5">Edit Service</h2>
      <ServiceCreationForm
        service={service}
        onSuccess={() => navigate("/services")}
      />
    </div>
  );
};

export default EditServicePage;
