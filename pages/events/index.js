import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { Fragment } from "react";
import {useRouter} from 'next/router'

function AllEvents() {
    const event = getAllEvents()
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

export default AllEvents