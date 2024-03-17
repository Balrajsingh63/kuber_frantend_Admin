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
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import React, { useEffect, useState } from "react";
import { post } from "services/services";
import { SuccessToast } from "Helper/Toast";
import { ErrorToast } from "Helper/Toast";
import { ApiURL } from "services/apiConstants";
import { useNavigate } from "react-router-dom";
import { get } from "services/services";
import { socket } from "services/socket";

const GameResultScreen = () => {
  const [drop, setDrop] = useState('')
  const [resultTime, setResultTime] = useState('')
  const [resultList, setResultList] = useState([])
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [date, setDate] = useState(new Date())

  console.log(date)

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

  const addGame = () => {
    socket.emit('result', { startTime: null, endTime: null, number: resultTime, resultTime: null, gameId: drop, date: date })
  };



  const handleSubmit = () => {
    if (checkValidation() == false) {
      return;
    } else {
      addGame();
    }
  };

  const checkValidation = () => {
    if (drop == '') {
      ErrorToast('Game Name is required !');
      return false;
    } else if (resultTime == '') {
      ErrorToast('Result Time is required !');
      return false;
    }
  };
  function onConnect() {
    console.log('socket Admin Connected *******');
    setIsConnected(true);
  }

  function onDisconnect() {
    console.log('socket Admin Disconnect =========');
    setIsConnected(false);
  }

  function onFooEvent(value) { }

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('result_reload', (data) => {
      if (data?.status == true) {
        SuccessToast('result success');
      } else {
        ErrorToast('result error');
      }
    });
    return () => {
      socket.disconnect();
      socket.off('connection', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);

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
                            htmlFor="input-gameName"
                          >
                            Date
                          </label>
                          <Input
                            id="exampleSelect"
                            name="status"
                            type="Date"
                            value={date}
                            onChange={(e) => { setDate(e.target.value) }}
                          >
                            <option value={""} selected disabled>Selected Date</option>
                          </Input>
                        </FormGroup>

                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-number"
                          >
                            Result Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-number"
                            placeholder="Result"
                            type="text"
                            onChange={(e) => { setResultTime(e.target.value) }}
                            value={resultTime}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button
                      color="info"
                      href="#pablo"
                      onClick={handleSubmit}
                      size="lg"
                      style={{ alignSelf: 'center' }}
                    >
                      Game Result
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row >
      </Container >
    </>
  );
};

export default GameResultScreen;
