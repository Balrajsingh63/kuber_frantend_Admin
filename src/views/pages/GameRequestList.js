import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  Button,
  FormGroup,
  Input
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { get, put } from "../../services/services";
import { ApiURL } from "../../services/apiConstants";
import GameListTables from "components/Tables/GameListTable";
import { SuccessToast } from "Helper/Toast";
import { ErrorToast } from "Helper/Toast";


const GameRequestList = () => {
  const [gameData, setGameData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = gameData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(gameData.length / recordsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [exampleModal, setExampleModal] = useState(false);
  const [name, setName] = useState("");
  const [resultTime, setResultTime] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [gameId, setGameId] = useState("");
  const toggleModal = () => {
    setExampleModal(!exampleModal);
  };
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleUpdateGame = () => {
    const formData = {
      name: name,
      resultTime: resultTime,
      startTime: openTime,
      endTime: closeTime,
    };
    console.log({ gameId })
    put(ApiURL.update_Game + "/" + gameId, formData).then((res) => {
      if (res && res?.status == true) {
        SuccessToast(res?.message)
        getGame_List()
        toggleModal()
      } else {
        ErrorToast(res?.message)
      }
    })
  }

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

  const getGame_List = () => {
    get(ApiURL.game_List).then((res) => {
      if (res && res?.status === true) {
        setGameData(res?.data)
      }
    })
  }
  useEffect(() => {
    getGame_List()
  }, [])

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Game List</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <GameListTables game_data={currentRecords}
                    getGame_List={getGame_List}
                    toggleModal={toggleModal}
                    exampleModal={exampleModal}
                    setExampleModal={setExampleModal}
                    setResultTime={setResultTime}
                    setOpenTime={setOpenTime}
                    setCloseTime={setCloseTime}
                    setName={setName}
                    setGameId={setGameId}
                  />
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
        isOpen={exampleModal}
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
                  htmlFor="input-gameName"
                >
                  Game Name
                </label>
                <Input
                  className="form-control-alternative"
                  defaultValue="Kuber"
                  id="input-GameName"
                  placeholder="Game Name"
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
                  htmlFor="input-number"
                >
                  Result Time
                </label>
                <Input
                  className="form-control-alternative"
                  id="input-number"
                  placeholder="Result"
                  type="time"
                  onChange={(e) => { setResultTime(e.target.value) }}
                  value={resultTime}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-start-time"
                >
                  Open Time
                </label>
                <Input
                  className="form-control-alternative"
                  defaultValue="Open Time"
                  id="input-start-time"
                  placeholder="Open Time"
                  type="time"
                  onChange={(e) => { setOpenTime(e.target.value) }}
                  value={openTime}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-end-time"
                >
                  Close Time
                </label>
                <Input
                  className="form-control-alternative"
                  defaultValue="Close Time"
                  id="input-end-time"
                  placeholder="Close Time"
                  type="time"
                  onChange={(e) => { setCloseTime(e.target.value) }}
                  value={closeTime}
                />
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

export default GameRequestList;
