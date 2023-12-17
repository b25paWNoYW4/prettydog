'use client';

import { motion, useTime, useTransform } from "framer-motion";

const ClockHand = ({ type = 'second', length = 80, color = '#333', thickness = '2', initTime = new Date() }) => {
    const time = useTime();
    const hours = initTime.getHours();
    const minutes = initTime.getMinutes();
    const seconds = initTime.getSeconds();
    let timePeriod = 60;
    let angle = 0;
    switch (type) {
        case 'hour':
            timePeriod *= 60 * 60;
            angle = (hours + minutes / 60 + seconds / 3600) * (360 / 12);
            break;
        case 'minute':
            timePeriod *= 60;
            angle = (minutes + seconds / 60) * (360 / 60);
            break;
        case 'second':
            angle = seconds * (360 / 60);
            break;
        default:
            break;
    }

    const rotate = useTransform(
        time,
        [0, 1000 * timePeriod],
        [angle, 360 + angle],
        { clamp: false }
    );
    return (
        <motion.line
            x1="50%"
            y1="50%"
            x2="50%"
            y2={`calc(50% - ${length}px)`}
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            style={{ rotate, originX: 0, originY: 1 }}
        />
    );
};

export default ClockHand;