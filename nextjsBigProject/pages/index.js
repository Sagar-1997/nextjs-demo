import Head from "next/head";
//this is use for add element in head tag
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb"; // if we use import which we use in getstaticprops or path or serversideprops then it will not the part for client side bundle
import { Fragment } from "react";
// const Dummy_data = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image: "https://cdn.britannica.com/93/94493-050-35524FED/Toronto.jpg",
//     address: "Some address 5, 12345 smart city",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image: "https://cdn.britannica.com/93/94493-050-35524FED/Toronto.jpg",
//     address: "Some address 10, 12345 smart city",
//   },
// ];
const Homepage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>MeetUps</title>
        <meta name="description" content="List of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};
//we will use this function only with pages and it used for static data generation for
//pre-rendering process
//it will run for every request
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: Dummy_data,
//     },
//   };
// }
//it will fetch data during build time
//and re validate the page after some time
export async function getStaticProps() {
  //from API or file system
  const client = await MongoClient.connect(
    "mongodb+srv://Sagar_1997:sagar123@cluster0.rblqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();
  //collection is just like table and document is like single row
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray(); //it will return all the documents from collection
  client.close();
  return {
    props: {
      meetups: meetups.map((meet) => ({
        title: meet.title,
        address: meet.address,
        image: meet.image,
        id: meet._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default Homepage;
