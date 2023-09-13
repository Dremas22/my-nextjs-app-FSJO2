
import Button from '../ui/button.js'
import styles from './event-item.module.css'
import DateIcon from '../icons/date-icon.js';
import AddressIcon from '../icons/address-icon.js';
import ArrowRightIcon from '../icons/arrow-right-icon.js';

function EventItem(props) {
    const { image, title, date, location, id } = props;

    const readableDate = new Date(date).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formatAddress = location ? location.replace(',', '\n') : 'Location not available'; 
    const exploreLink = `/events/${id}`;

    return (
        <li className={styles.item}>
            <img src={'/' + image} alt={title} />
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h1>{title}</h1>
                    <div className={styles.date}>
                        <DateIcon />
                        <time>{readableDate}</time>
                    </div>
                    <div className={styles.address}>
                        <AddressIcon />
                        <address>
                            {formatAddress}
                        </address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button link={exploreLink}>
                        <span >Explore event</span>
                        <span className={styles.icon}><ArrowRightIcon /></span>
                        </Button>
                </div>
            </div>
        </li>
    );
}

export default EventItem;
