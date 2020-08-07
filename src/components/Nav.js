import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd';

export default ({ backBTN }) => {
  return (
    <header style={{ alignSelf: 'start', margin: 20 }}>
      <Button><Link to={backBTN}>Back</Link></Button>
    </header>
  )
}