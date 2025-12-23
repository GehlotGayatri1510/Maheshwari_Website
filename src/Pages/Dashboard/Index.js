import React from "react";

import { Container } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableComponent from "./TableComponent";

const Dashboard = () => {
  document.title = "Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="WELCOME TO Maheshwari Samaj" breadcrumbItem="WELCOME TO Maheshwari Samaj" />
          
          <TableComponent/>
          
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
