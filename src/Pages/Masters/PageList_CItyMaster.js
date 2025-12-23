import React, { useState, useEffect } from "react";
import { API_WEB_URLS } from "../../constants/constAPI";
import { Fn_FillListData } from "../../store/Functions";
import RCDisplayPage from "../../common/RCDisplayPage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fn_DeleteData } from "../../store/Functions";

const PageList_CityMaster = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [selectedFormData, setSelectedFormData] = useState({});
  const [gridData, setGridData] = useState([]);
  const [confirm_alert, setConfirmAlert] = useState(false);
  const [success_dlg, setSuccessDlg] = useState(false);
  const [dynamic_title, setDynamicTitle] = useState("");
  const [dynamic_description, setDynamicDescription] = useState("");
  const [SearchKeyArray, setSearchKeyArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [filteredData, setFilteredData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const obj = JSON.parse(localStorage.getItem("authUser"));
  const modalTitle = "City Master";
  const breadCrumbTitle = "City Master";
  const breadcrumbItem = "City Master";
  const rtPage_Add = "/AddCity ";
  const rtPage_Edit = "/EditCity ";
  const API_URL = API_WEB_URLS.MASTER + "/0/token/City_Master";
  const dispatch = useDispatch();

  // Create a state object for the delete function
  const [deleteState, setDeleteState] = useState({
    confirm_alert: false,
    success_dlg: false,
    dynamic_title: "",
    dynamic_description: "",
  });

  useEffect(() => {
    Fn_FillListData(
      dispatch,
      setGridData,
      "gridDataSearch",
      API_URL + "/Id/0",
      setSearchKey,
      setSearchKeyArray
    );
  }, []);

  useEffect(() => {
    setFilteredData([...gridData]);
  }, [gridData]);

  // Sync deleteState with individual state variables
  useEffect(() => {
    setConfirmAlert(deleteState.confirm_alert);
    setSuccessDlg(deleteState.success_dlg);
    setDynamicTitle(deleteState.dynamic_title);
    setDynamicDescription(deleteState.dynamic_description);
  }, [deleteState]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = gridData.filter((item) => {
      const searchKeyValue = item[searchKey]?.toLowerCase();
      return searchKeyValue?.includes(searchValue);
    });
    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const handleSearchKey = (item) => {
    setSearchKey(item);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const btnAdd_onClick = (event, values) => {
    navigate(rtPage_Add, { state: { Id: 0 } });
  };

  const btnEdit_onClick = (e, formData) => {
    e.preventDefault();
    navigate(rtPage_Edit, { state: { Id: formData.Id } });
  };

  const btnDelete_onClick = (formData) => {
    Fn_DeleteData(
      dispatch,
      setDeleteState,
      formData.Id,
      API_URL,
      `${API_URL}/Id/0`
    ).then(() => {
      // On successful deletion, refresh the data
      Fn_FillListData(
        dispatch,
        setGridData,
        "gridDataSearch",
        API_URL + "/Id/0",
        setSearchKey,
        setSearchKeyArray
      );
    }).catch((error) => {
      console.error("Delete error:", error);
    });
  };

  const toggleDeleteConfirm = (obj, formData, show) => {
    setSelectedFormData(formData);
    setConfirmAlert(show);
  };

  const toggleDeleteSuccess = (obj, show) => {
    setSuccessDlg(show);
    if (!show) {
      // Refresh the data after successful deletion
      Fn_FillListData(
        dispatch,
        setGridData,
        "gridDataSearch",
        API_URL + "/Id/0",
        setSearchKey,
        setSearchKeyArray
      );
    }
  };

  const renderGridHeader = () => {
    return (
      <>
        <th>State</th>
        <th>City</th>
      </>
    );
  };

  const renderGridBody = (formData) => {
    return (
      <>
        <td>{formData.State}</td>
        <td>{formData.City}</td>
      </>
    );
  };

  const renderModalBody = (selectedFormData) => {
    return (
      <>
        <p className="mb-4"></p>
      </>
    );
  };

  return (
    <div className="page-content">
      <RCDisplayPage
        SearchKeyArray={SearchKeyArray}
        currentPage={currentPage}
        searchKey={searchKey}
        Isbreadcrumb={true}
        breadCrumbTitle={breadCrumbTitle}
        breadcrumbItem={breadcrumbItem}
        obj={obj}
        isSearchBox={true}
        isSNo={false}
        isCheckBox={false}
        isViewDetails={false}
        gridData={currentItems}
        gridHeader={renderGridHeader}
        gridBody={renderGridBody}
        handleSearchKey={handleSearchKey}
        handleSearchChange={handleSearchChange}
        handlePageChange={handlePageChange}
        btnAdd_onClick={btnAdd_onClick}
        btnEdit_onClick={btnEdit_onClick}
        confirm_alert={confirm_alert}
        success_dlg={success_dlg}
        dynamic_title={dynamic_title}
        dynamic_description={dynamic_description}
        btnDelete_onClick={btnDelete_onClick}
        toggleDeleteConfirm={toggleDeleteConfirm}
        toggleDeleteSuccess={toggleDeleteSuccess}
        isOpenModal={modal}
        modalTitle={modalTitle}
        selectedFormData={selectedFormData}
        modalBody={renderModalBody}
        isAdd={true}
        isEdit={true}
        isDelete={true}
        isPagination={true}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PageList_CityMaster;

