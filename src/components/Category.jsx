import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, deleteCategory, editCategory, fetchCategories } from "../redux/categorySlice";

const Category = () => {

 const dispatch = useDispatch();

 const { categories, loading } = useSelector((state) => state.categories);
 const [category, setCategory] = useState({
  cat_name: "",
  cat_color: ""
 })
 const [isEdit, setIsEdit] = useState(false);
 const [editId, setEditId] = useState(null);

 const handleInputChange = (e) => {
  setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }))
 }

 const handleFormSubmit = async (e) => {
  e.preventDefault();
  console.log(editId)
  if(isEdit) {
   await (dispatch(editCategory({ id: editId, updatedData: category})))
  } else {
     const newCategory = { ...category }
       await dispatch(addCategory(newCategory))
  }
  setCategory({ cat_name: "", cat_color: ""})
  setEditId(null);
  setEditId(false);
  dispatch(fetchCategories())
 }

 const handleDelete = async (id) => {
  await dispatch(deleteCategory(id));
  dispatch(fetchCategories())
 }

 const handleEdit = (data) => {
  setIsEdit(true);
  setEditId(data._id)
  setCategory({
    cat_name: data.cat_name,
    cat_color: data.cat_color
  })
 }

 useEffect(() => {
  dispatch(fetchCategories())
 }, [])

 return (
  <div className="container py-5">
   <div className="card">
    <div className="card-header"><h2>Add Category</h2></div>
    <div className="card-body">
     <form className="row" onSubmit={handleFormSubmit}>
      <div className="col-md-6 mb-3">
       <input
        type="text"
        className="form-control"
        placeholder="Category Name"
        name="cat_name"
        value={category.cat_name}
        onChange={(e) => handleInputChange(e)}
       />
      </div>
      <div className="col-md-3">
       <input
        type="color"
        className="form-control form-control-color"
        name="cat_color"
        value={category.cat_color}
        onChange={(e) => handleInputChange(e)}
       />
      </div>
      <div className="col-md-6 mt-3">
       <button className="btn btn-primary">Add Category</button>
      </div>
     </form>
    </div>
   </div>
   <div className="container py-5">
    <div className="card">
     <div className="card-header"><h2>Categories List</h2></div>
     <div className="card-body">
      <table class="table table-bordered table-striped table-hover">
       <thead class="table-dark">
        <tr>
         <th>#</th>
         <th>Name</th>
         <th>Color</th>
         <th>Action</th>
        </tr>
       </thead>
       <tbody>
        {categories.map((data, index) => (
         <tr key={data._id}>
          <td>{index + 1}</td>
          <td>{data.cat_name}</td>
          <td>{data.cat_color}</td>
          <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(data._id)}>Delete</button> <button className="btn  btn-sm" onClick={() => handleEdit(data)}>Edit</button> </td>
         </tr>
        ))}
       </tbody>
      </table>

     </div>
    </div>
   </div>
  </div>
 )
}

export default Category