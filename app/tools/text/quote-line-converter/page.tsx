'use client';
import { useState } from 'react';

const Home = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [quoteType, setQuoteType] = useState('single');
    const [trimWhitespace, setTrimWhitespace] = useState(false);

    const processText = () => {
        // split the input text into array of lines
        const lines = inputText.replace(/\r\n/g, '\n').split('\n');

        let quote = '';
        switch (quoteType) {
            case 'single':
                quote = "'";
                break;
            case 'double':
                quote = '"';
                break;
            default:
                quote = '';
        }
        // add single quotes to each line
        const processedLines = lines.map((line) => {
            const trimmedLine = trimWhitespace ? line.trim() : line;
            return `${quote}${trimmedLine}${quote}`;
        });

        // output the processed lines
        setOutputText(processedLines.join(','));
    };

    return (
        <div className='flex flex-col'>
            <div className="w-full grow">
                <h1 className="text-2xl">Quote line converter</h1>
                <textarea
                    className="mt-4 bg-black dark:bg-black text-white dark:text-white p-4 w-full h-64 mb-2"
                    placeholder="Please enter the text you want to process..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
            </div>
            <div className='grid grid-cols-4 gap-4 mt-2'>
                <div className="col-span-3">
                    <select
                        className="mr-2 p-2 border border-gray-300 rounded bg-gray dark:bg-gray-800 text-black dark:text-white"
                        value={quoteType}
                        onChange={(e) => setQuoteType(e.target.value)}
                    >
                        <option value="single">Single Quotes</option>
                        <option value="double">Double Quotes</option>
                        <option value="">No Quotes</option>
                    </select>
                    <label className="text-sm p-2 border border-gray-300 rounded bg-gray dark:bg-gray-800">
                        <input
                            type="checkbox"
                            name="trimWhitespace"
                            className="mr-1"
                            checked={trimWhitespace}
                            onChange={() => setTrimWhitespace(!trimWhitespace)}
                        />
                        Trim Whitespace
                    </label>
                </div>
                <div>
                    <button onClick={processText} className='bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded'>Convert</button>
                </div>
            </div>
            <div className="w-full grow">
                <textarea
                    className="bg-black dark:bg-black text-white dark:text-white p-4 w-full h-64 mt-4"
                    placeholder="The processed text will appear here..."
                    value={outputText}
                    readOnly
                />
            </div>
        </div>
    );
};

export default Home;
