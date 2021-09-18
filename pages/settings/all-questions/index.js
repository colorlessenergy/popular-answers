import Nav from '../../../shared/components/Nav';
import Link from 'next/link';

import firebase from '../../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function AllQuestions () {
    const [ questions, loading, error ] = useCollection(
        firebase.firestore().collection('questions'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    return (
        <div className="container">
            <Nav includeHomePage={ true } />
            <h1 className="text text-bold">
                all questions
            </h1>

            { questions && questions.docs.map(doc => {
                const question = doc.data();
                return (
                    <Link
                        key={ doc.id }
                        href={`/settings/all-questions/${ doc.id }`}>
                        <a className="text text-underline d-block mb-2">
                            { question.question }
                        </a> 
                    </Link>
                )
            }) }
        </div>
    );
}