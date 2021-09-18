import Head from 'next/head';
import Image from 'next/image';
import { useState, Fragment, useEffect } from 'react';

import firebase from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import Nav from '../shared/components/Nav';
import { getAnsweredQuestionsFromLocalStorage, setAnsweredQuestionToLocalStorage, getTotalVotes, getClassNameForButtons } from '../shared/questions';

export default function Home() {
    const [ questions, loading, error ] = useCollection(
        firebase.firestore().collection('questions'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    let [ isQuestionAnswered, setIsQuestionAnswered ] = useState(false);
    useEffect(() => {
        if (isQuestionAnswered === false) {
            setQuestion(getQuestion());
        }
    }, [ questions, isQuestionAnswered ]);

    useEffect(() => {
        if (questions && question) {
            const updatedQuestion = questions.docs.find(questionFromFirestore => questionFromFirestore.id === question.id);
            setQuestion({
                id: updatedQuestion.id,
                ...updatedQuestion.data()
            });
        }
    }, [ questions ]);

    let [ question, setQuestion ] = useState(null)
    const getQuestion = () => {
        if (questions) {
            const answeredQuestions = getAnsweredQuestionsFromLocalStorage();
            for (let i = 0; i < questions.docs.length; i++) {
                if (!answeredQuestions.includes(questions.docs[i].id)) {
                    return {
                        id: questions.docs[i].id,
                        ...questions.docs[i].data()
                    }
                }
            }
        }
    }

    const handleButtonClick = (answerID) => {
        setAnsweredQuestionToLocalStorage(question.id); 
        setIsQuestionAnswered(true);
        firebase.firestore().collection('questions').doc(question.id).update({
            [ answerID ]: firebase.firestore.FieldValue.increment(1)
        })
        .catch(error => {
            console.error("Error updating document: ", error);
        });
    }

    let totalVotes = null;
    if (isQuestionAnswered) {
        totalVotes = getTotalVotes(question);
    }

    const populateNextQuestion = () => {
        setIsQuestionAnswered(false);
        setQuestion(getQuestion());
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
                                            onClick={ isQuestionAnswered === false ? (() => handleButtonClick(answer.id)) : (undefined) }
                                            className={`button text ease-background-color ${ isQuestionAnswered ? (getClassNameForButtons({ question, answerID: answer.id })) : ("") }`}>
                                            { answer.text }
                                        </button>
                                    );
                                }) }
                            </div>
                        </div>
                ) : (loading ? (
                    <div className="text-medium mt-3">
                        Loading...
                    </div>
                ) : (
                    <div className="text-medium text-bold mt-3">
                        there are no more questions at this time come back later. 
                    </div>
                )) }

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

                        <button className="flex justify-content-center align-items-center mlr-auto mt-2">
                            <div
                                onClick={ populateNextQuestion }
                                className="text text-bold mr-1">
                                next question 
                            </div>

                            <svg className="angle-right" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM7 9H8V7H7V9Z" fill="black"/>
                            </svg>
                        </button>
                    </Fragment>
                ) : (null) }
            </div>
        </div>
    );
}
