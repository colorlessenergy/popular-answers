export const getAnsweredQuestionsFromLocalStorage = () => {
    if (!localStorage.getItem('answeredQuestions')) {
        localStorage.setItem('answeredQuestions', JSON.stringify([]));
    }

    return JSON.parse(localStorage.getItem('answeredQuestions'));
}

export const setAnsweredQuestionToLocalStorage = (questionID) => {
    let answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions'))
    answeredQuestions.push(questionID);

    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
}


export const getTotalVotes = (question) => {
    // only two answers exists
    const getIDs = [1, 2];
    const totalVotes = getIDs.reduce((accumulator, ID) => question[ ID ] + accumulator, 0);

    return totalVotes;
}

export const getClassNameForButtons = ({ question, answerID }) => {
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