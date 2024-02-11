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
  const navigate = useNavigate();
  const [drop, setDrop] = useState('')
  const [resultTime, setResultTime] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [gameData, setGameData] = useState([])
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [isConnected, setIsConnected] = useState(socket.connected);

  const getUser_List = () => {
    get(ApiURL.game_List).then((res) => {
      console.log("res?.data", res)
      if (res && res?.status === true) {
        setGameData(res?.data)
        console.log("res?.data", res?.data)
      }
    })
  }
  useEffect(() => {
    getUser_List()
  }, [])
  const addGame = () => {
    // const formData = {
    //   gameId: drop,
    //   number: resultTime,
    // };
    socket.emit('result', { startTime: null, endTime: null, number: resultTime, resultTime: null, gameId: drop })

    // post(ApiURL.GameResult, formData).then(res => {
    //   if (res && res?.data?.status == "active") {
    //     SuccessToast(res?.message)
    //   } else {
    //     ErrorToast(res?.message)
    //   }
    // });
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

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) { }

    socket.on('connection', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('result_reload', (data) => {
      if (data?.status === true) {
        SuccessToast("result success")
      } else {
        ErrorToast("result error")
      }
    })

    socket.on('Error', (error) => {
      console.log('error **** ', error);
    });
    socket.on('foo', onFooEvent);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
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
                      <Col lg="5">
                        <label
                          className="form-control-label"
                          htmlFor="input-gameName"
                        >
                          Game Name
                        </label>
                        <Row>
                          <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'right'}>
                            <DropdownToggle caret>Game Name Selected</DropdownToggle>
                            <DropdownMenu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                              <DropdownItem header>Header</DropdownItem>
                              {
                                gameData.map((item) => {
                                  return (
                                    <DropdownItem onClick={() => { setDrop(item?._id) }}>{item?.name}</DropdownItem>
                                  )

                                })
                              }
                            </DropdownMenu>
                          </Dropdown>
                        </Row>

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
        </Row>
      </Container>
    </>
  );
};

export default GameResultScreen;
