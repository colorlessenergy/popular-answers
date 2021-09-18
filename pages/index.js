import Head from 'next/head';
import Image from 'next/image';

import firebase from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import Nav from '../shared/components/Nav';
import { getAnsweredQuestionsFromLocalStorage } from '../shared/questions';

export default function Home() {
    const [ questions, loading, error ] = useCollection(
        firebase.firestore().collection('questions'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );


    let question = null;
    if (typeof localStorage !== 'undefined' && questions) {
        const answeredQuestions = getAnsweredQuestionsFromLocalStorage();
        for (let i = 0; i < questions.docs.length; i++) {
            if (!answeredQuestions.includes(questions.docs[i].id)) {
                question = {
                    id: questions.docs[i].id,
                    ...questions.docs[i].data()
                }

                break;
            }
        }
    }

    const [ isQuestionAnswered, setIsQuestionAnswered ] = useState(false);
    const handleButtonClick = ({ questionID, answerID }) => {
        firebase.firestore().collection('questions').doc(questionID).update({
            [ answerID ]: firebase.firestore.FieldValue.increment(1)
        })
        .then(() => {
            setIsQuestionAnswered(true);
        })
        .catch(error => {
            console.error("Error updating document: ", error);
        });
    }

    return (
        <div>
            <Head>
                <title>popular answers</title>
                <meta name="description" content="popular answers" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container">
                <Nav />

                { question ? (
                       <div>
                            <div className="question flex align-items-center justify-content-center">
                                { question.question }
                            </div>

                            <div className="flex justify-content-between">
                                { question.answers.map(answer => {
                                    return (
                                        <button
                                            onClick={ () => handleButtonClick({ questionID: question.id, answerID: answer.id }) }
                                            className="button text">
                                            { answer.text }
                                        </button>
                                    );
                                }) }
                            </div>
                        </div>
                ) : (null) }

                {/* <div className="flex justify-content-between mt-2">
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
                </div> */}
            </div>
        </div>
    );
}
