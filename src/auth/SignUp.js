import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../firebase";
import { Button, Col, Form, Input, Row } from "antd";
import { NavLink } from "react-router-dom";
import { PATH, PATH_LOGIN } from "../routeList";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (value) => {
      const { email, password } = value;
      try {
        await app.auth().createUserWithEmailAndPassword(email, password);
        history.push(PATH);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <Row className="row-ground">
      <Col span={12} offset={6} className="login-col">
        <Form
          name="normal_login"
          className="login-form"
          onFinish={handleSignUp}
        >
          <h1 className="main-title">Sign Up</h1>
          <div className="login-form-field">
            <Form.Item
              name="email"
              label="Email"
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
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  min: 6,
                  message: "Minimum 6 characters",
                },
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="btn-row text-center">
              <Button type="primary" htmlType="submit" className="btn-login">
                Registration
              </Button>
            </Form.Item>
          </div>
          <div className="bottom-login-text">
            <strong className="signup-text">Already have an account?</strong>
            <NavLink className="btn-register" to={PATH_LOGIN}>
              Login
            </NavLink>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default withRouter(SignUp);
