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