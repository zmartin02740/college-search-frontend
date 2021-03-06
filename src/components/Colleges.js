import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import College from '../components/College';

export default ({ searchRequest, setCount, count }) => {
  const DEFAULT_PAGE_SIZE = 20
  const [page, setPage] = useState({ minValue: 0, maxValue: 20 })
  const [details, setDetails] = useState({})
  const [collegeAr, setCollegeAr] = useState([])
  const geoAPI = '0f761a30-fe14-11e9-b59f-e53803842572'

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

  let filteredCollege = []

  const lowerCaseSearch = searchRequest.toLowerCase();
  const handlePagination = (value) => {
    setPage({
      ...page,
      minValue: (value - 1) * DEFAULT_PAGE_SIZE,
      maxValue: value * DEFAULT_PAGE_SIZE
    })
  }

  if (collegeAr.length > 0) {
    filteredCollege = collegeAr && collegeAr.sort((a, b) => {
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
      {details.city ? <h4>Hey there, {details.city}er...</h4> : null}
      <div style={{ marginBottom: 20 }}>
        {currentPageColleges}
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