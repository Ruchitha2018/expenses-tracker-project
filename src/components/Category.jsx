import { useEffect, useState } from "react"

const Category = () => {
    const [category, setCategory] = useState({
        cat_id: "",
        cat_name: "",
        cat_color: ""
    })

    const [categoryList, setCategoryList] = useState([]);

    const handleInputChange = (e) => {
        setCategory((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newCategory = { ...category, cat_id: Date.now() }
        console.log(newCategory)
        setCategory({ cat_id: "", cat_name: "", cat_color:""})
        const updatedList = [...categoryList, newCategory];
        localStorage.setItem("categories", JSON.stringify(updatedList))
        setCategoryList(updatedList)
    }
    const loadCategories = () => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategoryList(storedCategories);
    }
    useEffect(() => {
       loadCategories();
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