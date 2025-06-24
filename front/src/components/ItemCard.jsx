import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { deleteItem } from "../helpers/delete";
import { Link } from "react-router";
import ItemCreationForm from "../pages/ItemCreationFormPage";
import { useItemContext } from "../context/ItemContext";

function Card({ item }) {
  const { user } = useAuth();
  const { removeItem } = useItemContext();

  const items = [
    { label: "Title", value: item.title },
    { label: "Description", value: item.description },
    { label: "City", value: item.city },
    { label: "Price", value: `€${item.price}` },
    { label: "Category", value: item.category },
  ];

  const deleteItemHandler = async () => {
    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (deleteConfirmation) {
      try {
        await deleteItem(item.id);
        removeItem(item.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="m-3 p-2 rounded flex flex-col justify-center items-center bg-[#DEB887] shadow-2xs">
        {items.map((item, index) => (
        <p key={index} className="text-gray-800 text-sm mb-1">
          <strong>{item.label}:</strong> {item.value}
        </p>
        ))}
        {user
          ? user.roles?.includes("ROLE_ADMIN") && (
              <div className="flex">
                <Link to={`/items/${item.id}/edit`}>
  <Button buttonType={"registration"}>Edit</Button>
</Link>

                <Button buttonType={"registration"} onClick={deleteItemHandler}>
                  Delete
                </Button>
              </div>
            )
          : ""}
      </div>
    </>
  );
}

export default Card;
