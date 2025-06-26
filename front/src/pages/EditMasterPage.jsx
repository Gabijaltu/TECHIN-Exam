import { useForm } from "react-hook-form";
import { useState } from "react";

const MasterEditForm = ({ master, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: master?.name || "",
      surname: master?.surname || "",
      specialization: master?.specialization || "",
      city: master?.city || "",
    },
  });

  const [error, setError] = useState("");

  const submitHandler = async (data) => {
    try {
      await onSubmit(data);
    } catch (e) {
      setError(e.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="max-w-md mx-auto p-4">
      <label className="block mb-1 font-semibold">Name</label>
      <input
        {...register("name", { required: "Name is required" })}
        className="input"
        placeholder="Name"
      />
      <p className="text-red-500">{errors.name?.message}</p>

      <label className="block mb-1 font-semibold mt-4">Surname</label>
      <input
        {...register("surname", { required: "Surname is required" })}
        className="input"
        placeholder="Surname"
      />
      <p className="text-red-500">{errors.surname?.message}</p>

      <label className="block mb-1 font-semibold mt-4">Specialization</label>
      <input
        {...register("specialization", { required: "Specialization is required" })}
        className="input"
        placeholder="Specialization"
      />
      <p className="text-red-500">{errors.specialization?.message}</p>

      <label className="block mb-1 font-semibold mt-4">City</label>
      <input
        {...register("city", { required: "City is required" })}
        className="input"
        placeholder="City"
      />
      <p className="text-red-500">{errors.city?.message}</p>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default MasterEditForm;
