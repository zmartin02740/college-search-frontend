import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default ({ setSearch, search = '', count = 0 }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <Input style={{ boxShadow: '2px 1px 1px gray' }} name="search" onChange={handleSearch} size="large" placeholder="Type college name or city" prefix={<SearchOutlined />} />
      {search !== '' ? <div>
        {count} Results for "{search}"
      </div> : <div>What college are you looking for?</div>}
    </div>
  )
}