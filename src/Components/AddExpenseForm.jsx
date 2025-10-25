import { useState, useEffect } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [expense, setExpense] = useState({
    
    name,
    categoryId: "",
    amount: "",
    date: "",
    icon: "",   });

  useEffect(() => {
    if (categories && categories.length > 0 && !expense.categoryId) {
      setExpense((prev) => ({ ...prev, categoryId: categories[0].id })); // Use categories[0].id for MySQL
    }
  }, [categories, expense.categoryId]);

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value }); // Changed setIncome to setExpense

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: `${cat.name}`,
  }));

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeholder="e.g., Electricity, Wifi"
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 150.00"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn bg-green-800/70 font-semibold text-white p-2  cursor-pointer rounded flex items-center gap-1"
          onClick={() => onAddExpense(expense)}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
