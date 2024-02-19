import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Table,
  Badge,
  Media
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import React, { useEffect, useState } from "react";
import { post } from "services/services";
import { SuccessToast } from "Helper/Toast";
import { ErrorToast } from "Helper/Toast";
import { ApiURL } from "services/apiConstants";
import { get } from "services/services";
import moment from "moment";



const TodayResultScreen = () => {
  const [drop, setDrop] = useState('')
  const [resultDate, setDate] = useState(new Date())
  const [resultList, setResultList] = useState([])
  const [filterGameList, setFilterGameList] = useState([])

  let resultList1 = filterGameList[0]?.gameRequest
  let date = filterGameList[0]?.createdAt


  let formatDate = moment(date).format('l');

  // console.log("formatDate ", formatDate)


  const getResult_List = () => {
    get(ApiURL.game_List).then((res) => {
      if (res && res?.status === true) {
        setResultList(res?.data)
      }
    })
  }

  useEffect(() => {
    getResult_List()
  }, [])

  const todayGame = () => {
    get(`${ApiURL.filter_game}?gameId=${drop}&date=${resultDate}`).then(res => {
      if (res && res?.status == true) {
        setFilterGameList(res?.data)
        SuccessToast(res?.message)
      } else {
        ErrorToast(res?.message)
      }
    });
  };



  const handleSubmit = () => {
    if (checkValidation() == false) {
      return;
    } else {
      todayGame();
    }
  };

  const checkValidation = () => {
    if (drop == '') {
      ErrorToast('Game Name is required !');
      return false;
    } else if (resultDate == '') {
      ErrorToast('Result Date is required !');
      return false;
    }
  };


  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Games Result</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User Add Games Result information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gameName"
                          >
                            Game Name
                          </label>
                          <Input
                            id="exampleSelect"
                            name="status"
                            type="select"
                            value={drop}
                            onChange={(e) => { setDrop(e.target.value) }}
                          >
                            <option value={""} selected disabled>Game Name Selected</option>
                            {resultList.map((item) => {
                              return (
                                <option value={item?._id}>
                                  {item?.name}
                                </option>
                              )

                            })}

                          </Input>
                        </FormGroup>

                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-number"
                          >
                            Date
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-number"
                            placeholder="Result"
                            type="date"
                            onChange={(e) => { setDate(e.target.value) }}
                            value={resultDate}
                            defaultValue={new Date()}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <h1 className="heading-small text-muted mb-1">
                          Submit
                        </h1>
                        <Button
                          color="info"
                          href="#pablo"
                          onClick={handleSubmit}
                        // size="lg"
                        // style={{ alignSelf: 'center' }}
                        >
                          Today Result
                        </Button></Col>

                    </Row>
                  </div>
                </Form>

              </CardBody>
              <Table
              >
                <thead>
                  <tr>
                    <th scope="col">Game Name</th>
                    <th scope="col">Game Number</th>
                    <th scope="col">Totle Number</th>
                    <th scope="col">Totle Price</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>

                          <span className="mb-0 text-sm">
                            {
                              filterGameList?.map((item) => item?.name
                              )
                            }
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      {
                        resultList1?.map((item) => item?._id + ',')
                      }
                    </td>
                    <td>
                      {
                        resultList1?.map((item) => item?.count + ',')
                      }
                    </td>
                    <td>
                      {
                        resultList1?.map((item) => item?.totalPrice + ',')
                      }
                    </td>
                    <td>
                      {
                        formatDate
                      }
                    </td>
                    <td>
                      {
                        "Good"
                      }
                    </td>
                    <td>
                      {
                        "active"
                      }
                    </td>


                  </tr>
                </tbody>

              </Table>
            </Card>


          </Col>
        </Row >
      </Container >
    </>
  );
};

export default TodayResultScreen;
