import { Input, InputNumber, Radio, Select, Space } from "antd";
import React from "react";
import { useState } from "react";
import ReactModal from "../Modal/ReactModal";
import {
  Button as PolarisButton,
  RadioButton,
  Stack,
  TextField,
} from "@shopify/polaris";
import DayPicker from "../Calendar/DayPicker";
import { useEffect } from "react";
const FrequencyForm = ({
  add,
  visible,
  onCancel,
  closeModal,
  object,
  addInArr,
}) => {
  const [orderFrequency, setOrderFrequency] = useState("week");
  const [showAdvancedOptions, setshowAdvancedOptions] = useState(false);
  const [FreqDetails, setFreqDetails] = useState("day");
  const [daySelected, setDaySelected] = useState(0);
  const [discType, setDiscType] = useState("percentage");
  const [discount, setDiscount] = useState("");
  const [freqName, setFreqName] = useState("");
  const [interval, setInterval] = useState(1);
  const [freqDetailsWeek, setFreqDetailsWeek] = useState("");
  const [weekDaySelected, setWeekDaySelected] = useState("Monday")
  useEffect(() => {
    if (object) {
      setDaySelected(object.day);

      setOrderFrequency(object.interval.toLowerCase());
      setFreqDetails(object.interval == "month" ? "specificDay" : "day");
      setInterval(
        object.intervalCount
      );
      setDaySelected(object.daySelected);
      setDiscType(object.discountType.toLowerCase());
      setDiscount(object.discountValue);
      setFreqName(object.name);
    }
  }, []);
  const onChangeDiscType = () => { };
  const onChangeOrderFreq = (e) => {
    setOrderFrequency(e);
  };
  const onOk = () => {
    closeModal();
    if (add) {
      let obj = {
        name: freqName,
        interval: orderFrequency.toUpperCase(),
        intervalCount: interval,
        discountType: discType.toUpperCase(),
        discountValue: parseInt(discount),
      }
      if (orderFrequency == "year") {
        obj['day'] = 1;
        obj['options'] = "1";

      }
      else {
        obj['day'] = orderFrequency === "week" ? parseInt(weekDaySelected) : daySelected;
        obj['options'] = orderFrequency === "week" ? `${weekDaySelected}` : `${daySelected}`;
        obj['dayType'] = orderFrequency == "week" ? "WEEKDAY" : "MONTHDAY";
      }
      addInArr({
        ...obj

      });
    } else {
    }
  };
  return (
    <ReactModal
      handleCancel={onCancel}
      handleOk={onOk}
      okText={add ? "Add" : "Edit"}
      title={add ? "Add Frequency Form" : "Edit Frequency Form"}
      visible={visible}
    >
      Order is created every:
      <br />
      <Space direction="horizontal">
        <InputNumber
          value={interval}
          onChange={(e) => setInterval(e)}
          min={1}
          max={31}
          style={{ width: 70 }}
        />
        <Select
          style={{ width: 100 }}
          value={orderFrequency}
          onChange={onChangeOrderFreq}
        >
          <Select.Option value="week">Week</Select.Option>
          <Select.Option value="month">Month</Select.Option>
          <Select.Option value="year">Year</Select.Option>
        </Select>
      </Space>
      <br />
      <div>
        <br />
        <PolarisButton
          plain
          disclosure={showAdvancedOptions ? "up" : "down"}
          onClick={() => {
            setshowAdvancedOptions(!showAdvancedOptions);
          }}
        >
          <span style={{ color: "royalblue", textDecoration: "underline" }}>
            {showAdvancedOptions
              ? "Hide advanced options"
              : "Show advanced options"}
          </span>
        </PolarisButton>
      </div>
      {showAdvancedOptions && orderFrequency != "year" && (
        <div
          style={{
            padding: 15,
            background: "#dcdcdc",
            borderRadius: 10,
            width: "90%",
            marginTop: 10,
            alignSelf: "center",
          }}
        >
          <Stack vertical>
            {orderFrequency === "week" && <Radio.Group
              value={freqDetailsWeek}
              onChange={(e) => {
                setFreqDetailsWeek(e.target.value);
              }}
            >
              <Space direction="vertical">
                <Radio value="day">On purchase Day</Radio>
                <Radio value="specificDay">On specific day of the week</Radio>
              </Space>
            </Radio.Group>
            }
            {orderFrequency == "month" && <Radio.Group
              value={FreqDetails}
              onChange={(e) => {
                setFreqDetails(e.target.value);
              }}
            >
              <Space direction="vertical">
                <Radio value="day">On purchase Day</Radio>
                <Radio value="specificDay">On specific day of the month</Radio>
              </Space>
            </Radio.Group>}
          </Stack>
          {freqDetailsWeek == "specificDay" && orderFrequency === "week" && <Select style={{ width: 100 }}
            value={weekDaySelected}
            onChange={(e) => setWeekDaySelected(e)}>
            <Select.Option value="1">Monday</Select.Option>
            <Select.Option value="2">Tuesday</Select.Option>
            <Select.Option value="3">Wednesday</Select.Option>
            <Select.Option value="4">Thursday</Select.Option>
            <Select.Option value="5">Friday</Select.Option>
            <Select.Option value="6">Saturday</Select.Option>
            <Select.Option value="7">Sunday</Select.Option>

          </Select>}
          {FreqDetails == "specificDay" && orderFrequency === "month" && (
            <DayPicker
              value={
                object
                  ? object.dayType === "MONTHDAY"
                  : daySelected
              }
              setDay={(e) => setDaySelected(e)}
            />
          )}
        </div>
      )}
      <br />
      Discount:
      <br />
      <Space direction="horizontal">
        <Input
          min={1}
          max={100}
          style={{ width: 70 }}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <Select
          style={{ width: 120 }}
          onChange={onChangeDiscType}
          value={discType}
        >
          <Select.Option value="percentage">percentage</Select.Option>
          <Select.Option value="money">$</Select.Option>
        </Select>
      </Space>
      <br />
      <br />
      Frequency Name: (displayed to customer)
      <Input value={freqName} onChange={(e) => setFreqName(e.target.value)} />
    </ReactModal>
  );
};
export default FrequencyForm;
