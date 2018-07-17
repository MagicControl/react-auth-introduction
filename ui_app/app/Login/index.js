import React from 'react';
import { Form, Input, Button, Segment } from 'semantic-ui-react';

import { login, makeRequest } from '../api';

import './login.css';

class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      login: '',
      password: '',
    };

    this.updateField = this.updateField.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateField (e, { name, value }) {
    this.setState({ [name]: value });
  }

  submit () {
    login(this.state).then(() => {
      makeRequest('http://localhost:8080/data', {
        method: 'GET'
      }).then(() => this.props.history.push('/data'));
    });
  }

  render () {
    return (
      <div className="login">
        <Segment>
          <Form>
            <Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Login"
              name="login"
              value={this.state.login}
              onChange={this.updateField}
            />
            <Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.updateField}
            />
            <Button
              color="teal"
              fluid
              size="large"
              onClick={this.submit}
            >
              Login
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default Login;