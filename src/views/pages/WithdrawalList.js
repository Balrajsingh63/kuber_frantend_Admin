import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import { get } from "../../services/services";
import { ApiURL } from "../../services/apiConstants";
import WithdrawalListTable from "components/Tables/WithdrawalListTable";


const WithdrawalList = () => {
  const [GameWithdrawal, setGameWithdrawal] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = GameWithdrawal.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(GameWithdrawal.length / recordsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  const Withdrawal_List = () => {
    get(ApiURL.withdrawal).then((res) => {
      if (res && res?.status === true) {
        setGameWithdrawal(res?.data)
      }
    })
  }

  useEffect(() => {
    Withdrawal_List()
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
                    <h3 className="mb-0">Payment Withdrawal List</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="icon-examples">
                  <WithdrawalListTable game_data={currentRecords} />
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
    </>
  );
};

export default WithdrawalList;
