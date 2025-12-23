import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Row } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Fn_AddEditData, Fn_DisplayData, Fn_FillListData } from '../../store/Functions';
import { API_WEB_URLS } from '../../constants/constAPI';
import { useNavigate } from 'react-router-dom';

function AddEdit_MatrimonialMaster() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState({
    id: 0,
    formData: {
      Name: '',
      Age: '',
      DOB: '',
      FatherName: '',
      FatherContact: '',
      Loc: '',
      Occupation: '',
      FatherOccupation: '',
      Caste: '',
      Community: '',
      Education: '',
      MaternalCaste: '',
      Area: '',
      Gender: '',
      Height: '',
      IsManglik: false,
    },
    isProgress: true,
    FillArray1: [],
    FillArray2: [],
    FillArray3: [],
  });

  const API_URL_SAVE = `${API_WEB_URLS.MatrimonialMaster}/0/token`;  
  const API_URL_EDIT = `${API_WEB_URLS.MASTER}/0/token/MatrimonialMasterId/Id`;  
  const API_URL1 = `${API_WEB_URLS.MASTER}/0/token/CityMaster`;
  const API_URL2 = `${API_WEB_URLS.MASTER}/0/token/CasteMaster`;
  const API_URL3 = `${API_WEB_URLS.MASTER}/0/token/OccupationMaster`;
 
  useEffect(() => {
    Fn_FillListData(dispatch, setState, 'FillArray1', `${API_URL1}/Id/0`);
    Fn_FillListData(dispatch, setState, 'FillArray2', `${API_URL2}/Id/0`);
    Fn_FillListData(dispatch, setState, 'FillArray3', `${API_URL3}/Id/0`);
    
  }, [dispatch]);

  useEffect(() => {
    const Id = (location.state && location.state.Id) || 0;
    
    if (Id > 0) {
      setState(prevState => ({
        ...prevState,
        id: Id
      }));
      Fn_DisplayData(dispatch, setState, Id, API_URL_EDIT);
    } else {
      setState(prevState => ({
        ...prevState,
        isProgress: false
      }));
    }
  }, [location.state, dispatch, API_URL_EDIT]);

  const validationSchema = Yup.object({
    Name: Yup.string().required('Name is required'),
    Age: Yup.number().positive('Age must be positive').integer('Age must be an integer').required('Age is required'),
    DOB: Yup.date().required('DOB is required'),
    FatherName: Yup.string().required('Father Name is required'),
    FatherContact: Yup.string().matches(/^[0-9]{10}$/, 'Contact must be 10 digits').required('Father Contact is required'),
    Loc: Yup.string().required('Loc is required'),
    Occupation: Yup.string().required('Occupation is required'),
    FatherOccupation: Yup.string().required('Father Occupation is required'),
    Caste: Yup.string().required('Caste is required'),
    Community: Yup.string().required('Community is required'),
    Education: Yup.string().required('Education is required'),
    MaternalCaste: Yup.string().required('Maternal Caste is required'),
    Area: Yup.string().required('Area is required'),
    Gender: Yup.string().required('Gender is required'),
    Height: Yup.string().required('Height is required'),
    // IsManglik: Yup.boolean(),
  });
  
  const handleSubmit = (values) => {
    const obj = JSON.parse(localStorage.getItem('authUser'));
    const formData = new FormData();
    formData.append("Name", values.Name);
    formData.append('UserId', obj?.Id || 0);
    formData.append('Age', values.Age);
    formData.append('DOB', values.DOB);
    formData.append('FatherName', values.FatherName);
    formData.append('FatherContact', values.FatherContact);
    formData.append('Loc', values.Loc);
    formData.append('Occupation', values.Occupation);
    formData.append('FatherOccupation', values.FatherOccupation);
    formData.append('Caste', values.Caste);
    formData.append('Community', values.Community);
    formData.append('Education', values.Education);
    formData.append('MaternalCaste', values.MaternalCaste);
    formData.append('Area', values.Area);
    formData.append('Gender', values.Gender);
    formData.append('Height', values.Height);
    formData.append('IsManglik', values.IsManglik);

    Fn_AddEditData(
      dispatch,
      setState,
      { arguList: { id: state.id, formData } },
      API_URL_SAVE,
      true,
      "memberid",
       navigate,
        "/MatrimonialMaster"
    );
  };

  if (state.isProgress) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className='page-content'>
      <Formik
        initialValues={state.formData}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ setFieldValue, values }) => (
          <Form className="form-horizontal">
            <Row>
              <Col lg='6' className="mb-3">
                <label htmlFor="Name" className="form-label">Name</label>
                <Field className="form-control" type="text" name="Name" />
                <ErrorMessage name="Name" component="div" className="text-danger" />
              </Col>
              <Col lg='6' className="mb-3">
                <label htmlFor="Age" className="form-label">Age</label>
                <Field className="form-control" type="number" name="Age" />
                <ErrorMessage name="Age" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">
                <label htmlFor="DOB" className="form-label">DOB</label>
                <Field className="form-control" type="date" name="DOB" />
                <ErrorMessage name="DOB" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3"> 
                <label htmlFor="FatherName" className="form-label">Father Name</label>
                <Field className="form-control" type="text" name="FatherName" />
                <ErrorMessage name="FatherName" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">    
                <label htmlFor="FatherContact" className="form-label">Father Contact</label>
                <Field className="form-control" type="number" name="FatherContact" />
                <ErrorMessage name="FatherContact" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">        
                <label htmlFor="Loc" className="form-label">Loc</label>
                <Field className="form-control" type="text" name="Loc" />
                <ErrorMessage name="Loc" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">            
                <label htmlFor="Occupation" className="form-label">Occupation</label>
                <Field as="select" className="form-control" name="Occupation">
                  <option value="">Select Occupation</option>
                  {state.FillArray3.map((item) => (
                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                  ))}
                </Field>
                <ErrorMessage name="Occupation" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                
                <label htmlFor="FatherOccupation" className="form-label">Father Occupation</label>
                <Field as="select" className="form-control" name="FatherOccupation">
                  <option value="">Select Father Occupation</option>
                  {state.FillArray3.map((item) => (
                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                  ))}
                </Field>
                <ErrorMessage name="FatherOccupation" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                    
                <label htmlFor="Caste" className="form-label">Caste</label>
                <Field as="select" className="form-control" name="Caste">
                  <option value="">Select Caste</option>
                  {state.FillArray2.map((item) => (
                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                  ))}
                </Field>
                <ErrorMessage name="Caste" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                        
                <label htmlFor="Community" className="form-label">Community</label>
                <Field className="form-control" type="text" name="Community" />
                <ErrorMessage name="Community" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                        
                <label htmlFor="Education" className="form-label">Education</label>
                <Field className="form-control" type="text" name="Education" />
                <ErrorMessage name="Education" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                        
                <label htmlFor="MaternalCaste" className="form-label">Maternal Caste</label>
                <Field as="select" className="form-control" name="MaternalCaste">
                  <option value="">Select Maternal Caste</option>
                  {state.FillArray2.map((item) => (
                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                  ))}
                </Field>
                <ErrorMessage name="MaternalCaste" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                        
                <label htmlFor="Area" className="form-label">Area</label>
                <Field as="select" className="form-control" name="Area">
                  <option value="">Select Area</option>
                  {state.FillArray1.map((item) => (
                    <option key={item.Id} value={item.Id}>{item.Name}</option>
                  ))}
                </Field>
                <ErrorMessage name="Area" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                        
                <label htmlFor="Gender" className="form-label">Gender</label>
                <Field as="select" className="form-control" name="Gender">
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </Field>
                <ErrorMessage name="Gender" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                        
                <label htmlFor="Height" className="form-label">Height</label>
                <Field className="form-control" type="text" name="Height" />
                <ErrorMessage name="Height" component="div" className="text-danger" />
              </Col>

              <Col lg='6' className="mb-3">                        
                <label htmlFor="IsManglik" className="form-label">Is Manglik</label>
                <div className="form-check">
                  <Field 
                    className="form-check-input" 
                    type="checkbox" 
                    name="IsManglik"
                    id="IsManglik"
                  />
                  <label className="form-check-label" htmlFor="IsManglik">
                    Yes, I am Manglik
                  </label>
                </div>
                {/* <ErrorMessage name="IsManglik" component="div" className="text-danger" /> */}
              </Col>
            
            </Row>
             
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEdit_MatrimonialMaster;
