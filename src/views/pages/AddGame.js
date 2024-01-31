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
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import SettingModal from "components/Modal/SettingModal";
import React, { useState } from "react";
import { post } from "services/services";
import { SuccessToast } from "Helper/Toast";
import { ErrorToast } from "Helper/Toast";
import { ApiURL } from "services/apiConstants";
import { useNavigate } from "react-router-dom";

const AddGameScreen = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('')
  const [resultTime, setResultTime] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')


  const addGame = () => {
    const formData = {
      name: name,
      resultTime: resultTime,
      startTime: openTime,
      endTime: closeTime,
    };
    post(ApiURL.add_game, formData).then(res => {
      if (res && res?.status == true) {
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
      addGame();
    }
  };

  const checkValidation = () => {
    if (name == '') {
      ErrorToast('Name is required !');
      return false;
    } else if (resultTime == '') {
      ErrorToast('result Time is required !');
      return false;
    } else if (openTime == '') {
      ErrorToast('Open Time is required !');
      return false;
    }
    else if (closeTime == '') {
      ErrorToast('Close Time is required !');
      return false;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
                    <h3 className="mb-0">Add Games</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User Add Games information
                  </h6>
                  <div className="pl-lg-4">
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
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={handleSubmit}
                      size="lg"
                      style={{ alignSelf: 'center' }}
                    >
                      Add Games
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

export default AddGameScreen;
