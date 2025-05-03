import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react'
import './Device.css'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import MainChart from './MainChart'
import MainChart2 from './MainChart2'

const Devices = () => {
  const [activeItem, setActiveItem] = useState(null)
  const Navigate = useNavigate()

  const handleAccordionClick = (key) => {
    console.log(`Clicked Item Key: ${key}`)
    setActiveItem((prevKey) => (prevKey === key ? null : key)) // Toggle active item
  }

  const handlePlantRecommendation = (device) => {
    console.log(`Plant recommendation for ${device}`)
    Navigate(`/devices/AIAnalysis`, { state: { deviceId: device } })
  }

  const device1graph = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const [parsedData, setParsedData] = useState([])

  const fetchLightValues = async (device) => {
    try {
      const response = await fetch(`/api/light_values/${device}`, {
        mode: 'no-cors',
      })
      if (!response.ok) {
        console.log('Response:', response)
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const textData = await response.text() // Read the response as plain text
      console.log('Raw Text Data:', textData)
      const data = textData
        .split('\n') // Split the text by newlines
        .filter((line) => line.trim() !== '') // Remove empty lines
        .map((line) => JSON.parse(line)) // Parse each line as JSON

      // console.log('Light Values:', data)
      return data // Return the parsed array of objects
    } catch (error) {
      console.error('Failed to fetch light values:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchLightValues(activeItem)
      if (data) {
        // console.log('Fetched Light Values:', data)

        //parse
        const parsedData = data[0].map((row) => {
          // console.log('Row:', row)
          const time = new Date(row.time.$date) // Convert timestamp to Date object
          const luxValue = row.luxValue
          const deviceId = row.deviceId

          console.log('Parsed Row:', { time, luxValue, deviceId })

          // Return parsed object
          return { time, luxValue, deviceId }
        })
        setParsedData(parsedData) // Set the parsed data to state
        console.log('Parsed Data:', parsedData)
      }
    }
    fetchData()
  }, [activeItem])

  return (
    <div className="device-list">
      <h2>Select a device to analyze</h2>
      <CAccordion activeItemKey={null}>
        <CAccordionItem itemKey={1} className="device-li">
          <CAccordionHeader onClick={() => handleAccordionClick(1)}>Device 1</CAccordionHeader>
          <CAccordionBody className="accordion-body">
            <h6>Plant recommendation based on AI analysis </h6>
            <button className="plant-button" onClick={() => handlePlantRecommendation(1)}>
              Recommend a plant
            </button>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={2}>
          <CAccordionHeader onClick={() => handleAccordionClick(2)}>Device 2</CAccordionHeader>
          <CAccordionBody className="accordion-body">
            <h6>Plant recommendation based on AI analysis </h6>
            <button className="plant-button" onClick={() => handlePlantRecommendation(2)}>
              Recommend a plant
            </button>
          </CAccordionBody>
        </CAccordionItem>
        <CAccordionItem itemKey={3}>
          <CAccordionHeader onClick={() => handleAccordionClick(3)}>Device 3</CAccordionHeader>
          <CAccordionBody className="accordion-body">
            <h6>Plant recommendation based on AI analysis </h6>
            <button className="plant-button" onClick={() => handlePlantRecommendation(3)}>
              Recommend a plant
            </button>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      {/* Render Device 1 info*/}
      {activeItem === 1 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Device 1 Statistics</h4>
          <CRow>
            {device1graph.map((item, index) => (
              <CCol key={index} xs={12} sm={6} lg={4}>
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
          {/* Render MainChart */}
          <div style={{ marginTop: '20px' }}>
            <MainChart data={parsedData} />
          </div>
        </div>
      )}

      {/* Render Device 2 info*/}
      {activeItem === 2 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Device 2 Statistics</h4>
          <CRow>
            {device1graph.map((item, index) => (
              <CCol key={index} xs={12} sm={6} lg={4}>
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
          {/* Render MainChart */}
          <div style={{ marginTop: '20px' }}>
            <MainChart data={parsedData} />
          </div>
        </div>
      )}

      {/* Render Device 3 info*/}
      {activeItem === 3 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Device 3 Statistics</h4>
          <CRow>
            {device1graph.map((item, index) => (
              <CCol key={index} xs={12} sm={6} lg={4}>
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
          {/* Render MainChart */}
          <div style={{ marginTop: '20px' }}>
            <MainChart data={parsedData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Devices
