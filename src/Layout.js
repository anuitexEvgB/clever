import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import app from "./firebase";
import { Layout, Menu, Modal } from "antd";
import { HomeOutlined, DiffOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { PATH, PATH_CREATE_ITEM } from "./routeList";

const { Content, Sider } = Layout;

const Slider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const error = useSelector((state) => state.item.error);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {currentUser ? (
        <Sider collapsible>
          {error
            ? Modal.error({
                title: "This is an error message",
                content: `${error.message}`,
              })
            : null}
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink to={PATH} exact>
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<DiffOutlined />}>
              <NavLink to={PATH_CREATE_ITEM}>Create Item</NavLink>
            </Menu.Item>
            <Menu.Item danger={true} key="3" icon={<LogoutOutlined />}>
              <a onClick={() => app.auth().signOut()}>Log Out</a>
            </Menu.Item>
          </Menu>
        </Sider>
      ) : null}
      <Content style={{ margin: "0 16px" }}>{children}</Content>
    </Layout>
  );
};

export default Slider;
