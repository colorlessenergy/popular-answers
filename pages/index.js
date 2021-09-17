import Head from 'next/head';
import Image from 'next/image';

import firebase from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import Nav from '../shared/components/Nav';

export default function Home() {
    const [ questions, loading, error ] = useCollection(
        firebase.firestore().collection('questions'),
        {
        snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return (
        <div>
            <Head>
                <title>popular answers</title>
                <meta name="description" content="popular answers" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />
                <div className="question flex align-items-center justify-content-center">
                    pancakes or waffles
                </div>

                <div className="flex justify-content-between">
                    <button className="button button-green text">
                        pancakes
                    </button>

                    <button className="button button-red text">
                        waffles
                    </button>
                </div>

                <div className="flex justify-content-between mt-2">
                    <div className="text-large text-bold">
                        60%
                    </div>

                    <div className="text-large text-bold">
                        40%
                    </div>
                </div>

                <div className="flex justify-content-between">
                    <div className="text-medium">
                        24 votes
                    </div>

                    <div className="text-medium">
                        16 votes
                    </div>
                </div>

                <div className="flex justify-content-center text-medium text-bold mt-1">
                    40 total votes
                </div>

                <div className="flex justify-content-center align-items-center mt-2">
                    <div className="text text-bold mr-1">
                        next question 
                    </div>

                    <Image
                        src="/assets/right-angle.svg"
                        alt="right angle"
                        width={ 15 }
                        height={ 15 } />
                </div>
            </div>
        </div>
    );
}
