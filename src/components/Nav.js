import React from 'react';
import { Link } from 'react-router-dom'

export default ({ backBTN }) => {
  return (
    <header style={{ alignSelf: 'start' }}>
      <Link to={backBTN}>Back</Link>
    </header>
  )
}