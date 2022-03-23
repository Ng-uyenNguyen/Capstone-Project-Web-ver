import React from 'react'
import SchedulerComponent from './SchedulerComponent'
import styles from "./Scheduler.module.scss";
export const SchedulerManagement = () => {
  return (
    <div className={styles.scheduler}>
        <SchedulerComponent/>
    </div>
  )
}

 