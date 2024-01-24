import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { ApiURL } from "../../services/apiConstants";
import { post } from "../../services/services";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slice/Slice";
import { SuccessToast, ErrorToast } from "../../Helper/Toast";


const Login = () => {
  const despatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkBox, setCheckBox] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [checkBoxError, setCheckBoxError] = useState('')

  const userLogin = () => {
    const formData = {
      email: email,
      password: password,
    };
    post(ApiURL.login, formData).then(res => {
      if (res && res?.status == true) {
        let user_data = res?.data;
        let token = user_data.token;
        localStorage.setItem('token', token);
        SuccessToast(res?.message)
        despatch(setUser(user_data));
      } else {
        ErrorToast(res?.message)
      }
    });
  };

  const handleSubmit = () => {
    if (checkValidation() == false) {
      return;
    } else {
      userLogin();
    }
  };

  const checkValidation = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (email == '') {
      setEmailError('Email is required !');
      return false;
    } else if (password == '') {
      setPasswordError('Password is required !');
      return false;
    } else if (checkBox == '') {
      setCheckBoxError('CheckBox is required !');
      return false;
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                  />
                </InputGroup>
                <p style={{ color: 'red', fontSize: 15 }}>{email == '' ? emailError : ''}</p>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                  />

                </InputGroup>
                <p style={{ color: 'red', fontSize: 15 }}>{password == '' ? passwordError : ''}</p>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  onChange={e => { setCheckBox(e.target.value) }}
                />

                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
                <p style={{ color: 'red', fontSize: 15 }}>{checkBox == '' ? checkBoxError : ''}</p>

              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
