
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { postMaster } from "../helpers/post";
import { putMaster } from "../helpers/update";
import { useNavigate } from "react-router";

const MasterCreationForm = ({ master }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      specialization: "",
      city: "",
    },
  });

  useEffect(() => {
    if (master) {
      setValue("name", master.name);
      setValue("surname", master.surname);
      setValue("specialization", master.specialization);
      setValue("city", master.city);
    }
  }, [master, setValue]);

  const onSubmit = async (data) => {
    try {
      if (!master) {
        await postMaster(data);
      } else {
        await putMaster(master.id, data);
      }
      navigate("/services");
    } catch (e) {
      setError(e.message || "An error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
        <label>Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="input"
          placeholder="Name"
        />
        <p className="text-red-500">{errors.name?.message}</p>

        <label>Surname</label>
        <input
          {...register("surname", { required: "Surname is required" })}
          className="input"
          placeholder="Surname"
        />
        <p className="text-red-500">{errors.surname?.message}</p>

        <label>Specialization</label>
        <input
          {...register("specialization", { required: "Specialization is required" })}
          className="input"
          placeholder="Specialization"
        />
        <p className="text-red-500">{errors.specialization?.message}</p>

        <label>City</label>
        <input
          {...register("city", { required: "City is required" })}
          className="input"
          placeholder="City"
        />
        <p className="text-red-500">{errors.city?.message}</p>

        <button type="submit" className="btn-primary mt-4 w-full">
          {master ? "Update Master" : "Create Master"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </>
  );
};

export default MasterCreationForm;
