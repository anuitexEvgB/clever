import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import moment from "moment";
import React, { useState } from "react";

const FormItem = ({ item, sumbit, onFileChange }) => {
  const [require, setRequire] = useState(false);
  return (
    <Form onFinish={sumbit}>
      <Form.Item
        initialValue={item.title || ""}
        name="title"
        label="title"
        rules={[
          {
            min: 20,
            message: "The minimum number of characters is 20",
          },
          {
            required: true,
            message: "Title is required",
          },
        ]}
      >
        <Input value={"aye"} maxLength={60} />
      </Form.Item>
      <Form.Item label="text" initialValue={item.text || ""} name="text">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} maxLength={200} />
      </Form.Item>
      <Form.Item
        initialValue={item.cost || 0}
        name="cost"
        label="cost"
        rules={[
          {
            required: true,
            message: "cost is required",
          },
        ]}
      >
        <InputNumber
          min={1}
          max={99999999.99}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>
      <Form.Item
        label="discount"
        name="discount"
        initialValue={item.discount || null}
      >
        <InputNumber
          min={10}
          max={90}
          onChange={(e) => (e ? setRequire(true) : setRequire(false))}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
        />
      </Form.Item>
      {}
      <Form.Item
        label="dateDiscount"
        name="dateDiscount"
        initialValue={item.dateDiscount ? moment(item.dateDiscount) : null}
        rules={[
          {
            required: require,
            message: "date is required",
          },
        ]}
      >
        <DatePicker
          disabledDate={(current) => current && current < moment().endOf("day")}
        />
      </Form.Item>
      <Form.Item
        name="img"
        label="img"
        rules={[
          {
            required: true,
            message: "img is required",
          },
        ]}
      >
        <input type="file" onChange={onFileChange} />
      </Form.Item>
      <Form.Item className="btn-row text-center">
        <Button type="primary" htmlType="submit" className="btn-login">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormItem;
