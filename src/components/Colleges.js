import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import College from '../components/College';

export default ({ searchRequest, setCount, count }) => {
  const DEFAULT_PAGE_SIZE = 20
  const [page, setPage] = useState({ minValue: 0, maxValue: 20 })
  const [details, setDetails] = useState({})
  const [collegeAr, setCollegeAr] = useState([])
  const [collegeDistance, setCollegeDistance] = useState([])
  const geoAPI = '0f761a30-fe14-11e9-b59f-e53803842572'
  const distanceAPI = 'cjRUJv9FlqixdOy8H1qvcuedhI0Tsz3LSKMc1rbzyGOjLn24YCwQmNHKhjOjAzYK'

  useEffect(() => {
    Promise.all([
      fetch(`https://geolocation-db.com/json/${geoAPI}`),
      fetch('https://collegesearchbackend.herokuapp.com//ma-schools')
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setDetails(data1)
        setCollegeAr(data2)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const getDistances = async () => {
      if (collegeAr.length > 0) {
        let locations = []
        for (let college of collegeAr) {
          const location = college;
          if (college.LATITUDE !== 'NULL' && college.LONGITUDE !== 'NULL' && details.latitude !== 'NULL' && details.longitude !== 'NULL') {
            try {
              const resp = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${college.LATITUDE},${college.LONGITUDE}|${details.latitude},${details.longitude}&mode=drive&apiKey=e896165d48e04b69896a436a1d5d929c`)
              const data = await resp.json()
              location.distance = data.features[0].properties.distance
              locations.push(location)
            } catch (e) {
              console.error(e)
            }
          } else {
            location.distance = 1000000
            locations.push(location)
          }
        }
        locations = locations.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
        console.log(locations)
        setCollegeDistance(locations)
      }
    }
    getDistances()
  }, [collegeAr])

  let filteredCollege = []

  const lowerCaseSearch = searchRequest.toLowerCase();
  const handlePagination = (value) => {
    setPage({
      ...page,
      minValue: (value - 1) * DEFAULT_PAGE_SIZE,
      maxValue: value * DEFAULT_PAGE_SIZE
    })
  }

  if (collegeDistance.length > 0) {
    filteredCollege = collegeDistance && collegeDistance.sort((a, b) => {
      return a.distance < b.distance
    }).filter(college => {
      if (searchRequest !== '') {
        return college.INSTNM.toLowerCase().includes(lowerCaseSearch) ||
          college.CITY.toLowerCase().includes(lowerCaseSearch)
      } else {
        return college
      }
    }).map(college => {
      return college
    })
  }

  let currentPageColleges = filteredCollege.slice(page.minValue, page.maxValue).map((college, index) => {
    return <College key={index} college={college} />
  })

  useEffect(() => {
    setCount(filteredCollege.length)
  }, [filteredCollege])

  useEffect(() => {
    setPage({
      ...page,
      minValue: 0,
      maxValue: 20
    })
  }, [count])


  return (
    <div>
      <h2>List of Colleges</h2>
      {details.city && collegeDistance.length > 0 ? <h4>Here are MA colleges closest to {details.city}...</h4> : null}
      <div style={{ marginBottom: 20 }}>
        {collegeDistance.length > 0 ? currentPageColleges : <center><div>Loading, may take a min...</div></center>}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          onChange={handlePagination}
          total={filteredCollege.length}
        />
      </div>
    </div>
  )
}