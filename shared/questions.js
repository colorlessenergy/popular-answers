export const getAnsweredQuestionsFromLocalStorage = () => {
    if (!localStorage.getItem('answeredQuestions')) {
        localStorage.setItem('answeredQuestions', JSON.stringify([]));
    }

    return JSON.parse(localStorage.getItem('answeredQuestions'));
}