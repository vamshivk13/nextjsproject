import React from "react";
import styles from "./MeetupDetail.module.css";
function MeetupDetail(props) {
  return (
    <section className={styles.detail}>
      <img src={props.image} alt={props.title}></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
    </section>
  );
}

export default MeetupDetail;
