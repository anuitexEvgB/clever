import React, { useEffect } from "react";
import { Row, Spin } from "antd";
import { firebaseItems } from "../store/actions/item";
import { useDispatch, useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.item.items);
  useEffect(() => {
    dispatch(firebaseItems());
  }, []);

  return (
    <div className="content-section">
      <Row gutter={20}>
        {!data.loading ? (
          data &&
          data.map((item, index) => <ItemCard item={item} key={index} />)
        ) : (
          <Spin className="spin-load" size="large" />
        )}
      </Row>
    </div>
  );
};

export default Home;
