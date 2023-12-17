'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ClockHand from "./clockhand";

const Clock = ({ dialRadius = 100, hourHandLength = 68, minuteHandLength = 85, secondHandLength = 85, initTime = new Date() }) => {
    const [time, setTime] = useState(initTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => new Date(prevTime.getTime() + 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center">
            <motion.svg
                className="mx-auto"
                width={dialRadius * 2}
                height={dialRadius * 2}
                viewBox={`0 0 ${dialRadius * 2} ${dialRadius * 2}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Clock Face */}
                <circle cx={dialRadius} cy={dialRadius} r={dialRadius * 0.9} fill="#fff" stroke="#333" strokeWidth="2" />
                {/* Second Hand */}
                {/* <ClockHand
                    type="second"
                    length={secondHandLength}
                    color="#f00"
                    thickness="2"
                    initTime={time}
                /> */}

                {/* Minute Hand */}
                <ClockHand
                    type="minute"
                    length={minuteHandLength}
                    color="#333"
                    thickness="3"
                    initTime={time}
                />
                {/* Hour Hand */}
                <ClockHand
                    type="hour"
                    length={hourHandLength}
                    color="#333"
                    thickness="4"
                    initTime={time}
                />
                {/* Clock Numbers */}
                {Array.from({ length: 12 }).map((_, index) => {
                    const numberRotation = (index + 1) * 360 / 12;
                    const numberX = dialRadius + (dialRadius * 0.8) * Math.sin(numberRotation * (Math.PI / 180));
                    const numberY = dialRadius - (dialRadius * 0.8) * Math.cos(numberRotation * (Math.PI / 180));

                    return (
                        <text
                            key={index}
                            x={numberX}
                            y={numberY}
                            fill="#333"
                            fontSize="12"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {index + 1}
                        </text>
                    );
                })}
                {/* Digital Clock */}
                <text
                    x={dialRadius}
                    y={dialRadius * 1.5}
                    fill="#333"
                    fontSize="16"
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    {time.toLocaleTimeString()}
                </text>
            </motion.svg>
        </div>
    );
};

export default Clock;
