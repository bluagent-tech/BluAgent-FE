import React,{useState,useEffect} from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import beer from './../../../assets/icons/icons8-beer.svg';
import axios from 'axios';
import config from '../../../appSettings.json';

export default function TestReached() {
  const idUser = JSON.parse(localStorage.getItem('user')).Id;
  const [loading, setLoading] = useState(true)
  const [error, setError]  = useState('')
  const [post, setPost] = useState({})

  useEffect(()=>{
    axios.get(config.link+'api/DrugAndAlcoholTesting/GetScheduledAlcoholTests?idu='+idUser)
    .then(respose=>{
      setLoading(false)
      setPost(JSON.parse(respose.data))
      setError('')
    })
    .catch(error => {
      setLoading(false)
      setPost({})
      setError('N/A')
    });
  }, [])
  return (
    <Col md='4' sm='12'>
      <Card>
        <CardBody>
          <div className='text-right'>
            <img
              src={beer}
              alt='beer'
              style={{ width: '40px' }}
              className='img-fluid'
            />
          </div>
          <div className='text-center'>
            <h3>{loading ? 'Loading...' : post.scheduledAlcoholTestsReached + '%'}</h3>
            {error ? error : null}
          </div>
          <div className='text-left'>
            <div
              style={{ position: 'relative' }}
              className='text-muted text-uppercase font-weight-bold'
            >
              percentage reached
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}
