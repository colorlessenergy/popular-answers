import Head from 'next/head';
import Image from 'next/image';
import { useState, Fragment } from 'react';

import firebase from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import Nav from '../shared/components/Nav';
import { getAnsweredQuestionsFromLocalStorage, setAnsweredQuestionToLocalStorage } from '../shared/questions';

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

    const getTotalVotes = () => {
        // only two answers exists
        const getIDs = [1, 2];
        const totalVotes = getIDs.reduce((accumulator, ID) => question[ ID ] + accumulator, 0);

        return totalVotes;
    }

    const getClassNameForButtons = (answerID) => {
        // only two answers exists
        const passedInIDAmountOfVotes = question[ answerID ];
        let findSecondID;
        if (answerID === 1) {
            findSecondID = 2;
        } else {
            findSecondID = 1;
        }
        const secondIDAmountOfVotes = question[ findSecondID ];

        if (passedInIDAmountOfVotes < secondIDAmountOfVotes) {
            return 'button-red';
        } else {
            return 'button-green';
        }

    }

    let totalVotes = null;
    if (isQuestionAnswered) {
        totalVotes = getTotalVotes();
    }

    const populateNextQuestion = () => {
        setAnsweredQuestionToLocalStorage(question.id);
        setIsQuestionAnswered(false);
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
                                            key={ answer.id }
                                            onClick={ isQuestionAnswered === false ? (() => handleButtonClick({ questionID: question.id, answerID: answer.id })) : (undefined) }
                                            className={`button text ${ isQuestionAnswered ? (getClassNameForButtons(answer.id)) : ("") }`}>
                                            { answer.text }
                                        </button>
                                    );
                                }) }
                            </div>
                        </div>
                ) : (null) }

                { isQuestionAnswered ? (
                    <Fragment>
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

                        <div className="flex justify-content-center align-items-center mt-2">
                            <div
                                onClick={ populateNextQuestion }
                                className="text text-bold mr-1">
                                next question 
                            </div>

                            <Image
                                src="/assets/right-angle.svg"
                                alt="right angle"
                                width={ 15 }
                                height={ 15 } />
                        </div>
                    </Fragment>
                ) : (null) }
            </div>
        </div>
    );
}
