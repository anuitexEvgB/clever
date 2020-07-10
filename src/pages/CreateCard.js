import React, { useContext, useState } from "react";
import { db, storage } from "../firebase";
import { withRouter } from "react-router";
import { message, Row, Col } from "antd";

import { AuthContext } from "../context/AuthContext";
import FormItem from "../components/FormItem";
import { PATH } from "../routeList";

const Create = ({ history }) => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreate = async (data) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("choose pls image");
      return;
    }
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    const res = await fileRef
      .put(file)
      .then((res) =>
        res.state === "success"
          ? fileRef.getDownloadURL()
          : alert("Error upload")
      )
      .catch((err) => alert(err));
    data.img = {
      url: res,
      name: file.name,
    };
    if (data.dateDiscount) {
      data.dateDiscount = data.dateDiscount.valueOf();
    }
    data.userId = currentUser;
    await db
      .collection(process.env.REACT_APP_DB_COLLECTION)
      .add(data)
      .then(() => history.push(PATH));
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <h1 className="main-title">create item</h1>
        <FormItem
          item={false}
          sumbit={handleCreate}
          onFileChange={onFileChange}
        />
      </Col>
    </Row>
  );
};

export default withRouter(Create);
