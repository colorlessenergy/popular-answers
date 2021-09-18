import { useRouter } from 'next/router';
import firebase from '../../../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

import { getTotalVotes, getClassNameForButtons } from '../../../shared/questions';

import Nav from '../../../shared/components/Nav';

export default function Question () {
    const router = useRouter();
    const { id } = router.query;

    const [ questionData, loading, error ] = useDocument(
        firebase.firestore().doc(`questions/${ id }`),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    let question = null;
    let totalVotes = null;
    if (questionData) {
        question = questionData.data();
        totalVotes = getTotalVotes(question);
    }

    return (
        <div className="container">
            <Nav includeHomePage={ true } />
            <h1 className="text text-bold">
                results
            </h1>
            { question ? (
                <div>
                    <div className="question flex align-items-center justify-content-center">
                        { question.question }
                    </div>

                    <div className="flex justify-content-between">
                        { question.answers.map(answer => {
                            return (
                                <button
                                    key={ answer.id }
                                    className={`button text ease-background-color ${ getClassNameForButtons({ question, answerID: answer.id }) }`}>
                                    { answer.text }
                                </button>
                            );
                        }) }
                    </div>

                    <div className="flex justify-content-between mt-2">
                        { question.answers.map((answer, index) => { 
                            return (
                                <div
                                    key={ answer.id }
                                    className={ index === question.answers.length-1 ? "text-align-right" : "" }>
                                    <div className="text-large text-bold">
                                        { (question[answer.id] / totalVotes * 100).toFixed(2) }%
                                    </div>

                                    <div className="text-medium">
                                        { question[answer.id] } votes
                                    </div>
                                </div>
                            );
                        }) }
                    </div>
                    <div className="flex justify-content-center text-medium text-bold mt-1">
                        { totalVotes } total votes
                    </div>
                </div>
            ) : (loading ? (
                <div className="text-medium mt-3">
                    Loading...
                </div>
            ) : (null)) }
        </div>
    );
}