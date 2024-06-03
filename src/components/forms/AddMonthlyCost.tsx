import axios from "axios";
import React, { useState } from "react";

interface MonthlyCostInput {
  name: string
  monthlyCost: number
}

const AddMonthlyCost = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [monthlyCosts, setMonthlyCosts] = useState<MonthlyCostInput[]>([{name: '', monthlyCost: 0}])

  const toggleForm = () => {
    setFormOpen(!formOpen)
  }

  const handleMonthlyCostChange = (index: number, field: string, value: string | number) => {
    const newMonthlyCosts = monthlyCosts.map((monthlyCost, i) => {
      if (index === i) {
        if (field === 'cost' && typeof value === 'string') {
          const parsedValue = parseFloat(value);
          return {...monthlyCost, cost: isNaN(parsedValue) ? 0 : parsedValue}
        }
        return { ...monthlyCost, [field]: value}
      }
      return monthlyCost
    })
    setMonthlyCosts(newMonthlyCosts)
  }

  const AddMonthlyCostInput = () => {
    setMonthlyCosts([...monthlyCosts, {name: '', monthlyCost: 0}])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3300/api/monthly-costs', { monthlyCosts })
      console.log('monthly cost created', res.data);
      setMonthlyCosts([{ name: '', monthlyCost: 0}])
    } catch (error) {
      console.error('Error uploading daily costs:', error);
    }
  }

  return ( 
    <div className={`add-input ${formOpen ? 'expanded' : ''}`}>
      {formOpen ? (
        <form onSubmit={handleSubmit}>
          {monthlyCosts.map((monthlyCost, index) => (
            <div key={index}>
              <input type="text" 
              value={monthlyCost.name}
              onChange={(e) => handleMonthlyCostChange(index, 'name', e.target.value)}
              placeholder="enter name"
              />
              <input type="number"
              value={monthlyCost.monthlyCost}
              onChange={(e) => handleMonthlyCostChange(index, 'monthlyCost', e.target.value)}
              placeholder="enter cost"
               />
            </div>
          ))}
          <button type="button" onClick={AddMonthlyCostInput}><i className="ri-add-circle-fill"></i></button>
          <button type="submit">Submit</button>
          <button onClick={toggleForm}>Cancel</button>
        </form>
      ) : (
        <div onClick={toggleForm}>
          <h1 className="click-h1">Add Monthly Cost</h1>
        </div>
      )}
    </div>
   );
}
 
export default AddMonthlyCost;