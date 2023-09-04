import EventList from "/components/events/event-list"
import { getFeaturedEvents } from "../dummy-data"

function Homepage() {
  const futureEvents = getFeaturedEvents()

  return (
    <div>
      <EventList items={futureEvents} />
    </div>
  )
}
export default Homepage