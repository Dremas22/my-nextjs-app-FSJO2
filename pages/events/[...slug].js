
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//import useSWR from 'swr';
import axios from 'axios'

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';


function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const [error, setError] = useState(null);

  const filterData = router.query.slug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://nextjs-project-6ca04-default-rtdb.firebaseio.com/events.json'
        );

        const data = response.data;
        if (data) {
          const events = [];

          for (const key in data) {
            events.push({
              id: key,
              ...data[key],
            });
          }
          setLoadedEvents(events);
        } else {
          console.error('Invalid data format from API:', response.data);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  // Handle the case where no events are found for the chosen filter
  if (error) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Error loading data: {error.message}</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // Handle the case where data is still loading
  if (!loadedEvents.length) {
    return <p className='center'>Loading...</p>;
  }

  // Parse filter data
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // Check if the selected filter is valid
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    )
  });

  // Handle the case where no events match the selected filter
  if (filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // Display the filtered events
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
