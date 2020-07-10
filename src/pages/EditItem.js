import React, { useContext, useState } from "react";

import FormItem from "../components/FormItem";
import { withRouter } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { message } from "antd";
import { db, storage } from "../firebase";
import { PATH } from "../routeList";

const EditItem = ({ location, history }) => {
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
      .doc(location.state.item.id)
      .update(data)
      .then(() => history.push(PATH));
  };

  return (
    <>
      <h1 className="main-title">edit item</h1>
      <FormItem
        sumbit={handleCreate}
        onFileChange={onFileChange}
        item={location.state.item}
      />
    </>
  );
};

export default withRouter(EditItem);
