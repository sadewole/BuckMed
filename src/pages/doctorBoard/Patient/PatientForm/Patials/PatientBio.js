import React, { useState, useRef } from 'react';
import {
  Form,
  FormControl,
  FormLabel,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Avatar from 'src/components/Avatar';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

const PatientBio = () => {
  const [file, setFile] = useState('');
  const [fileError, setFileError] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const fileInput = useRef();

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let files = e.target.files[0];
    if (files.size <= 5242880 && /(.png|.jpg)$/.test(files.name)) {
      reader.onloadend = () => {
        setFile(files);
        setImagePreviewUrl(reader.result);
      };

      reader.readAsDataURL(files);
    } else {
      setFileError('Upload failed');
    }
  };
  return (
    <Box>
      <Row>
        <Col md='4'>
          <Card>
            <CardContent>
              <Box
                textAlign='center'
                alignItems='center'
                display='flex'
                justifyContent='center'
                flexDirection='column'
              >
                <Avatar img={imagePreviewUrl} size='extra' />
                <input
                  type='file'
                  onChange={handleImageChange}
                  hidden
                  ref={fileInput}
                />
                <Button
                  variant='outline-primary'
                  className='btn-block btn-transparent-blue my-3'
                  onClick={() => fileInput.current.click()}
                  style={{ width: 'fit-content' }}
                >
                  Choose Image
                </Button>
                <Typography variant='subtitle1' color='error'>
                  {fileError}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Col>
        <Col md='8'>
          <Card>
            <CardContent>
              <Row>
                <Col md='6'>
                  <Form.Group>
                    <FormLabel>Title</FormLabel>
                    <FormControl type='text' placeholder='Enter title' />
                  </Form.Group>
                </Col>
                <Col md='6'>
                  <Form.Group>
                    <FormLabel>Father Name</FormLabel>
                    <FormControl type='text' placeholder='Enter father name' />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md='4'>
                  <Form.Group>
                    <FormLabel>First Name</FormLabel>
                    <FormControl type='text' placeholder='Enter first name' />
                  </Form.Group>
                </Col>
                <Col md='4'>
                  <Form.Group>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl type='text' placeholder='Enter last name' />
                  </Form.Group>
                </Col>
                <Col md='4'>
                  <Form.Group>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl type='text' placeholder='Enter middle name' />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <Form.Group>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl type='text' placeholder='Enter occupation' />
                  </Form.Group>
                </Col>
                <Col md='6'>
                  <Form.Group>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl type='date' />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <Form.Group>
                    <FormLabel>SSN</FormLabel>
                    <FormControl type='text' placeholder='Enter SSN' />
                  </Form.Group>
                </Col>
                <Col md='6'>
                  <Form.Group>
                    <FormLabel>Expires date</FormLabel>
                    <FormControl type='date' />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <FormLabel>Gender</FormLabel>
                  <Form.Group>
                    <Form.Check
                      inline
                      type='radio'
                      name='gender'
                      label='Male'
                    />
                    <Form.Check
                      inline
                      type='radio'
                      name='gender'
                      label='Female'
                    />
                  </Form.Group>
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Box>
  );
};

export default PatientBio;
