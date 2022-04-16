import React, { Fragment, useEffect, useState, useRef } from "react";
import styles from "./Scheduler.module.scss";
import { message, Select } from "antd";
import { Spin } from "antd";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Scheduler } from "@aldabil/react-scheduler";
import { apiStore } from "../../constant/apiStore";
import { Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import moment from "moment";
import axios from "axios";
export default function App() {
  const [loading, setLoading] = useState(true);
  const { Option } = Select;
  const [events, setEvents] = useState([]);
  const [test, setTest] = useState(1);
  const [lsClass, setLsClass] = useState([]);
  const [newEvent, setNewEvent] = useState();
  const [lsTeacher, setLsTeacher] = useState([]);
  const [lsSubject, setLsSubject] = useState([]);
  const [lsClassId, setLsClassId] = useState([]);
  const [classId, setClassId] = useState("");
  const prevSubject = useRef(lsSubject);
  const prevTeacher = useRef(lsTeacher);
  const prevClassId = useRef(classId);
  const prevlsNewImport = useRef([]);

  function onChange(value) {
    setClassId(value);
    function fetchData(setEvents) {
      setLoading(true);
      axios({
        method: "GET",
        url: apiStore.getScheduleByClassId + value,
      }).then((res) => {
        console.log(res.data, "list Event");
        const newData = res.data.map((item) => {
          return {
            event_id: item.id,
            title: item.subject.code,
            start: new Date(item.timeStart),
            end: new Date(item.timeEnd),
            teacher_name: item.teacherName,
            room: `${item.room}`,
            subject_code: item.subject.code,
          };
        });
        console.log(newData, "new fetch Events");
        setEvents(newData);
        setLoading(false);
      });
    }
    const currentSubject = lsClass.find((item) => item.classId === value);
    console.log(currentSubject.subjects, "jnsakndkjsn");
    setLsSubject([...currentSubject.subjects]);
    fetchData(setEvents);
  }

  function onSearch(val) {
    // console.log(val);
  }
  //Fetch Events from DB
  useEffect(() => {
    function fetchData(setlsClass, setLoading) {
      setLoading(true);
      axios({
        method: "GET",
        url: apiStore.getClassSimple,
      }).then((res) => {
        const newData = res.data.map((item) => item.classId);
        setLsClassId(newData);
        setLsClass(res.data);
        setLoading(false);
      });
    }

    function fetchTeacherData(setLsTeacher) {
      // console.log(fetchListTeacher,"List Teacher")
      setLoading(true);
      axios({
        method: "GET",
        url: apiStore.getAllTeachers,
      }).then((res) => {
        const newData = res.data.map((item) => {
          return {
            teacher_id: item.accountId,
            teacher_name: item.name,
          };
        });
        setLsTeacher(newData);
        setLoading(false);
      });
    }
    fetchData(setLsClass, setLoading);
    fetchTeacherData(setLsTeacher);
  }, []);
  useEffect(() => {
    prevSubject.current = lsSubject;
    prevTeacher.current = lsTeacher;
    console.log(prevSubject, "prev Subject");
    console.log(prevTeacher, "prev Teacher");
  }, [lsSubject, lsTeacher]);
  useEffect(() => {
    prevlsNewImport.current.push(newEvent);
    console.log(prevlsNewImport, "New List Event To Import");
  }, [newEvent]);
  useEffect(() => {
    prevClassId.current = classId;
  }, [classId]);

  const handleConfirm = async (e, action) => {
    if (action === "edit") {
      let arr = [];
      let slotId = e.event_id;
      const editItemIndex = events.findIndex((item) => item.event_id === e.event_id);
      setEvents((prev) => {
        prev.splice(editItemIndex, 1, e);
        arr = [...prev];
        console.log(e, "Edit Events");
        return prev;
      });

      setTest(Math.random());
      console.log(prevClassId, "Prev Class Id");
      let teacher = prevTeacher.current.find((item) => item.teacher_name === e.teacher_name);
      let subject = prevSubject.current.find((item) => item.subjectId === e.subject_code);
      const putEvent = {
        room: parseInt(e.room),
        timeStart: moment(e.start).toISOString(),
        timeEnd: moment(e.end).toISOString(),
        classId: prevClassId.current,
        subjectId: subject.subjectId,
        teacherId: teacher.teacher_id,
        status: "NOT YET",
      };
      setLoading(true);
      axios.put(apiStore.updateSchedule + slotId, putEvent).then((res) => {
        setLoading(false);
        console.log(res);
        console.log(res.data);
      });

      console.log(putEvent, "PutEvent");
      return arr;
    } else if (action === "create") {
      setEvents((prev) => [...prev, e]);
      let teacher = prevTeacher.current.find((item) => item.teacher_name === e.teacher_name);
      let subject = prevSubject.current.find((item) => item.subjectId === e.subject_code);
      console.log(e, "evennnnnn");
      console.log(teacher, "teacher Post");
      console.log(subject, "subject Post");
      console.log(prevClassId, "Prev Class Id");
      const PostEvent = {
        room: parseInt(e.room),
        timeStart: moment(e.start).toISOString(),
        timeEnd: moment(e.end).toISOString(),
        classId: prevClassId.current,
        subjectId: subject.subjectId,
        teacherId: teacher.teacher_id,
      };
      console.log(PostEvent, "Post Event");
      setNewEvent(PostEvent);
      return events;
    }
  };

  const handleDelete = (deletedId) => {
    setEvents((prev) => prev.filter((event) => event.event_id !== deletedId));
    function deleteSchedule(setLoading) {
      setLoading(true);
      axios
        .delete(apiStore.deleteSchedule + deletedId)
        .then((res) => {
          setLoading(false);
          res.text();
        })
        .then((res) => console.log(res));
    }
    deleteSchedule(setLoading);
    return events;
  };

  const handleImport = async () => {
    const recurringEvents = { slots: [] };
    for (let i = 1; i < prevlsNewImport.current.length; i++) {
      recurringEvents.slots.push(prevlsNewImport.current[i]);
    }
    const finalRecurring = { ...recurringEvents };
    console.log("recurring Events Final: ", finalRecurring);
    function importSchedule(setLoading) {
      setLoading(true);
      axios
        .post(apiStore.importSchedule, finalRecurring)
        .then((res) => {
          message.success("Import successfully!");
          setLoading(false);
          prevlsNewImport.current = [];
          console.log(res.data, "import data");
        })
        .catch((err) => {
          prevlsNewImport.current = [];
          console.log(err);
          setTimeout(setLoading(false), 10000);
          message.success("Import successfully!");
        });
    }
    importSchedule(setLoading);
  };
  return (
    <Fragment>
      <div className={styles.navbar}>
        <Select size="large" showSearch placeholder="Select Class" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          {lsClassId.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
        <Button type="primary" icon={<DownloadOutlined />} size="large" onClick={handleImport}>
          Recurring
        </Button>
        {loading && (
          <div className={styles.navbar__item}>
            <Spin tip="Loading..." />
          </div>
        )}
      </div>

      <Scheduler
        view="week"
        events={events}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 6,
          startHour: 6,
          endHour: 21,
          step: 60,
        }}
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
            name: "subject_code",
            type: "select",
            options: lsSubject.map((res) => {
              return {
                id: res.subjectCode,
                text: `${res.subjectCode}`,
                value: res.subjectId, //Should match "name" property
              };
            }),
            config: { label: "Subject", required: true },
          },
          {
            name: "teacher_name",
            type: "select",
            default: "teacher_name",
            options: lsTeacher.map((res) => {
              return {
                id: res.teacher_name,
                text: `${res.teacher_name}`,
                value: res.teacher_name, //Should match "name" property
              };
            }),
            config: { label: "Teacher", required: true },
          },
        ]}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              {fields.map((field, i) => {
                if (field.name === "teacher_name") {
                  const admin = field.options.find((fe) => fe.id === event.teacher_name);
                  return (
                    <Typography key={i} style={{ display: "flex", alignItems: "center" }} color="textSecondary" variant="caption" noWrap>
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
