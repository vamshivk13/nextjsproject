import React from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetUpDetailPage({ meeting }) {
  const router = useRouter();

  return (
    <MeetupDetail
      id={meeting.id}
      title={meeting.title}
      address={meeting.address}
      image={meeting.image}
    />
  );
}

export default MeetUpDetailPage;
export async function getStaticPaths() {
  const dbUrl =
    "mongodb+srv://Vamshi:vk123kar@cluster0.yglo7.mongodb.net/meetups?retryWrites=true&w=majority";

  const connection = await MongoClient.connect(dbUrl);
  const db = connection.db();
  const meetupCollection = db.collection("meetups");
  const meetupIds = await meetupCollection.find({}, { _id: 1 }).toArray();
  connection.close();

  return {
    fallback: false,
    paths: meetupIds.map((item) => {
      return {
        params: {
          meetupid: item._id.toString(),
        },
      };
    }),
  };
}
export async function getStaticProps(context) {
  console.log(context);
  const meetupid = context.params.meetupid;
  const dbUrl =
    "mongodb+srv://Vamshi:vk123kar@cluster0.yglo7.mongodb.net/meetups?retryWrites=true&w=majority";
  const connection = await MongoClient.connect(dbUrl);
  const db = connection.db();
  const meetupCollection = db.collection("meetups");
  const item = await meetupCollection.findOne({ _id: ObjectId(meetupid) });
  connection.close();
  return {
    props: {
      meeting: {
        image: item.image,
        id: item._id.toString(),
        address: item.address,
        title: item.title,
      },
    },
  };
}
