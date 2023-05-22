//this page only catched 1 dynamic path, not more than one
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { getEventById, getFeaturedEvents } from "@/helpers/api-utils";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Head from "next/head";
import Comments from "@/components/input/comments";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    //this is reached for pages pre-rendering when the request reached the server
    return <p className="center">Loading</p>;
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        {/* the meta shows up in Google Search Results */}
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  //here we are only pre-rendering the pages that are features, the rest are pre-rendered when a request reaches the server
  //so we specify ths id's of the features event pages here
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetailPage;
