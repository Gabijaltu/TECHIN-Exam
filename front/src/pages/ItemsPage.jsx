import { useState } from "react";
import Card from "../components/ItemCard";
import { useItemContext } from "../context/ItemContext";

function ItemsPage() {
  const { items, loading, error } = useItemContext();

  const [searchTerm, setSearchTerm] = useState("");

  // Filtruojame items pagal title
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="pt-5 px-3 max-w-[600px] mx-auto">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-5"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 w-full px-3 gap-4">
        {!error && filteredItems.map((item) => <Card item={item} key={item.id} />)}
        {error && <div className="pt-5 text-[2rem] text-center">error</div>}
        {loading && (
          <div className="pt-5 text-[2rem] text-center">loading ...</div>
        )}
      </div>
    </>
  );
}

export default ItemsPage;
