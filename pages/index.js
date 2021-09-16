import Head from 'next/head'

import firebase from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

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
        </div>
    );
}
