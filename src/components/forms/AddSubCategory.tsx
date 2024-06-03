import axios from "axios"
import React, { useEffect, useState } from "react"

interface Category {
  name: string
  id: number
}

interface SubCategoryInput {
  name: string,
  categoryId?: number
}


const AddSubCategory = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('')
  const [subCategories, setSubCategories] = useState<SubCategoryInput[]>([{name: ''}])

  const toggleForm = () => {
    setFormOpen(!formOpen)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3300/api/categories');
        setCategories(res.data)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories()
  }, []);

  const handleSubCategoryChange = (index: number, value: string) => {
    const newSubCategories = subCategories.map((subCategory, i) => {
      if (index === i) {
        return { ...subCategory, name: value}
      }
      return subCategory
    })
    setSubCategories(newSubCategories)
  }

  const addSubCategoryInput = () => {
    setSubCategories([...subCategories, { name: ''}])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Select a category")
      return
    }
    try {
      const response = await axios.post('http://localhost:3300/api/sub-categories', {
         subCategories: subCategories.map(subCat => ({
          name: subCat.name,
          categoryId: selectedCategory
        }))
      })
      console.log('sub-categories created', response.data);
      setSubCategories([{ name: ''}])
    } catch (error) {
      console.error('Error uploading subcategories:', error);
    }
    
  }

  return ( 
    <div className={`add-input ${formOpen ? 'expanded' : ''}`}>
      {formOpen ? (
        <form onSubmit={handleSubmit}>
          <h2>Add Sub Category</h2>
          <div>
            <div className="custom-select">
            <select id="category-select"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(Number(e.target.value))}
            >
              <option value="">Select a Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            </div>
          </div>

          {subCategories.map((subCategory, index) => (
            <div key={index}>
              <input type="text" 
              value={subCategory.name}
              onChange={(e) => handleSubCategoryChange(index, e.target.value)}
              placeholder="Enter Sub-Category Name"
              />
            </div>
          ))}

          <button type="button" onClick={addSubCategoryInput}><i className="ri-add-circle-fill"></i></button>
          <button type="submit">Submit Sub-Categories</button>
          <button onClick={toggleForm}>Cancel</button>
        </form>
      ) : (
        <div onClick={toggleForm}>
          <h1 className="click-h1">Add Sub-Categories</h1>
        </div>
      )}
    </div>
   );
}
 
export default AddSubCategory;