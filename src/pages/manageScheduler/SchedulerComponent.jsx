import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";

const CLASSES = [
  {
    class_id: "SE1401",
    events: [
      {
        event_id: 1,
        title: "Event 1",
        start: new Date("2022 3 22 09:30"),
        end: new Date("2022 3 22 10:30"),
        teacher_id: 2,
        course_id: 2,
        room: "201",
      },
      {
        event_id: 2,
        title: "Event 2",
        start: new Date("2022 3 22 10:00"),
        end: new Date("2022 3 22 11:00"),
        teacher_id: 1,
        course_id: 2,
        room: "201",
      },
      {
        event_id: 3,
        title: "Event 3",
        start: new Date("2022 3 22 09:00"),
        end: new Date("2022 3 22 10:00"),
        teacher_id: 1,
        course_id: 1,
        room: "201",
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
        teacher_id: 1,
        course_id: 1,
        room_id: 3,
      },
    ],
  },
];

const TEACHERS = [
  {
    teacher_id: 1,
    teacher_name: "TranLQ",
  },
  {
    teacher_id: 2,
    teacher_name: "ThongHH",
  },
  {
    teacher_id: 3,
    teacher_name: "NguyenNDB",
  },
  {
    teacher_id: 4,
    teacher_name: "MyNH",
  },
];
const COURSES = [
  {
    teacher_id: 1,
    course_id: 1,
    course_syntax: "DBW301",
    course_name: "Data warehouse",
  },
  {
    teacher_id: 1,
    course_id: 2,
    course_syntax: "ACC101",
    course_name: "Account Principles",
  },
  {
    teacher_id: 1,
    course_id: 3,
    course_syntax: "SSC102",
    course_name: "Bussiness Comunnication",
  },
];
// export default function App() {
//   const { Option } = Select;
//   const [classId, setClassId] = useState("");
//   const [data, setData] = useState([]);
//   const [lsResource,setLsResource] = useState(TEACHERS);
//   const [lsRoom, setLsRoom] = useState(ROOMS);
//   const [lsCourse,setLsCourse] = useState(COURSES)

//   useEffect(() => {
//     const selectedClass = CLASSES.filter((item) => item.class_id === classId);
//     const fetchData = () =>  {if(selectedClass.length > 0) setData(selectedClass[0].events)}
//     setTimeout(fetchData ,300);
//   }, [classId]);

//   const handleConfirm = (event, action) => {
//     console.log(event, action,111111);
//     if (action === "edit")
//     {      const array = [...data]
//       console.log(array,data,"11111111")
//       const selectedArray = array.filter(item => item.class_id === classId)
//       const selectedEventArray = selectedArray[0].events.filter(item => item.event_id === event.event_id)
//       console.log(selectedEventArray)
//     } else if (action === "create") {

//     }
//   };

//   const handleDelete = async (deletedId) => {
//     // Simulate http request: return the deleted id
//     return new Promise((res, rej) => {
//       setTimeout(() => {
//         res(deletedId);
//       }, 300);
//     });
//   };

//   function onChange(value) {
//     setClassId(value);
//   }

//   function onSearch(val) {
//     // console.log("search:", val);
//   }

