import axios from "axios";
import React, { useState } from "react";

interface DailyCostInput {
  name: string
  dailyCost: number 
}
const AddDailyCost = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [dailyCosts, setDailyCosts] = useState<DailyCostInput[]>([{ name: '', dailyCost: '' || 0}])

  const toggleForm = () => {
    setFormOpen(!formOpen)
  }

  const handleDailyCostChange = (index: number, field: string, value: string | number) => {
    const newDailyCosts = dailyCosts.map((dailyCost, i) => {
      if (index === i) {
        if (field === 'cost' && typeof value === 'string') {
          const parsedValue = parseFloat(value);
          return { ...dailyCost, cost: isNaN(parsedValue) ? 0 : parsedValue };
        }
        return { ...dailyCost, [field]: value };
      }
      return dailyCost;
    });
    setDailyCosts(newDailyCosts);
  };

  const addDailyCostInput = () => {
    setDailyCosts([...dailyCosts, { name: '', dailyCost: 0 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3300/api/daily-costs', { dailyCosts });
      console.log('Daily costs created:', res.data);
      setDailyCosts([{ name: '', dailyCost: '' || 0 }]);
    } catch (error) {
      console.error('Error uploading daily costs:', error);
    }
  }
  
  return ( 
    <div className={`add-input ${formOpen ? 'expanded' : ''}`}>
      {formOpen ? (
        <form onSubmit={handleSubmit}>
          {dailyCosts.map((dailyCost, index) => (
            <div key={index}>
              <input type="text"
              id="name"
              value={dailyCost.name}
              onChange={(e) => handleDailyCostChange(index, 'name', e.target.value)} 
              placeholder="Enter Name"
              />
              <input type="number"
              value={dailyCost.dailyCost}
              onChange={(e) => handleDailyCostChange(index, 'dailyCost', e.target.value)}
              placeholder="Enter cost"
          />
            </div>
          ))}
          <button type="button" onClick={addDailyCostInput}><i className="ri-add-circle-fill"></i></button>
          <button type="submit">Submit Daily Costs</button>
          <button onClick={toggleForm}>Cancel</button>
        </form>
      ) : (
        <div onClick={toggleForm}>
          <h1 className="click-h1">Add Daily Cost</h1>
        </div>
      )}
    </div>
   );
}
 
export default AddDailyCost;