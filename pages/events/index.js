import { getAllEvents } from "../../helpers/api-util";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { Fragment } from "react";
import { useRouter } from 'next/router'

function AllEvents(props) {
    const event = props.events
    const router = useRouter();
    function findEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventHandler}/>
            <EventList items={event}/>
        </Fragment>
    );
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}

export default AllEvents