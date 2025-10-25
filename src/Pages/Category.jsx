import { Plus } from "lucide-react";
import Dashboard from "../Components/Dashboard";
import useUser from "../hooks/useUser";
import CategoryList from "../Components/CategoryList";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosconfig";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import AddCategoryForm from "../Components/AddCategoryForm";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("Categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    // check if the category already exits
    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();
    });

    if (isDuplicate) {
      toast.error("Category Name already exits");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORIES, {
        name,
        type,
        icon,
      });
      if (response === 201) {
        toast.success("Category added Successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category", error);
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setEditCategoryModal(true);
    console.log("Editing the Category", categoryToEdit);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;
    if (!name.trim()) {
      toast.error("Category Name is Required");
      return;
    }
    if (!id) {
      toast.error("Category Id is missing for Update");
      return;
    }
    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name,
        type,
        icon,
      });
      setEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully");
      fetchCategoryDetails();
    } catch (error) {
      console.log(
        "Error updating the Category",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to update Category");
    }
  };

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* add button to add category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="add-btn bg-green-800/70 font-semibold text-white p-2  cursor-pointer rounded flex items-center gap-1"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>
        {/* category list  */}
        <CategoryList
          categories={categoryData}
          onEditCategory={handleEditCategory}
        />

        {/* Adding Category Modal */}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* Updating Category modal */}

        <Modal
          isOpen={openEditCategoryModal}
          onClose={() => {
            setEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          title="Update Category"
        >
          <AddCategoryForm
            initialCategoryData={selectedCategory}
            onAddCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
