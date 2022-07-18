import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
const dummyMeets = [
  {
    id: "m1",
    image:
      "data:image/webp;base64,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",
    title: "meetup1",
    address: "hyderabad",
  },
  {
    id: "m2",
    image:
      "data:image/webp;base64,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",
    title: "meetup2",
    address: "karepalli",
  },
];
function Homepage(props) {
  //   const [meetings, setMeetings] = useState([]);
  //   useEffect(() => {
  //     setMeetings(dummyMeets);
  //   }, []);
  return (
    <div>
      <Head>
        <title>NextJs React</title>
        <meta name="description" content="First nextjs project"></meta>
      </Head>
      <MeetupList meetups={props.meetings} />
    </div>
  );
}

export async function getStaticProps() {
  //any backedend async call
  const dbUrl =
    "mongodb+srv://Vamshi:vk123kar@cluster0.yglo7.mongodb.net/meetups?retryWrites=true&w=majority";

  const connection = await MongoClient.connect(dbUrl);
  const db = connection.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  connection.close();

  return {
    props: {
      meetings: meetups.map((item) => {
        return {
          image: item.image,
          id: item._id.toString(),
          address: item.address,
          title: item.title,
        };
      }),
    },
    revalidate: 1,
  };
}
export default Homepage;
