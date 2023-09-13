
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
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  //const [data, setData] = useState(null);
  const [error, setError] = useState(null)

  const filterData = router.query.slug;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://nextjs-project-6ca04-default-rtdb.firebaseio.com/events.json'
        );

        if (Array.isArray(response.data)) {
          // Ensure that the response data is an array
          setLoadedEvents(response.data);
        } else {
          console.error('Invalid data format from API:', response.data);
          setLoadedEvents();
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setLoadedEvents([]);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://nextjs-project-6ca04-default-rtdb.firebaseio.com/events.json'
  //       );
  //       //setData(response.data);
  //       setLoadedEvents(response.data);
  //     } catch (err) {
  //       setError(err);
  //       setLoadedEvents([]);
  //     }
  //   };

  //   fetchData();
  // }, []);



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


  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }
  
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12) {
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
    );
  });


  if (filteredEvents.length === 0) { // Check the length of filteredEvents
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

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://nextjs-project-6ca04-default-rtdb.firebaseio.com/events.json');
//       setData(response.data);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   fetchData();
//   if (data) {
//     const events = [];

//     for (const key in data) {
//       events.push({
//         id: key,
//         ...data[key],
//       });
//     }

//     setLoadedEvents(events);
//   }
// }, [data]);

// if (!filteredEvents || filteredEvents.length === 0) {
//   return (
//     <Fragment>
//       <ErrorAlert>
//         <p>No events found for the chosen filter!</p>
//       </ErrorAlert>
//       <div className='center'>
//         <Button link='/events'>Show All Events</Button>
//       </div>
//     </Fragment>
//   );
// }

// if (error) {
//   return (
//     <Fragment>
//       <ErrorAlert>
//         <p>Error loading data: {error.message}</p>
//       </ErrorAlert>
//       <div className='center'>
//         <Button link='/events'>Show All Events</Button>
//       </div>
//     </Fragment>
//   );
// }
