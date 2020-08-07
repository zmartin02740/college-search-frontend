import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Card from './Card';

const flattenObject = (obj) => {
  const flattened = {}

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]))
    } else {
      flattened[key] = obj[key]
    }
  })

  return flattened
}

export default ({ programs }) => {
  const [collegePrograms, setCollegePrograms] = useState({})
  useEffect(() => {
    fetch('https://collegesearchbackend.herokuapp.com/programs')
      .then(res => res.json())
      .then(data => setCollegePrograms(data))
  }, [])
  let CP = [];

  if (collegePrograms.length > 0) {
    CP = flattenObject(collegePrograms)
  }

  return (
    <Card title={'List of Programs'}>
      {programs.map(program => {
        return (
          <div key={program} style={{ margin: 10 }}>
            <span>{program}</span>
            <Tooltip placement="top" title={CP[program] ? CP[program] : null}>{' '}
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        )
      }
      )}
    </Card>
  )
}