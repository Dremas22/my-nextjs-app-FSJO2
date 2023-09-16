import EventSummary from '../../components/event-detail/event-summary'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import { Fragment } from 'react'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
//import ErrorAlert from '@/components/ui/error-alert'
import Head from 'next/head';
import Comments from '../../components/input/comments';

function EventDetail(props) {

  const event = props.selectedEvent

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content={event.description}
        />
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
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventId: event.id } }))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default EventDetail