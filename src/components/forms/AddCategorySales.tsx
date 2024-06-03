import axios from "axios";
import React, { useState } from "react";

const AddCategorySales = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null);

  const toggleForm = () => {
    setFormOpen(!formOpen)
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload csv file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post('http://localhost:3300/api/upload-csv', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log("CSV uploaded successfully", res.data);
      setFormOpen(!formOpen);
    } catch (error) {
      console.error('Error uploading CSV:', error);
    }
  }
  return ( 
    <div className={`add-input ${formOpen ? 'expanded' : ''}`}>
      {formOpen ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button type="submit">Submit csv</button>
            <button onClick={toggleForm}>Cancel</button>
          </form>
        </div>
      ) : (
        <div onClick={toggleForm}>
          <h1 className="click-h1">Add Monthly CSV</h1>
        </div>
      )}
    </div>
   );
}
 
export default AddCategorySales;