import React, { useState } from "react";
import '../../assets/addYear.scss'
import axios from "axios";

const AddYear = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [year, setYear] = useState<string>('');

  const toggleForm = () => {
    setFormOpen(!formOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = axios.post('http://localhost:3300/api/year', { year });
      console.log('Years Created:', response)
      setYear('')
      setFormOpen(false)
    } catch (error) {
      console.error("Didnt work", error)
    }
  }
  return ( 
    <div className={`add-input ${formOpen ? 'expanded' : ''}`}>
      {formOpen ? (
          <form onSubmit={handleSubmit}>
            <h2>Add Year</h2>
                <input
                 type="text"
                 value={year} 
                 onChange={handleChange}
                 placeholder="Enter Year"
                 />
            <button type="submit">Submit Years</button>
            <button onClick={toggleForm}>Cancel</button>
          </form>
        ) : (
          <div onClick={toggleForm}>
            <button className='open-form'>Add Years</button>
          </div>
        )}
        
    </div>
   );
}
 
export default AddYear;