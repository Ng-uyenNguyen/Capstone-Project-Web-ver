import { Button, Form, Input, Modal, Table, Select, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { faBook, faBookBible } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CourseListDetail } from "../../../components/class course detail/CourseListDetail";
import styles from "./CourseList.module.scss";
import axios from "axios";
import { apiStore } from "../../../constant/apiStore";

export const CourseList = ({ item, setReRender }) => {
  const [allChosenSubjectData, setAllChosenSubjectData] = useState([]);
  const [lsTeacherOfSubject, setLsTeacherOfSubject] = useState([]);
  const [loadTeachers, setLoadTeachers] = useState(false);
  const [courseInfo, setCourseInfo] = useState({});
  const [activeRow, setActiveRow] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [courseForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCourseData, setCurrentCourseData] = useState({ courseId: 0, teacherId: "" });
  const dataSource = item.subjects.map((subject, index) => ({
    key: index,
    name: subject.subjectName,
    subjectCode: subject.subjectCode,
    teacher: subject.teacherName,
  }));

  const { Option } = Select;
  const columns = [
    {
      title: <b>Name</b>,
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: <b>ID</b>,
      dataIndex: "subjectCode",
      key: "subjectCode",
    },
    {
      title: <b>Teacher</b>,
      dataIndex: "teacher",
      key: "teacher",
    },
  ];

  const onAddNewFinish = () => {
    setAddLoading(true);
    const addCourse = async () => {
      const data = {
        subjectId: currentCourseData.courseId,
        classId: item.classId,
        teacherId: currentCourseData.teacherId,
      };
      try {
        const res = await axios.post(apiStore.addCourseToClass, data, { headers: { "Access-Control-Allow-Origin": "*" } });
        if (res.status === 200) {
          setAddLoading(false);
          message.success("Add successfully!");
          setReRender("Add course" + currentCourseData.courseId);
          setIsModalVisible(false);
        }
      } catch (err) {
        setAddLoading(false);
        message.error("Add failed!");
        console.log(err);
      }
    };
    addCourse();
  };
  const onAddNewFinishFailed = (err) => {
    console.log(err);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    courseForm.resetFields();
    setLoadTeachers(false);
    setLsTeacherOfSubject([]);
  };
  async function handleChange(value) {
    setCurrentCourseData((prev) => {
      return { ...prev, courseId: value };
    });
    const chosenSubject = allChosenSubjectData.find((i) => i.id === value);
    setLoadTeachers(true);
    const res = await axios.get(apiStore.getSubjectByID + chosenSubject.id);
    setLsTeacherOfSubject(res.data.teachers);
    setLoadTeachers(false);
  }
  const handleLecturerChange = (value) => {
    setCurrentCourseData((prev) => {
      return { ...prev, teacherId: value };
    });
  };
  const handleDeleteCourse = async () => {
    try {
      const res = await axios.delete(apiStore.deleteCourseInClass + item.classId + "&subjectId=" + courseInfo.subjectId, { headers: { "Access-Control-Allow-Origin": "*" } });
      if (res.status === 200) {
        message.success("Delete successfully!");
        setReRender("Delete course" + currentCourseData.courseId);
      } else {
        console.log(res);
        message.success("Delete successfully!");
        setReRender("Delete course" + currentCourseData.courseId);
      }
    } catch (error) {
      console.error(error);
      message.error("Delete failed!");
    }
  };

  useEffect(() => {
    const myAbortController = new AbortController();
    const getSubjectsData = async () => {
      const res = await axios.get(apiStore.getAllSubjects, { signal: myAbortController.signal });
      const data = res.data;
      console.log(data);
      let str = item.specialization;
      let matches = str.match(/\b(\w)/g);
      let acronym = matches.join("");
      const allSameSpecSubjects = data.filter((subject) => subject.specializations.includes(acronym));
      let renderredSubject = [];
      allSameSpecSubjects.forEach((subject) => {
        if (item.subjects.findIndex((s) => s.subjectId === subject.id) === -1) {
          renderredSubject.push(subject);
        }
      });
      console.log(renderredSubject);
      setAllChosenSubjectData(renderredSubject);
    };
    getSubjectsData();
    return () => {
      myAbortController.abort();
    };
  }, []);

  return (
    <div className={styles.class_course_list}>
      <div className={styles.class_course_list__table}>
        <Button type="primary" className={styles.add_new_course_btn} onClick={showModal}>
          + New Course
        </Button>
        <Table
          className="custom_table_1"
          dataSource={dataSource}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                const rows = event.target.parentElement.parentElement.children;
                setActiveRow((prev) => {
                  rows[[prev]].classList.remove("active");
                  event.target.parentElement.classList.add("active");
                  return rowIndex;
                });
                let selectedCourse = item.subjects.find((item) => item.subjectCode === record.subjectCode);
                setCourseInfo(selectedCourse);
                setLoading(true);
              },
            };
          }}
        />
      </div>
      <CourseListDetail loading={loading} courseInfo={courseInfo} handleDeleteCourse={handleDeleteCourse} />

      {/* Add new course to class modal */}
      <Modal title="" maskClosable={false} visible={isModalVisible} width="30%" className="course_addnew_modal" footer={null} closable={false} style={{ padding: 0 }}>
        <h2>
          <FontAwesomeIcon icon={faBookBible} size="lg" color="#21bf73" style={{ marginRight: "10px" }} />
          Add new course
        </h2>
        <div className="modal_addnew_form">
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onAddNewFinish} onFinishFailed={onAddNewFinishFailed} autoComplete="off" layout="vertical" form={courseForm}>
            <Form.Item label="Course Id" name="courseId">
              <Select showSearch bordered={false} placeholder="Select Course" onChange={handleChange}>
                {allChosenSubjectData.map((subject) => (
                  <Option key={subject.id} value={subject.id}>
                    {subject.subjectCode}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Lecturer" name="lecture">
              <Select showSearch bordered={false} placeholder="Select Lecturer" optionFilterProp="children" onChange={handleLecturerChange}>
                {lsTeacherOfSubject.map((teacher) => (
                  <Option key={teacher.accountId} value={teacher.accountId}>
                    {teacher.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Spin size="small" spinning={loadTeachers} />
            <Form.Item style={{ float: "right", margin: "0" }}>
              <Button type="primary" htmlType="submit" className="submit_button" onClick={handleCancel} loading={addLoading}>
                Done
              </Button>
              <Button type="primary" className="cancel_button" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
