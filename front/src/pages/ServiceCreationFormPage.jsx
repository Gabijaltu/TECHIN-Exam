import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { postService } from "../helpers/post";
import { putService } from "../helpers/update";
import { useNavigate } from "react-router";

const ServiceCreationForm = ({ service }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      address: "",
      manager: "",
    },
  });

  const [masters, setMasters] = useState([]);
  const [newMaster, setNewMaster] = useState({
    name: "",
    surname: "",
    city: "",
  });

  useEffect(() => {
    if (service) {
      setValue("title", service.title);
      setValue("address", service.address);
      setValue("manager", service.manager);
      if (service.masters && service.masters.length > 0) {
        setMasters(service.masters);
      }
    }
  }, [service, setValue]);

  const addMaster = () => {
    if (!newMaster.name.trim() || !newMaster.surname.trim()) {
      setError("Name and surname are required for master");
      return;
    }
    setMasters([...masters, newMaster]);
    setNewMaster({ name: "", surname: "", city: "" });
    setError("");
  };

  const removeMaster = (index) => {
    setMasters(masters.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (masters.length === 0) {
      setError("Please add at least one master");
      return;
    }

    const payload = {
      title: data.title,
      address: data.address,
      manager: data.manager,
      masters,
    };

    try {
      if (!service) {
        await postService(payload);
      } else {
        await putService(service.id, payload);
      }
      navigate("/services");
    } catch (e) {
      setError(e.message || "An error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="input"
          placeholder="Service title"
        />
        <p className="text-red-500">{errors.title?.message}</p>

        <label className="block mb-1 font-semibold mt-4">Address</label>
        <input
          {...register("address", { required: "Address is required" })}
          className="input"
          placeholder="Service address"
        />
        <p className="text-red-500">{errors.address?.message}</p>

        <label className="block mb-1 font-semibold mt-4">Manager</label>
        <input
          {...register("manager", { required: "Manager name is required" })}
          className="input"
          placeholder="Manager"
        />
        <p className="text-red-500">{errors.manager?.message}</p>

        <hr className="my-6" />
        <h3 className="font-semibold mb-2">Masters</h3>

        <div className="grid grid-cols-3 gap-4 mb-2">
          <input
            type="text"
            placeholder="Name *"
            value={newMaster.name}
            onChange={(e) =>
              setNewMaster({ ...newMaster, name: e.target.value })
            }
            className="input"
          />
          <input
            type="text"
            placeholder="Surname *"
            value={newMaster.surname}
            onChange={(e) =>
              setNewMaster({ ...newMaster, surname: e.target.value })
            }
            className="input"
          />
          <input
            type="text"
            placeholder="City"
            value={newMaster.city}
            onChange={(e) =>
              setNewMaster({ ...newMaster, city: e.target.value })
            }
            className="input"
          />
        </div>
        <button
          type="button"
          onClick={addMaster}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Master
        </button>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {masters.length > 0 && (
          <ul className="mb-4 border rounded p-3">
            {masters.map((master, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-1 border-b last:border-0 pb-1"
              >
                <span>
                  {master.name} {master.surname} {master.city && `(${master.city})`}
                </span>
                <button
                  type="button"
                  onClick={() => removeMaster(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800"
        >
          {service ? "Update Service" : "Create Service"}
        </button>
      </form>
    </>
  );
};

export default ServiceCreationForm;
