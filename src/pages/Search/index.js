import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Space } from 'antd';
import SearchInput from '../../components/SearchInput';

const SearchButton = styled.div`
  aligh-text: 'center';
  color: 'red';
`

export default () => {
  const [searchRequest, setSearchRequest] = useState('')

  return (
    <div style={{ margin: '20px' }}>
      <div>
        <SearchInput setSearch={setSearchRequest} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Link to={`results/${searchRequest.length > 0 ? searchRequest : 'ma'}`}>Search</Link>
      </div>
    </div>
  )
}