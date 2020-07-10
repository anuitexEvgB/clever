import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../firebase.js";
import { AuthContext } from "../context/AuthContext.js";
import { Form, Input, Button, Col, Row } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { PATH, PATH_REGISTER } from "../routeList";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (value) => {
      const { email, password } = value;
      try {
        await app.auth().signInWithEmailAndPassword(email, password);
        history.push(PATH);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to={PATH} />;
  }

  return (
    <Row className="row-ground">
      <Col span={12} offset={6} className="login-col">
        <Form name="normal_login" className="login-form" onFinish={handleLogin}>
          <h1 className="main-title">Login</h1>
          <div className="login-form-field">
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="btn-row text-center">
              <Button type="primary" htmlType="submit" className="btn-login">
                Log in
              </Button>
            </Form.Item>
          </div>
          <div className="bottom-login-text">
            <strong className="signup-text">Don't have account?</strong>
            <NavLink className="btn-register" to={PATH_REGISTER}>
              Sign Up
            </NavLink>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
