import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

//Begin WM ADD.
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CheckTokenCookie from '../../../script/cookie/CheckTokenCookie';
import { isNullOrUndefined, isNull } from 'util';
import LoginApp from './LoginApp';
//End WM ADD.

//Begin WM ADD.
async function asyncCheckTokenCookie () {
  /**
   * Check cookies is expire.
   */
    var result = false
    var checkTokenCookie = new CheckTokenCookie()
    result = await checkTokenCookie.getStatusCheck()
    if (result) {
      window.location = '/#/dashboard'
    }
}

async function asyncLogin (username, password) {
  /**
   * Check login and then rediret.
   */
  var objProps = {
    username: username
    , password: password
  }
  const loginApp = await new LoginApp(objProps)
  const result = await loginApp.loginApp()
  if (result) {
    window.location = '/#/dashboard'
  }
}
//End WM ADD.

class Login extends Component {
  //Begin WM ADD.
  constructor(props){
    super(props)
    this.state = {
      userName: ''
      , passWord: ''
      , tokenApp: ''
      , uId: ''
      , warning: false
      , warningText: 'Modal warning text.'
      , warningModalTitle: 'Warning.'
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.toggleWarning = this.toggleWarning.bind(this)
    this.checkLogin = this.checkLogin.bind(this)
    asyncCheckTokenCookie()
  }

  handleUsernameChange(event) {
    this.setState({userName: event.target.value})
  }

  handlePasswordChange(event) {
    this.setState({passWord: event.target.value})
  }

  checkLogin = () => {
    if ( (this.state.userName == '') || (isNullOrUndefined(this.state.userName)) ||
         (this.state.passWord == '') || (isNullOrUndefined(this.state.passWord)) ) {
      this.setState({
        warningText: 'กรอกข้อมูล Username และ Password ให้ครบถ้วน',
        warningModalTitle: 'Warning Login.',
      });
      this.toggleWarning()
    } else {
      asyncLogin(this.state.userName, this.state.passWord)
      this.setState({
        warningText: 'Username Or Password incorrect.',
        warningModalTitle: 'Warning Login.',
      });
      this.toggleWarning()
    }
  }

  toggleWarning() {
    this.setState({
      warning: !this.state.warning,
    });
  }
  //End WM ADD.

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" value={this.state.value} onChange={this.handleUsernameChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" value={this.state.value} onChange={this.handlePasswordChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.checkLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          {/* <Button color="link" className="px-0">Forgot password?</Button> */}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>

                  <Modal isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                  <ModalHeader toggle={this.toggleWarning}>{this.state.warningModalTitle}</ModalHeader>
                  <ModalBody>
                    {this.state.warningText}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="warning" onClick={this.toggleWarning}>OK</Button>
                    {/* {' '}
                    <Button color="secondary" onClick={this.toggleWarning}>Cancel</Button> */}
                  </ModalFooter>
                </Modal>

                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
