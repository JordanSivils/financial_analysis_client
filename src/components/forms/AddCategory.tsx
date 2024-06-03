import React, { useState } from "react";
import '../../assets/addYear.scss'
import axios from "axios";

interface CategoryInput {
  name: string
}

const AddCategory = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryInput[]>([{ name: ''}])

  const toggleForm = () => {
    setFormOpen(!formOpen)
  }

  const handleCategoryChange = (index: number, value: string) => {
    const newCategories = categories.map((category, i) => {
      if (index === i) {
        return { ...category, name: value}
      }
      return category
    })
    setCategories(newCategories)
  };

  const addCategoryInput = () => {
    setCategories([...categories, {name: ''}])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3300/api/categories', { categories })
      console.log('server res', res.data)
    } catch (error) {
      console.error('Error uploading categories:', error);
    }
  }


  return ( 
    <div className={`add-input ${formOpen ? 'expanded' : ''}`}>
      {formOpen ? (
        <form onSubmit={handleSubmit}>
          {categories.map((category, index) => (
          <div key={index}>
            <input 
            type="text" 
            value={category.name}
            onChange={(e) => handleCategoryChange(index, e.target.value)}
            placeholder="Enter Category"/>
          </div>
        ))}
        <button type="button" onClick={addCategoryInput}><i className="ri-add-circle-fill"></i></button>
        <button type="submit">Submit</button>
        <button onClick={toggleForm}>Cancel</button>
        </form>
      ) : (
        <div onClick={toggleForm}>
          <h1 className="click-h1">Add Categories</h1>
        </div>
      )}
    </div>
   );
}
 
export default AddCategory;