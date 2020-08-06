import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

export default ({ title, url, children }) => {
  return (
    <Card title={title} extra={url ? <Link to={url}>Learn More</Link> : null} style={{ width: '100%', margin: '0 10px' }}>
      {children}
    </Card >
  )
}