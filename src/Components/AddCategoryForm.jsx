import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ initialCategoryData, onAddCategory, isEditing }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    {
      value: "income",
      label: "Income",
    },
    {
      value: "expense",
      label: "Expense",
    },
  ];
  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="eg. Salary, Freelance Groceries"
        type="text"
      />
      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="add-btn bg-green-800/70 font-semibold text-white p-2  cursor-pointer rounded flex items-center gap-1"
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="w-4 h-4 animate-spin">
              {isEditing ? "Updating.." : "Adding.."}
            </LoaderCircle>
          ) : (
            <>{isEditing ? "Update" : "Add"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;
