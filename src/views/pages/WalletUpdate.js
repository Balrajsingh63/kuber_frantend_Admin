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
import React, { useEffect, useState } from "react";
import { SuccessToast } from "Helper/Toast";
import { ErrorToast } from "Helper/Toast";
import { ApiURL } from "services/apiConstants";
import { get } from "services/services";
import { post } from "services/services";
import moment from "moment";



const WalletUpdate = () => {
  const [drop, setDrop] = useState('')
  const [resultDate, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [resultList, setResultList] = useState([])

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

  const updateWallet = () => {
    const formData = {
      gameId: drop,
      date: resultDate
    };
    // console.log("formData***", formData);
    post(ApiURL.update_wallet, formData).then((res => {
      if (res && res?.status == true) {
        SuccessToast(res?.message)
      } else {
        ErrorToast(res?.message)
      }
    }))
  };



  const handleSubmit = () => {
    if (checkValidation() == false) {
      return;
    } else {
      updateWallet();
    }
  };

  const checkValidation = () => {
    if (drop == '') {
      ErrorToast('Game Name is required !');
      return false;
    } else if (resultDate == '') {
      ErrorToast('Update Wallet Date is required !');
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
                    <h3 className="mb-0">Update Wallet Amount</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User Wallet Update information
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
                            placeholder="Date"
                            type="date"
                            onChange={(e) => { setDate(e.target.value) }}
                            value={resultDate}
                            defaultValue={new Date()}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <h1 className="heading-small text-muted mb-1">
                          Wallet Update
                        </h1>
                        <Button
                          color="info"
                          href="#pablo"
                          onClick={handleSubmit}
                        >
                          Update Wallet
                        </Button></Col>

                    </Row>
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

export default WalletUpdate;
