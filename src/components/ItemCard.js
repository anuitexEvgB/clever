import React from "react";
import { Card, Col, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { firebaseItemDelete } from "../store/actions/item";

import { withRouter } from "react-router";
import { PATH } from "../routeList";

const ItemCard = ({ item, history }) => {
  const dispatch = useDispatch();

  const getTime = (time) => (
    <p className="salesEnd">Sales end {moment(time).fromNow()}</p>
  );
  const removeItem = async () => {
    dispatch(firebaseItemDelete(item.id, item.img.name));
  };

  return (
    <Col span={6}>
      <Card
        cover={<img style={{ height: "50vh" }} src={item.img.url} />}
        actions={[
          <Button
            onClick={() =>
              history.push({
                pathname: PATH + item.title.toLowerCase(),
                state: { item: item },
              })
            }
            icon={<EditOutlined />}
            type="primary"
          />,
          <Button
            onClick={removeItem}
            style={{ width: "100%" }}
            icon={<DeleteOutlined />}
            type="danger"
          />,
        ]}
      >
        <Card.Meta
          title={
            <>
              {item.dateDiscount - moment() > 0 ? (
                <>
                  {getTime(item.dateDiscount)}
                  <span className="discount">${item.cost}</span>
                  <p className="price">
                    $
                    {(item.cost - (item.cost * item.discount) / 100).toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="price">{item.cost} $</p>
              )}
            </>
          }
          description={
            <>
              <h3>{item.title}</h3>
              <span>{item.text}</span>
            </>
          }
        />
      </Card>
    </Col>
  );
};

export default withRouter(ItemCard);
