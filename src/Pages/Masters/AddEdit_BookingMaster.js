import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Col, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  Fn_AddEditData,
  Fn_DisplayData,
  Fn_FillListData,
} from "../../store/Functions";
import { API_WEB_URLS } from "../../constants/constAPI";
import { useNavigate } from "react-router-dom";

function AddEdit_BookingMaster() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState({
    id: 0,
    formData: {
      Name: "",
      IsMaheshwari: false,
      Phone: "",
      Email: "",
      Area: 0,
      RoomType: "",
      NoOfRooms: 0,
      NoOfDays: 0,
      NoOfPerson: 0,
      ArrivalDate: "",
      DeptDate: "",
      FunctionType: "",
      Remarks: "",
    },
    FillArray1: [],
    FillArray2: [],
    isProgress: true,
  });

  const API_URL_SAVE = `${API_WEB_URLS.BookingMaster}/0/token`;
  const API_URL_EDIT = `${API_WEB_URLS.MASTER}/0/token/BookingMasterId/Id`;
  const API_URL1 = `${API_WEB_URLS.MASTER}/0/token/CityMaster`;
  const API_URL2 = `${API_WEB_URLS.MASTER}/0/token/RoomMaster`;

  useEffect(() => {
    Fn_FillListData(dispatch, setState, "FillArray1", `${API_URL1}/Id/0`);
    Fn_FillListData(dispatch, setState, "FillArray2", `${API_URL2}/Id/0`);
  }, [dispatch]);

  useEffect(() => {
    const Id = (location.state && location.state.Id) || 0;

    if (Id > 0) {
      setState((prevState) => ({
        ...prevState,
        id: Id,
      }));
      Fn_DisplayData(dispatch, setState, Id, API_URL_EDIT);
    }
  }, [location.state, dispatch]);

  const validationSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    RoomType: Yup.string().required("Room Type is required"),
    NoOfRooms: Yup.string().when('RoomType', {
      is: "1",
      then: (schema) => schema.required("No Of Rooms is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    ArrivalDate: Yup.string().required("Arrival Date is required"),
    DeptDate: Yup.string().required("Dept Date is required"),
    Email: Yup.string().email("Invalid email format").required("Email is required"),
    Phone: Yup.string().required("Phone is required"),
    FunctionType: Yup.string().required("Function Type is required"),
    NoOfPerson: Yup.string().required("No Of Person is required"),
    Remarks: Yup.string().required("Remarks is required"),
    Area: Yup.string().required("Area is required"),
    NoOfDays: Yup.string().required("No Of Days is required"),
  });

  const handleSubmit = (values) => {
    const obj = JSON.parse(localStorage.getItem("authUser"));
    const formData = new FormData();
    formData.append("Name", values.Name || "");
    formData.append("UserId", obj?.Id || 0);
    formData.append("RoomType", values.RoomType || 0);
    formData.append("NoOfRooms", values.NoOfRooms || 0);
    formData.append("ArrivalDate", values.ArrivalDate || "");
    formData.append("DeptDate", values.DeptDate || "");
    formData.append("Email", values.Email || "");
    formData.append("Phone", values.Phone || "");
    formData.append("FunctionType", values.FunctionType || "");
    formData.append("NoOfPerson", values.NoOfPerson || 0);
    formData.append("Remarks", values.Remarks || "");
    formData.append("IsMaheshwari", values.IsMaheshwari ? "true" : "false");
    formData.append("Area", values.Area || 0);
    formData.append("NoOfDays", values.NoOfDays || 0);

    Fn_AddEditData(
      dispatch,
      setState,
      { arguList: { id: state.id, formData } },
      API_URL_SAVE,
      true,
      "memberid",
      navigate,
      "/BookingMaster"
    );
  };

  return (
    <div className="page-content">
      <Formik
        initialValues={state.formData}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ setFieldValue, values }) => (
          <Form className="form-horizontal">
            <Row>
              <Col lg="6" className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <Field className="form-control" type="text" name="Name" />
                <ErrorMessage
                  name="Name"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="IsMaheshwari" className="form-label">
                  Is Maheshwari
                </label>
                <div className="form-check">
                  <Field
                    className="form-check-input"
                    type="checkbox"
                    name="IsMaheshwari"
                    id="IsMaheshwari"
                  />
                  <label className="form-check-label" htmlFor="IsMaheshwari">
                    Yes, I am Maheshwari
                  </label>
                </div>
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="Phone" className="form-label">
                  Phone
                </label>
                <Field className="form-control" type="text" name="Phone" />
                <ErrorMessage
                  name="Phone"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <Field className="form-control" type="email" name="Email" />
                <ErrorMessage
                  name="Email"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="Area" className="form-label">
                  Area
                </label>
                <Field as="select" className="form-control" name="Area">
                  <option value="">Select Area</option>
                  {state.FillArray1.map((item) => (
                    <option key={item.Id} value={item.Id}>
                      {item.Name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="Area"
                  component="div"
                  className="text-danger"
                />
              </Col>

               
              <Col lg="6" className="mb-3">
                <label htmlFor="RoomType" className="form-label">
                  Room Type
                </label>
                <Field as="select" className="form-control" name="RoomType">
                  <option value="">Select Room Type</option>
                  {state.FillArray2.map((item) => (
                    <option key={item.Id} value={item.Id}>
                      {item.Name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="RoomType"
                  component="div"
                  className="text-danger"
                />
              </Col>

              {values.RoomType === "1" && (
                <Col lg="6" className="mb-3">
                  <label htmlFor="NoOfRooms" className="form-label">
                    No Of Rooms
                  </label>
                  <Field
                    className="form-control"
                    type="number"
                    name="NoOfRooms"
                  />
                  <ErrorMessage
                    name="NoOfRooms"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              )}

              <Col lg="6" className="mb-3">
                <label htmlFor="NoOfDays" className="form-label">
                  No Of Days
                </label>
                <Field className="form-control" type="number" name="NoOfDays" />
                <ErrorMessage
                  name="NoOfDays"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="NoOfPerson" className="form-label">
                  No Of Person
                </label>
                <Field
                  className="form-control"
                  type="number"
                  name="NoOfPerson"
                />
                <ErrorMessage
                  name="NoOfPerson"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="FunctionType" className="form-label">
                  Function Type
                </label>
                <Field as="select" className="form-control" name="FunctionType">
                  <option value="">Select Function Type</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Party">Party</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Conference">Conference</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name="FunctionType"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="ArrivalDate" className="form-label">
                  Arrival Date
                </label>
                <Field
                  className="form-control"
                  type="date"
                  name="ArrivalDate"
                />
                <ErrorMessage
                  name="ArrivalDate"
                  component="div"
                  className="text-danger"
                />
              </Col>

              <Col lg="6" className="mb-3">
                <label htmlFor="DeptDate" className="form-label">
                  Dept Date
                </label>
                <Field className="form-control" type="date" name="DeptDate" />
                <ErrorMessage
                  name="DeptDate"
                  component="div"
                  className="text-danger"
                />
              </Col>

            

              <Col lg="6" className="mb-3">
                <label htmlFor="Remarks" className="form-label">
                  Remarks
                </label>
                <Field className="form-control" type="text" name="Remarks" />
                <ErrorMessage
                  name="Remarks"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddEdit_BookingMaster;
