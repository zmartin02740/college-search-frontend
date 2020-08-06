import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default ({ college }) => {
  const collegeLink = college.INSTURL ? college.INSTURL : '';
  const collegeName = college.INSTNM ? college.INSTNM : null
  const collegeURL = '/colleges/' + collegeName.split(' ').join('-');
  return (
    <div style={{ marginTop: 10 }}>
      <Card title={collegeName} url={collegeURL} >
        <div>{college.CITY ? college.CITY : ''}, {college.STABBR ? college.STABBR : ''} {college.ZIP ? college.ZIP : ''}</div>
        <div>
          <a href={`https://${collegeLink}`} target="_blank" rel="noopener noreferrer">Click here to be redirected to college site</a>
        </div>
      </Card>
    </div >
  )
}