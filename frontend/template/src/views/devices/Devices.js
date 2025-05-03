import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react'

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

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
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
    Navigate(`/devices/${device}/AIAnalysis`, { state: { deviceId: device } })
  }

  const device1graph = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  return (
    <div className="device-list">
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
            <MainChart />
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
            <MainChart />
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
            <MainChart2 />
          </div>
        </div>
      )}
    </div>
  )
}

export default Devices
