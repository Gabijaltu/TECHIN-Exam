import { useForm } from "react-hook-form";
import { post } from "../helpers/post";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useItemContext } from "../context/ItemContext";

const ItemCreationForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const [categories, setCategories] = useState([]); // to double check if categories need to be mapped

  const { items } = useItemContext();

  // const categories = [
  //   ...new Set(items.map((item) => item.category).toSorted()),
  // ];

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const data = await get("/categories");
  //       setCategories(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getCategories();
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmitHandler = async (data) => {
    data.dates = data.dates.split(",").map((date) => date.trim());

    try {
      console.log(data);
      await post(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form
        className="pt-5 place-items-center "
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        {/* <label>Category</label> // if category mapping will be required
      <select {...register("category", { required: "Category is required." })}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <p className="text-red-500">{errors.category?.message}</p> */}
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[50vw] "
          placeholder="Trip in Vilnius"
          {...register("name", {
            required: "Please enter the name of the trip.",
            minLength: {
              value: 3,
              message: "Name must contain at least 3 characters.",
            },
            maxLength: {
              value: 100,
              message: "Name can contain a maximum of 100 characters.",
            },
          })}
        />
        <p className="text-red-500">{errors.name?.message}</p>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[50vw]"
          id="category"
          {...register("category", {
            required: "Category is required.",
          })}
        >
          <option label=" "></option>
          {categories.map((category) => {
            return (
              <>
                <option value={category}>{category}</option>
              </>
            );
          })}
        </select>
        <p className="text-red-500">{errors.category?.message}</p>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Image
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[50vw]"
          type="text"
          placeholder="Image URL..."
          {...register("image", {
            required: "Please enter URL of the cover.",
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: "Invalid image URL.",
            },
          })}
        />
        <p className="text-red-500">{errors.image?.message}</p>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Duration
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[50vw]"
          type="text"
          placeholder="1h 30min / 1 day / 10 days / 2 weeks etc.."
          {...register("duration", {
            required: "Please enter the duration.",
          })}
        />
        <p className="text-red-500">{errors.duration?.message}</p>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Price
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[50vw]"
          type="text"
          placeholder="100.00"
          {...register("price", {
            required: "Please enter the price.",
            min: {
              value: 0.01,
              message: "Price cannot be set to a negative number or 0",
            },
            pattern: {
              value: /^[0-9]*\.[0-9][0-9]$/,
              message:
                "Price must be a number (if decimal - max 2 digits after comma).",
            },
          })}
        />
        <p className="text-red-500">{errors.price?.message}</p>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Date(s)
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[50vw]"
          type="text"
          placeholder="Dates..."
          {...register("dates", {
            required: "Please enter the dates",
          })}
        />
        <p>{errors.dates?.message}</p>
        <p className="text-xs text-red-500 pt-1">*all fields are mandatory</p>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        >
          Submit
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default ItemCreationForm;
