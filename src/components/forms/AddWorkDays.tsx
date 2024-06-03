import axios from "axios"
import React, { useEffect, useState } from "react"

interface Year {
  id: number
  name: string
}

interface Quarter {
  id: number
  name: string
}

interface Month {
  id: number
  name: string
}



const AddWorkDays = () => {
  const [formOpen, setFormOpen] = useState(false)
  const [years, setYears] = useState<Year[]>([])
  const [quarters, setQuarters] = useState<Quarter[]>([])
  const [months, setMonths] = useState<Month[]>([])
  const [selectedYear, setSelectedYear] = useState<number | "">("")
  const [selectedQuarter, setSelectedQuarter] = useState<number | "">("")
  const [selectedMonth, setSelectdMonth] = useState<number | "">("")
  const [workdays, setWorkdays] = useState<number | ''>('')

  const toggleForm =() => {
    setFormOpen(!formOpen)
  }

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await axios.get('http://localhost:3300/api/years');
        setYears(res.data)
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    }
    fetchYears()
  }, []);

  useEffect(() => {
    const fetchQuarters = async () => {
      try {
        const res = await axios.get(`http://localhost:3300/api/quarters?yearId=${selectedYear}`)
        setQuarters(res.data)
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    }
    fetchQuarters()
  }, [selectedYear])

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const res = await axios.get(`http://localhost:3300/api/months?quarterId=${selectedQuarter}`)
        setMonths(res.data)
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    }
    fetchMonths()
  }, [selectedQuarter])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3300/api/workdays', {
        monthId: selectedMonth,
        days: Number(workdays)
      })
      console.log('Workdays Created', res.data)
      setWorkdays("")
    } catch (error) {
      console.error('Error uploading workdays:', error);
    }
  }
  
  return ( 
    <div className={`add-input ${formOpen ? 'expanded' : ''}`}>
      {formOpen ? (
        <form onSubmit={handleSubmit}>
          <div>
            <select id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}>
              <option value="">Select A Year</option>
              {years.map((year) => (
                <option key={year.id} value={year.id}>{year.name}</option>
              ))}
            </select>
          </div>
          {selectedYear && (
            <div>
              <select id="quarter-select"
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(Number(e.target.value))}>
                <option value="">Select Quarter</option>
                {quarters.map((quarter) => (
                  <option key={quarter.id} value={quarter.id}>{quarter.name}</option>
                ))}
              </select>
            </div>
          )}
          {selectedQuarter && (
            <div>
              <select id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectdMonth(Number(e.target.value))}>
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month.id} value={month.id}>{month.name}</option>
                ))}
              </select>
            </div>
          )}
          {selectedMonth && (
            <div>
              <input type="number" 
              id="workdays-input"
              onChange={(e) => setWorkdays(Number(e.target.value))}
              min='1'
              placeholder="Enter Workdays in this month"
              />
            </div>
          )}

          <button type="submit">Submit</button>
          <button onClick={toggleForm}>Cancel</button>
        </form>
      ) : (
        <div onClick={toggleForm}>
          <h1 className="click-h1">Add Workays in Month</h1>
        </div>
      )}
    </div>
   );
}
 
export default AddWorkDays;