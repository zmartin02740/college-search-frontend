import React, { useState } from 'react';
import Colleges from '../../components/Colleges';
import SearchInput from '../../components/SearchInput';

export default ({ match: { params: { request } } }) => {
  const [search, setSearch] = useState('')
  const [collegeCount, setCollegeCount] = useState(0);

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div style={{ margin: "30px 10px" }}>
      <div>
        <SearchInput setSearch={setSearch} search={search} count={collegeCount} />
      </div>
      <div>
        <Colleges searchRequest={search} setCount={setCollegeCount} count={collegeCount} />
      </div>
    </div>
  )
}