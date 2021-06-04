import { Divider } from "antd";
import React, { useState } from "react";

const DayPicker = ({ setDay, value }) => {
  console.log("daypicker ", value);
  const [daySelected, setDaySelected] = useState(value != null ? value : 0);
  console.log(daySelected);
  const Day = ({ value }) => {
    console.log("in ", value == daySelected);
    return (
      <span
        key={value}
        onClick={(e) => {
          setDaySelected(value);
          setDay(value);
        }}
        style={
          value === daySelected ? styles.daySelected : styles.dayUnSelected
        }
      >
        {value}
      </span>
    );
  };
  const RenderRow = ({ a, b, c, d, e, f, g, styles }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginRight: 20,
          padding: 3,

          ...styles,
        }}
      >
        <Day value={a} />
        <Day value={b} />
        <Day value={c} />
        {d && <Day value={d} />} {e && <Day value={e} />}
        {f && <Day value={f} />}
        {g && <Day value={g} />}
      </div>
    );
  };
  return (
    <div
      style={{
        padding: 15,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        width: 250,
        marginLeft: 30,
        borderRadius: 10,
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
        Select your day
      </span>
      <RenderRow a={1} b={2} c={3} d={4} e={5} f={6} g={7} />
      <RenderRow a={8} b={9} c={10} d={11} e={12} f={13} g={14} />
      <RenderRow a={15} b={16} c={17} d={18} e={19} f={20} g={21} />
      <RenderRow a={22} b={23} c={24} d={25} e={26} f={27} g={28} />
      <RenderRow a={29} b={30} c={31} />
    </div>
  );
};

export default DayPicker;
const styles = {
  daySelected: {
    padding: 4,
    borderRadius: 20,
    width: 30,
    textAlign: "center",
    backgroundColor: "lightblue",
  },
  dayUnSelected: {
    padding: 4,
    borderRadius: 20,
    width: 30,
    textAlign: "center",
    backgroundColor: "white",
  },
};
