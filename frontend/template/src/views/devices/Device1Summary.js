import React, { useState, useEffect } from 'react'
import './Device1Summary.css'
import { useLocation } from 'react-router-dom'

const Device1Summary = () => {
  const [selectedPlantType, setSelectedPlantType] = useState('Plant Type ▼')
  const [selectedWateringFrequency, setSelectedWateringFrequency] = useState('Watering Frequency ▼')
  const [result, setResult] = useState('Thinking hard...')

  const [showBox, setShowBox] = useState(false)

  const location = useLocation()
  const { deviceId } = location.state || {}
  console.log('Device ID:', deviceId)

  const handlePlantTypeSelect = (type) => {
    setSelectedPlantType(type)
  }

  const handleWateringFrequencySelect = (frequency) => {
    setSelectedWateringFrequency(frequency)
  }

  const handleAnalyze = async () => {
    setShowBox(true)

    try {
      // Construct the API URL with the required parameters
      const response = await fetch(
        `/api/generate/${deviceId}/${selectedPlantType}/${selectedWateringFrequency}`,
        {
          method: 'GET',
        },
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      // Parse the response
      const data = await response.text() // Assuming the API returns plain text
      console.log('API Response:', data)

      // Update the result state with the fetched data
      setResult(data)
    } catch (error) {
      console.error('Failed to fetch analysis:', error)
      setResult('Failed to fetch analysis. Please try again.')
    }
  }

  return (
    <div>
      {/* Horizontal Navigation */}
      <nav className="horizontal-nav">
        <div className="nav-left">
          <span className="device-title">Plant Filtering Options</span>
        </div>
        <div className="nav-right">
          <div className="dropdown">
            <button className="dropdown-button">{selectedPlantType}</button>
            <div className="dropdown-content">
              <button onClick={() => handlePlantTypeSelect('Any')}>Any</button>
              <button onClick={() => handlePlantTypeSelect('Fruits')}>Fruits</button>
              <button onClick={() => handlePlantTypeSelect('Vegetables')}>Vegetables</button>
              <button onClick={() => handlePlantTypeSelect('Flowers')}>Flowers</button>
              <button onClick={() => handlePlantTypeSelect('Decorative')}>Decorative</button>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-button">{selectedWateringFrequency}</button>
            <div className="dropdown-content">
              <button onClick={() => handleWateringFrequencySelect('Daily')}>Daily</button>
              <button onClick={() => handleWateringFrequencySelect('A few times per week')}>
                A few times per week
              </button>
              <button onClick={() => handleWateringFrequencySelect('Every few weeks')}>
                Every few weeks
              </button>
              <button onClick={() => handleWateringFrequencySelect('Rarely')}>Rarely</button>
            </div>
            <button className="submit-button" onClick={() => handleAnalyze()}>
              Analyze
            </button>
          </div>
        </div>
      </nav>
      {/* Content
      <div className="content">
        <h1>Device 1 Summary</h1>
        <p>Welcome to the summary page for Device 1.</p>
      </div> */}
      {showBox && (
        <div className="result-box">
          <h3>Results for Device {deviceId}</h3>
          <h5>Powered by Google Gemini</h5>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

export default Device1Summary
