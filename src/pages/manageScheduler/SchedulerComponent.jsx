import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import DropDownBox from "./DropDownBox";

const CLASSES = [
  {
    class_id: "SE1401",
    events: [
      {
        event_id: 1,
        title: "Event 1",
        start: new Date("2022 3 22 09:30"),
        end: new Date("2022 3 22 10:30"),
        admin_id: 2,
        course_id: 2,
        room_id: 1,
      },
      {
        event_id: 2,
        title: "Event 2",
        start: new Date("2022 3 22 10:00"),
        end: new Date("2022 3 22 11:00"),
        admin_id: 1,
        course_id: 2,
        room_id: 2,
      },
      {
        event_id: 3,
        title: "Event 3",
        start: new Date("2022 3 22 09:00"),
        end: new Date("2022 3 22 10:00"),
        admin_id: 1,
        course_id: 1,
        room_id: 3,
      },
    ],
  },
  {
    class_id: "SE1402",
    events: [
      {
        event_id: 3,
        title: "Event 3",
        start: new Date("2022 3 22 09:00"),
        end: new Date("2022 3 22 10:00"),
        admin_id: 1,
        course_id: 1,
        room_id: 3,
      },
    ],
  },
  // { class_id: "SE1402", class_name: "SE1402" },
  // { class_id: "SE1403", class_name: "SE1403" },
  // { class_id: "SE1404", class_name: "SE1404" },
  // { class_id: "SE1405", class_name: "SE1405" },
];
const RESOURCES = [
  {
    admin_id: 1,
    title: "TranLQ",
  },
  {
    admin_id: 2,
    title: "NguyenNDB",
  },
  {
    admin_id: 3,
    title: "MyNH",
  },
  {
    admin_id: 4,
    title: "ThongHH",
  },
];
const COURSES = [
  {
    admin_id: 1,
    course_id: 1,
    course_syntax: "DBW301",
    course_name: "Data warehouse",
  },
  {
    admin_id: 1,
    course_id: 2,
    course_syntax: "ACC101",
    course_name: "Account Principles",
  },
  {
    admin_id: 1,
    course_id: 3,
    course_syntax: "SSC102",
    course_name: "Bussiness Comunnication",
  },
];
const ROOMS = [
  {
    event_id: 1,
    room_id: 1,
    room_name: "201",
  },
  {
    event_id: 2,
    room_id: 2,
    room_name: "202",
  },
  {
    event_id: 3,
    room_id: 3,
    room_name: "203",
  },
];

export default function App() {
  const { Option } = Select;
  const [classId, setClassId] = useState("");
  const [data, setData] = useState([]);
  const [lsResource,setLsResource] = useState(RESOURCES);
  const [lsRoom, setLsRoom] = useState(ROOMS);
  const [lsCourse,setLsCourse] = useState(COURSES)
   
  useEffect(() => {
    const selectedClass = CLASSES.filter((item) => item.class_id === classId);
    if(selectedClass.length > 0) setData(selectedClass[0].events)
  }, [classId]);


  // useEffect(() => {
  //   setData(CLASSES[0].events);
  // }, []);
  
  
  
  const handleConfirm = (event, action) => {
    console.log(event, action,111111);
    if (action === "edit") {
      // console.log(CLASSES[0].events, action);
      /** PUT event to remote DB */
      const array = [...data]
      const selectedArray = array.filter(item => item.class_id === classId)
      const selectedEventArray = selectedArray[0].events.filter(item => item.event_id === event.event_id) 
      console.log(selectedEventArray)
    } else if (action === "create") {
      /**POST event to remote DB */
      // setData(data.push(event));
    }
    /**
     * Make sure to return 4 mandatory fields:
     * event_id: string|number
     * title: string
     * start: Date|string
     * end: Date|string
     * ....extra other fields depend on your custom fields/editor properties
     */
    // Simulate http request: return added/edited event
  };
 
  const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 300);
    });
  };

  function onChange(value) {
    setClassId(value);
  }


  function onSearch(val) {
    // console.log("search:", val);
  }

  return (
    <Fragment>
      <Select
        showSearch
        placeholder="Select Class"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {CLASSES.map((item) => (
          <Option value={item.class_id}>{item.class_id}</Option>
        ))}
      </Select>
      <Scheduler
        events={data}
        view="week"
        // day={null}
        // month={null}
        fields={[
          {
            name: "admin_id",
            type: "select",
            options: RESOURCES.map((res) => {
              return {
                id: res.admin_id,
                text: `${res.title}`,
                value: res.admin_id, //Should match "name" property
              };
            }),
            config: { label: "Teacher", required: true },
          },
          {
            name: "course_id",
            type: "select",
            options: COURSES.map((res) => {
              return {
                id: res.course_id,
                text: `${res.course_syntax}`,
                value: res.course_id, //Should match "name" property
              };
            }),
            config: { label: "Course", required: true },
          },
          {
            name: "room_id",
            type: "select",
            options: ROOMS.map((res) => {
              return {
                id: res.room_id,
                text: `${res.room_name}`,
                value: res.room_id, //Should match "name" property
              };
            }),
            config: { label: "Room", required: true },
          },
        ]}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              {fields.map((field, i) => {
                if (field.name === "admin_id") {
                  const admin = field.options.find(
                    (fe) => fe.id === event.admin_id
                  );
                  return (
                    <Typography
                      key={i}
                      style={{ display: "flex", alignItems: "center" }}
                      color="textSecondary"
                      variant="caption"
                      noWrap
                    >
                      <PersonRoundedIcon /> {admin.text}
                    </Typography>
                  );
                } else {
                  return "";
                }
              })}
            </div>
          );
        }}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
      />
    </Fragment>
  );
}