//   return (
//     <Fragment>
//       <Select
//         showSearch
//         placeholder="Select Class"
//         optionFilterProp="children"
//         onChange={onChange}
//         onSearch={onSearch}
//         filterOption={(input, option) =>
//           option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//         }
//       >
//         {CLASSES.map((item) => (
//           <Option value={item.class_id}>{item.class_id}</Option>
//         ))}
//       </Select>
//       <Scheduler
//         events={data}
//         view="week"
//         day={null}
//         month={null}
//         fields={[
//           {
//             name: "teacher_id",
//             type: "select",
//             options: TEACHERS.map((res) => {
//               return {
//                 id: res.teacher_id,
//                 text: `${res.title}`,
//                 value: res.teacher_id, //Should match "name" property
//               };
//             }),
//             config: { label: "Teacher", required: true },
//           },
//           {
//             name: "course_id",
//             type: "select",
//             options: COURSES.map((res) => {
//               return {
//                 id: res.course_id,
//                 text: `${res.course_syntax}`,
//                 value: res.course_id, //Should match "name" property
//               };
//             }),
//             config: { label: "Course", required: true },
//           },
//           {
//             name: "room_id",
//             type: "select",
//             options: ROOMS.map((res) => {
//               return {
//                 id: res.room_id,
//                 text: `${res.room_name}`,
//                 value: res.room_id, //Should match "name" property
//               };
//             }),
//             config: { label: "Room", required: true },
//           },
//         ]}
//         viewerExtraComponent={(fields, event) => {
//           return (
//             <div>
//               {fields.map((field, i) => {
//                 if (field.name === "teacher_id") {
//                   const admin = field.options.find(
//                     (fe) => fe.id === event.teacher_id
//                   );
//                   return (
//                     <Typography
//                       key={i}
//                       style={{ display: "flex", alignItems: "center" }}
//                       variant="caption"
//                       noWrap
//                     >
//                       <PersonRoundedIcon /> {admin.text}
//                     </Typography>
//                   );
//                 } else {
//                   return "";
//                 }
//               })}
//             </div>
//           );
//         }}
//         onConfirm={handleConfirm}
//         onDelete={handleDelete}
//       />
//     </Fragment>
//   );
// }
const data = [
  {
    event_id: 1,
    title: "Event 1",
    start: new Date("2022 3 22 09:30"),
    end: new Date("2022 3 22 10:30"),
    room: "201",
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date("2022 3 20 10:00"),
    end: new Date("2022 3 20 11:00"),
    room: "202",
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date("2022 3 24 09:00"),
    end: new Date("2022 3 24 10:00"),
    room: "203",
  },
];

export default function App() {
  const { Option } = Select;
  const [events, setEvents] = useState([]);
  const [test, setTest] = useState(1);
  const [classId, setClassId] = useState("");

    function onChange(value) {
    setClassId(value);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  useEffect(() => {
    const selectedClass = CLASSES.filter((item) => item.class_id === classId);
    const fetchData = () => {
      if (selectedClass.length > 0) setEvents(selectedClass[0].events);
    };
    setTimeout(fetchData, 300);
  }, [classId]);

  const handleConfirm = (e, action) => {
    if (action === "edit") {
      let arr = [];
      const editItemIndex = events.findIndex(
        (item) => item.event_id === e.event_id
      );
      setEvents((prev) => {
        prev.splice(editItemIndex, 1, e);
        arr = [...prev];
        return prev;
      });
      setTest(Math.random());
      return arr;
    } else if (action === "create") {
      setEvents((prev) => [...prev, e]);
      return events;
    }
  };

  const handleDelete = (deletedId) => {
    console.log("DELETE:", deletedId);
    setEvents((prev) => prev.filter((event) => event.event_id !== deletedId));
    return events;
  };

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
        view="week"
        events={events}
        day={null}
        month={null}
        fields={[
          {
            name: "room",
            type: "input",
            default: "",
            config: { label: "Room", multiline: true, rows: 1 },
          },
          {
            name: "teacher_id",
            type: "select",
            options: TEACHERS.map((res) => {
              return {
                id: res.teacher_id,
                text: `${res.teacher_name}`,
                value: res.teacher_id, //Should match "name" property
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
        ]}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              {fields.map((field, i) => {
                if (field.name === "teacher_id") {
                  const teacher = field.options.find(
                    (fe) => fe.id === event.teacher_id
                  );
                  return (
                    <Typography
                      key={i}
                      style={{ display: "flex", alignItems: "center" }}
                      variant="caption"
                      noWrap
                      color="textSecondary"
                    >
                      <PersonRoundedIcon /> {teacher.text}
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
