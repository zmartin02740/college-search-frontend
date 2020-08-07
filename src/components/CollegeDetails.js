import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import Programs from './Programs';

export default ({
  collegeName
}) => {
  const [college, setCollege] = useState({})
  const [degree, setDegree] = useState('')
  const [local, setLocal] = useState('')
  const [campusSetSize, setCampusSetSize] = useState('')

  useEffect(() => {
    fetch(`https://collegesearchbackend.herokuapp.com/ma-schools/${collegeName.split(' ').join('-')}`)
      .then(response => response.json())
      .then(data => setCollege(data))
  }, [])

  useEffect(() => {
    fetch('https://collegesearchbackend.herokuapp.com/fields')
      .then(response => response.json())
      .then(data => {
        data.map(field => {
          // Finding the rows related to campus set size
          const hasExclusively = field.Labels.includes('Exclusively')
          const hasYear = field.Labels.includes('year')
          const hasClassified = field.Labels.includes('classified')

          // Finding the rows related to locale
          const hasCity = field.Labels.includes('City')
          const hasSuburb = field.Labels.includes('Suburb')
          const hasTown = field.Labels.includes('Town')
          const hasRural = field.Labels.includes('Rural')

          if (field.Labels.includes('degree')) {
            if (field.Values === college.HIGHDEG && degree !== field.label) {
              setDegree(field.Labels)
            }
          } else if (hasClassified || hasExclusively || hasYear) {
            if (field.Values === college.CCSIZSET && campusSetSize !== field.label) {
              setCampusSetSize(field.Labels)
            }
          } else if (hasCity || hasSuburb || hasTown || hasRural) {
            if (field.Values === college.LOCALE && local !== field.label) {
              setLocal(field.Labels)
            }
          }
        })
      })
  }, [college])
  let programs;
  if (college.PROGRAMS) {
    programs = college.PROGRAMS.length > 0 ?
      <Programs programs={college.PROGRAMS} /> : <h3>This college currently has no programs - Check back at a later time</h3>;
  }

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <img src="https://via.placeholder.com/200" style={{ margin: '10px 10px 10px 0', borderRadius: 10 }} />
          <div><b>College Name:</b> {college.INSTNM}</div>
          <div><b>College Link:</b> {college.INSTURL}</div>
          <div><b>State:</b> {college.STABBR}</div>
          <div><b>Zip:</b> {college.ZIP}</div>
        </div>
        <div style={{ flex: 1 }}>
          <h2>College Details</h2>
          <div><b>Admission Rate:</b> {college.ADM_RATE} / 1.0</div>
          <div><b>Campus Size Set:</b> {campusSetSize}</div>
          <div><b>City:</b> {college.CITY}</div>
          <div><b>High Degree:</b> {degree}</div>
          <div><b>Latitude:</b> {college.LATITUDE}</div>
          <div><b>Locale:</b> {local}</div>
          <div><b>Longitude:</b> {college.LONGITUDE}</div>
          <div><b>SAT Average:</b> {college.SAT_AVG}</div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        {programs}
      </div>
    </div>

  )
}