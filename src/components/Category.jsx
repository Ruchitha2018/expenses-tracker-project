import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory, editCategory, fetchCategories } from "../redux/categorySlice";
import { toast } from "react-toastify";

const Category = () => {

  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const [category, setCategory] = useState({
    cat_name: "",
    cat_color: ""
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await dispatch(editCategory({ id: editId, updatedData: category }));
      toast.success("Category updated successfully")
    } else {
      await dispatch(addCategory({ ...category }));
      toast.success("Category Added Successfully")
    }

    setCategory({ cat_name: "", cat_color: "" });
    setEditId(null);
    setIsEdit(false);

    dispatch(fetchCategories());
  };

  const handleDelete = async (id) => {
    await dispatch(deleteCategory(id));
    toast.error("Category deleted")
    dispatch(fetchCategories());

  };

  const handleEdit = (data) => {
    setIsEdit(true);
    setEditId(data._id);
    setCategory({
      cat_name: data.cat_name,
      cat_color: data.cat_color
    });
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (

    <div className="container py-4">

      <div className="card shadow border-0 mb-5">
        <div className="card-header bg-white border-0 pt-4 pb-0">
          <h3 className="fw-bold">
            <i className="bi bi-folder-plus me-2"></i>
            {isEdit ? "Edit Category" : "Add Category"}
          </h3>
        </div>

        <div className="card-body p-4">
          <form className="row g-4" onSubmit={handleFormSubmit}>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Category Name</label>
              <input
                type="text"
                name="cat_name"
                value={category.cat_name}
                onChange={handleInputChange}
                placeholder="Enter category name"
                className="form-control form-control-lg shadow-sm"
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Color</label>
              <input
                type="color"
                name="cat_color"
                value={category.cat_color}
                onChange={handleInputChange}
                className="form-control form-control-color form-control-lg shadow-sm"
                required
              />
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button className={`btn btn-lg w-100 ${isEdit ? "btn-warning" : "btn-primary"}`}>
                <i className={`bi ${isEdit ? "bi-pencil-square" : "bi-plus-circle"} me-2`}></i>
                {isEdit ? "Update Category" : "Add Category"}
              </button>
            </div>

          </form>
        </div>
      </div>

      <div className="card shadow border-0">
        <div className="card-header bg-white border-0 pt-4 pb-0">
          <h3 className="fw-bold"><i className="bi bi-card-list me-2"></i>Categories List</h3>
        </div>

        <div className="card-body p-4">

          {loading && <p>Loading...</p>}

          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Color</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.length === 0 ? (<tr>
                <td colSpan="4" className="text-center py-4 fw-semibold text-muted">
                  <i className="bi bi-folder-x fs-4 d-block mb-2"></i>
                  No categories found
                </td>
              </tr>) : (categories.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>

                  <td className="fw-semibold">{data.cat_name}</td>

                  <td>
                    <span className="badge rounded-pill px-3 py-2"
                      style={{
                        background: data.cat_color,
                        color: "#fff",
                        border: "1px solid #ddd"
                      }}>
                      {data.cat_color}
                    </span>
                  </td>

                  <td className="text-center">

                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDelete(data._id)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(data)}
                    >
                      <i className="bi bi-pencil-square me-1"></i> Edit
                    </button>

                  </td>
                </tr>
              )))}
            </tbody>

          </table>

        </div>
      </div>

    </div>

  );
};

export default Category;
