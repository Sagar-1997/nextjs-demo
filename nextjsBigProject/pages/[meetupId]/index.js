import MeetUpDetail from "../../components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
const MeetUp = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetUpDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  );
};
export async function getStaticPaths() {
  //from API or file system
  const client = await MongoClient.connect(
    "mongodb+srv://Sagar_1997:sagar123@cluster0.rblqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  //collection is just like table and document is like single row
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //it will return all the documents from collection
  //it tell that we want all collections but only Id field
  client.close();
  return {
    fallback: "blocking", //false means all params are present //true means not all params present
    paths: meetups.map((meet) => ({
      params: {
        meetupId: meet._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  //from API or file system
  const client = await MongoClient.connect(
    "mongodb+srv://Sagar_1997:sagar123@cluster0.rblqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  //collection is just like table and document is like single row
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return {
    props: {
      id: meetup._id.toString(),
      image: meetup.image,
      title: meetup.title,
      address: meetup.address,
      description: meetup.description,
    },
  };
}
export default MeetUp;
