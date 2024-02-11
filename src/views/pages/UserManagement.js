import React, { useState, useEffect } from 'react';
import { Container, Row, Card, CardHeader, CardBody, Pagination, PaginationItem, PaginationLink, Modal, Col, FormGroup, Input, Button, Label } from 'reactstrap';
import Header from 'components/Headers/Header';
import Tables from 'components/Tables/Table';
import { get } from 'services/services';
import { ApiURL } from 'services/apiConstants';
import { put } from 'services/services';
import { SuccessToast } from 'Helper/Toast';
import { ErrorToast } from 'Helper/Toast';

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [userId, setUserId] = useState("")
  const [status, setStatus] = useState("active")
  const getUserList = () => {
    get(ApiURL.user_List).then((res) => {
      if (res && res.status === true) {
        setUserData(res.data);
      }
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = userData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(userData.length / recordsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const toggleModal = () => {
    setVisible(!visible);
  };
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleUpdateGame = () => {
    const formData = {
      name: name,
      mobile: phone,
      status: status
    };
    console.log({ userId })
    put(ApiURL.user_update + "/" + userId, formData).then((res) => {
      if (res && res?.status == true) {
        SuccessToast(res?.message)
        getUserList()
        toggleModal()
      } else {
        ErrorToast(res?.message)
      }
    })
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">User Management</h3>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <Tables
                    user_data={currentRecords}
                    toggleModal={toggleModal}
                    getUserList={getUserList}
                    setVisible={setVisible}
                    visible={visible}
                    setName={setName}
                    setUserId={setUserId}
                    setStatus={setStatus}
                    setPhone={setPhone} />
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="mt-2 ml-3">
            <Pagination>
              <PaginationItem>
                <PaginationLink first onClick={() => goToPage(1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous onClick={goToPrevPage} />
              </PaginationItem>
              {pageNumbers.map((page) => (
                <PaginationItem key={page} active={page === currentPage}>
                  <PaginationLink onClick={() => goToPage(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink next onClick={goToNextPage} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last onClick={() => goToPage(totalPages)} />
              </PaginationItem>
            </Pagination>
          </div>
        </Row>
      </Container>
      <Modal
        className="modal-dialog-centered"
        isOpen={visible}
        toggle={toggleModal}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Game
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-number"
                >
                  Name
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-number"
                  placeholder="Name"
                  type="text"
                  onChange={(e) => { setName(e.target.value) }}
                  value={name}
                />
              </FormGroup>
            </Col>

            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-start-time"
                >
                  Phone
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-start-time"
                  placeholder="Mobile number"
                  type="number"
                  onChange={(e) => { setPhone(e.target.value) }}
                  value={phone}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <FormGroup>
                <label for="exampleSelect">
                  Status
                </label>
                <Input
                  id="exampleSelect"
                  name="status"
                  type="select"
                  value={status}
                  onChange={(e) => { setStatus(e.target.value) }}
                >
                  <option value={"Active"}>
                    Active
                  </option>
                  <option value={"Deactivate"}>
                    Deactive
                  </option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            Close
          </Button>
          <Button color="primary" type="button" onClick={handleUpdateGame}>
            Save changes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserManagement;
