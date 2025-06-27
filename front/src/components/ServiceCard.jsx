import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { deleteItem } from "../helpers/delete";
import { Link } from "react-router-dom";
import { useServiceContext } from "../context/ServiceContext";

function Card({ service }) {
  const { user } = useAuth();
  const { removeService } = useServiceContext();

  const ads = [
    { label: "Title", value: service.title },
    { label: "Address", value: service.address },
    { label: "Manager", value: service.manager },
  ];

  const deleteServiceHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      try {
        await deleteItem(service.id);
        removeService(service.id);
      } catch (error) {
        console.error("Failed to delete service:", error);
      }
    }
  };

  return (
    <div className="m-3 p-4 rounded flex flex-col justify-center items-start bg-[#DEB887] shadow-2xs max-w-md w-full">
      {ads.map((ad, index) => (
        <p key={index} className="text-gray-800 text-sm mb-1">
          <strong>{ad.label}:</strong> {ad.value}
        </p>
      ))}
      {service.masters && service.masters.length > 0 && (
        <div className="mt-3 w-full">
          <strong className="block mb-1">Masters:</strong>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            {service.masters.map((master, index) => (
              <li key={index}>
                {master.name} {master.surname} {master.city ? `(${master.city})` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {user?.roles?.includes("ROLE_ADMIN") && (
        <div className="flex gap-2 mt-4 w-full">
          <Link to={`/services/${service.id}/edit`}>
            <Button buttonType="registration">Edit Service</Button>
          </Link>
          <Button buttonType="registration" onClick={deleteServiceHandler}>
            Delete Service
          </Button>
        </div>
      )}
    </div>
  );
}

export default Card;
