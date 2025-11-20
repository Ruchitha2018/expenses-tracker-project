import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addCategory } from "../redux/categorySlice";

const Category = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState({
        cat_id: "",
        cat_name: "",
        cat_color: ""
    })


    const handleInputChange = (e) => {
        setCategory((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newCategory = { ...category, cat_id: Date.now() }
        dispatch(addCategory(newCategory));
        
    }
    useEffect(() => {
    },[])
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
        </div>
    )
}

export default Category