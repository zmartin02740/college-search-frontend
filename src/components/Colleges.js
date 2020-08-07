import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import College from '../components/College';

export default ({ searchRequest, setCount, count }) => {
  const DEFAULT_PAGE_SIZE = 20
  const [page, setPage] = useState({ minValue: 0, maxValue: 20 })
  const [details, setDetails] = useState({})
  const [collegeAr, setCollegeAr] = useState([])
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
  }, [])

  let filteredCollege = []

  useEffect(() => {
    let collegeZips = collegeAr && collegeAr.map(college => {
      return college.ZIP.split('-')[0]
    })
    const collegeZipsFirst = collegeZips.slice(0, 75)
    const collegeZipsSecond = collegeZips.slice(75, 150)
    const collegeZipsThird = collegeZips.slice(150, 196)

    // Promise.all([
    //   fetch('https://cors-anywhere.herokuapp.com/' + `https://www.zipcodeapi.com/rest/${distanceAPI}/multi-distance.json/02128/${collegeZipsFirst.join(',')}/mile`),
    //   fetch('https://cors-anywhere.herokuapp.com/' + `https://www.zipcodeapi.com/rest/${distanceAPI}/multi-distance.json/02128/${collegeZipsSecond.join(',')}/mile`),
    //   fetch('https://cors-anywhere.herokuapp.com/' + `https://www.zipcodeapi.com/rest/${distanceAPI}/multi-distance.json/02128/${collegeZipsThird.join(',')}/mile`),
    // ])
    //   .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    //   .then(([data1, data2, data3]) => {
    //     console.log(data1, data2, data3)
    //   })
    // fetch('https://cors-anywhere.herokuapp.com/' + `https://www.zipcodeapi.com/rest/${distanceAPI}/multi-distance.json/02128/${collegeZipsSecond.join(',')}/mile`)
    //   .then(res => res.json())
    //   .then(data => console.log(data))
  }, [details])

  const lowerCaseSearch = searchRequest.toLowerCase();
  const handlePagination = (value) => {
    setPage({
      ...page,
      minValue: (value - 1) * DEFAULT_PAGE_SIZE,
      maxValue: value * DEFAULT_PAGE_SIZE
    })
  }

  if (collegeAr.length > 0) {
    filteredCollege = collegeAr && collegeAr.filter(college => {
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
      {details.city ? <h4>Here are the closest colleges to {details.city}...</h4> : null}
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