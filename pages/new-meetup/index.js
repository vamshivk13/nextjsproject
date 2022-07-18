import React from "react";
import Head from "next/head";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
function NewMeetUp() {
  async function onAddMeetupHandler(enteredMeetupData) {
    const res = await fetch("/api/new-meeting", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resp = await res.json();
  }
  return (
    <>
      <Head>
        <title>Add Meetup NextJs React</title>
        <meta name="description" content="add a meetup"></meta>
      </Head>
      <NewMeetUpForm onAddMeetup={onAddMeetupHandler} />;
    </>
  );
}

export default NewMeetUp;
