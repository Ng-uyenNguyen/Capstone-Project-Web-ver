import { CaretDownFilled } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "./DropDownBox.module.scss";
const DropDownBox = ({ selected, setSelected, classes }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdown__btn}>
        {selected}
        <CaretDownFilled onClick={(e) => setIsActive(!isActive)} />
      </div>
      {isActive && (
        <div className={styles.dropdown__content}>
          {classes.map((option) => (
            <div
              className={styles.dropdown__content__item}
              onClick={(e) => {
                setSelected(option.class_name);
                setIsActive(false);
              }}
            >
              {option.class_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownBox;
