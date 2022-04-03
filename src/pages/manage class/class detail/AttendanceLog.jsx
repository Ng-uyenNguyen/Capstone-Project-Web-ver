import { Table, Select, Button, Radio, Typography, Image, Avatar, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiStore } from "../../../constant/apiStore";
import styles from "./AttendanceLog.module.scss";
import moment from "moment";
export const AttendanceLog = ({ item }) => {
  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
    },
    {
      title: "Lecturer",
      dataIndex: "lecturer",
      key: "lecturer",
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
    },
  ];
  const { Option } = Select;
  const [selectedSchedule, setSelectedSchedule] = useState(-1);
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleDataSource, setScheduleDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  function onChange(value) {
    let selectedScheduleCourse = scheduleData.filter((item) => item.subject.id === value);

    let mappedData = selectedScheduleCourse.map((item, index) => ({
      key: index,
      day: moment(item.timeStart).format("YYYY/MM/DD"),
      startTime: moment(item.timeStart).format("HH:mm"),
      endTime: moment(item.timeEnd).format("HH:mm"),
      room: item.room,
      lecturer: item.teacherName,
      attendance: item.status,
      view: (
        <Button
          type="link"
          onClick={() => {
            setSelectedSchedule(item.id);
            setSelectedDate(moment(item.timeStart).format("YYYY/MM/DD"));
          }}
          disabled={item.status === "NOT YET"}>
          View
        </Button>
      ),
    }));
    setScheduleDataSource(mappedData);
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  useEffect(() => {
    const fetchScheduleData = async () => {
      let res = await axios.get(apiStore.getScheduleByClassId + item.classId);
      let data = await res.data;
      console.log(data);
      setLoading(false);
      setScheduleData([...data]);
    };
    fetchScheduleData();
  }, []);

  return (
    <div className={styles.class_attendance_log}>
      <Select showSearch placeholder="Select a subject" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {item.subjects.map((subject, index) => (
          <Option key={index} value={subject.subjectId}>
            {subject.subjectCode}
          </Option>
        ))}
      </Select>
      <Table className="custom_table_1" dataSource={scheduleDataSource} columns={columns} loading={loading} />
      <div className={styles.divider} />
      {selectedSchedule > -1 ? <AttendanceLogBlock slotId={selectedSchedule} date={selectedDate} /> : ""}
    </div>
  );
};
const AttendanceLogBlock = ({ slotId, date }) => {
  const [loading, setLoading] = useState(true);
  const [changeData, setChangeData] = useState([]);
  const [attendanceLogDataSource, setAttendanceLogDataSource] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const handleChange = (e, item, index) => {
    setChangeData((prev) => {
      prev[index] = { ...item, status: e.target.value };
      return prev;
    });
  };
  const handleSave = async () => {
    setSaveLoading(true);
    const data = changeData.map((item) => ({
      studentId: item.accountId,
      slotId: slotId,
      status: item.status,
      description: "",
    }));
    const res = await axios.put(apiStore.updateAttendanceLog, data);
    if (res.status === 200) {
      setSaveLoading(false);
      message.success("Save successfully!");
    } else {
      console.log(res);
      message.error("Save failed!");
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchAttendanceLog = async () => {
      let response = await axios.get(apiStore.getAttendanceLogBySlotId + slotId);
      let data = response.data;
      let mappedData = data.map((item, index) => ({
        key: index,
        no: index + 1,
        avatar: (
          <>
            <Avatar src={"https://drive.google.com/uc?export=view&id=" + item.avatar} shape="square" size={30} />
          </>
        ),
        studentId: item.accountId,
        studentName: item.name,
        status: (
          <Radio.Group onChange={(value) => handleChange(value, item, index)} defaultValue={item.status}>
            <Radio value="PRESENT">
              <Typography.Text type="success">Present</Typography.Text>
            </Radio>
            <Radio value="ABSENT">
              <Typography.Text type="danger">Absent</Typography.Text>
            </Radio>
          </Radio.Group>
        ),
        description: <Typography.Text type="danger">{item.description}</Typography.Text>,
      }));
      setAttendanceLogDataSource([...mappedData]);
      setChangeData([...data]);
      setLoading(false);
    };
    fetchAttendanceLog();
  }, [slotId]);

  const attendanceLogColumns = [
    {
      title: <b>No</b>,
      dataIndex: "no",
      key: "no",
      align: "left",
    },
    {
      title: <b>Avatar</b>,
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: <b>Student Name</b>,
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: <b>Student ID</b>,
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: <b>Status</b>,
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
  ];
  return (
    <div className={styles.attendanceLog}>
      <h2>
        <b>Attendance Log {date}</b>
      </h2>
      <Table dataSource={attendanceLogDataSource} columns={attendanceLogColumns} pagination={false} loading={loading} />

      <Button type="primary" style={{ borderRadius: "6px", marginTop: "2%" }} onClick={handleSave} loading={saveLoading}>
        Save
      </Button>
    </div>
  );
};
