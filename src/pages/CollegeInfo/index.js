import React from 'react';
import CollegeDetails from '../../components/CollegeDetails';
import Nav from '../../components/Nav';

export default ({ match: { params: { name } } }) => {
  return (
    <div>
      <Nav backBTN={'/'} />
      <CollegeDetails
        collegeName={name}
      />
    </div>
  )
}