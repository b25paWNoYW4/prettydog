'use client';
import dynamic from 'next/dynamic';

const Clock = dynamic(() => import('../../../components/clock'), { ssr: false })

const cities = [
    { name: 'Los Angeles', timeZone: 'America/Los_Angeles', utcOffset: '-8' },
    { name: 'New York', timeZone: 'America/New_York', utcOffset: '-5' },
    { name: 'London', timeZone: 'Europe/London', utcOffset: '+0' },
    { name: 'Paris', timeZone: 'Europe/Paris', utcOffset: '+1' },
    { name: 'Moscow', timeZone: 'Europe/Moscow', utcOffset: '+3' },
    { name: 'Dubai', timeZone: 'Asia/Dubai', utcOffset: '+4' },
    { name: 'Beijing', timeZone: 'Asia/Shanghai', utcOffset: '+8' },
    { name: 'Singapore', timeZone: 'Asia/Singapore', utcOffset: '+8' },
    { name: 'Tokyo', timeZone: 'Asia/Tokyo', utcOffset: '+9' },
];

export const metadata = {
    title: 'Clock',
};

export default function Page() {
    const time = new Date();

    return (
        <div className="flex grid grid-cols-3 justify-between h-screen">
            {cities.map(city => (
                <div key={city.name} className='flex flex-col'>
                    <div>
                        <h2 className="text-center">{city.name}</h2>
                        <Clock dialRadius={100} initTime={new Date(time.toLocaleString("en-US", { timeZone: city.timeZone }))} />
                    </div>
                    <div className="text-center">
                        <p>UTC {city.utcOffset}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
