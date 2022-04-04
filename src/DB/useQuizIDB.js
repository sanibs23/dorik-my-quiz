import DB from "./IDB";

const onRequestError = (e) => {
    console.log("Database Error", e);
};

const quizStore = "quiz";
const questionStore = "question";

/**
 * storing quiz to IndexDB
 * @param {Object} quiz - Quiz data to store in IndexDB
 */
export const setQuiz = (quiz) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([quizStore], "readwrite");
        const store = transaction.objectStore(quizStore);
        store.add(quiz);
    };
};

/**
 * Retrieving quiz from IndexDB
 * @param {Function} callback - callback function to invocation with result
 */
export const getQuiz = (callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([quizStore], "readonly");
        const store = transaction.objectStore(quizStore);
        store.getAll().onsuccess = (ev) => {
            callback(ev.target.result);
        };
    };
};

/**
 * Retrieving layout of a quiz by id from IndexDB
 * @param {string} id - Id of the quiz to retrieve
 * @param {Function} callback - callback function to invocation with result
 */
export const getQuizLayoutById = (id, callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([quizStore], "readonly");
        const store = transaction.objectStore(quizStore);
        store.get(id).onsuccess = (ev) => {
            const quiz = ev.target.result;
            callback(quiz?.layout?.value || "single");
        };
    };
};

/**
 * storing question to IndexDB
 * @param {Object} question - question object to save on IndexDB
 */
export const setQuestion = (question) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readwrite");
        const store = transaction.objectStore(questionStore);
        store.add(question);
    };
};

/**
 * Updating question by ID
 * @param {Object} question - question object to update on IndexDB
 * @param {Object} updateId - question id to update on IndexDB
 */
export const updateQuestionById = (question, updateId, callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readwrite");
        const store = transaction.objectStore(questionStore);
        store.get(updateId).onsuccess = (ev) => {
            const targetQuestion = ev.target.result;
            const newData = {
                ...targetQuestion,
                ...question
            };
            store.put(newData);
            callback();
        };
    };
};

/**
 * Retrieving question by quiz id from IndexDB
 * @param {string} quizId - quiz id to retrieve
 * @param {Function} callback - callback function to invocation with result
 */
export const getQuestionByQuizId = (quizId, callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readonly");
        const store = transaction.objectStore(questionStore);
        store.getAll().onsuccess = (ev) => {
            const questions = ev.target.result;
            let payload = [];
            if (Array.isArray(questions)) {
                payload = questions
                    .filter((question) => question.quizId === quizId)
                    .sort((itmA, itmB) => (itmA.order > itmB.order ? 1 : -1));
            }
            callback(payload);
        };
    };
};

/**
 * Retrieving question by id from IndexDB
 * @param {string} questionId - question id to retrieve
 * @param {Function} callback - callback function to invocation with result
 */
export const getQuestionById = (questionId, callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readonly");
        const store = transaction.objectStore(questionStore);
        store.get(questionId).onsuccess = (ev) => {
            callback(ev.target.result);
        };
    };
};

/**
 * Updating order of a question by questionId
 * @param {string} fromQuestionId - From question id to swap order
 * @param {string} toQuestionId - To question id to swap order
 * @param {string} orderTo - To order number to set from question order
 * @param {Function} callback - callback function to invocation with result
 */
export const updateQuestionOrderByQuestionId = (
    fromQuestionId,
    toQuestionId,
    orderTo,
    callback
) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readwrite");
        const store = transaction.objectStore(questionStore);
        store.get(fromQuestionId).onsuccess = (ev) => {
            const fromQuestion = ev.target.result;
            store.get(toQuestionId).onsuccess = (ev) => {
                const toQuestion = ev.target.result;
                toQuestion.order = fromQuestion.order;
                fromQuestion.order = orderTo;
                store.put(fromQuestion);
                store.put(toQuestion);
                callback();
            };
        };
    };
};
/**
 * Getting how much questions are available available by quizId
 * @param {Object} quizId - Quiz id to get the questions
 * @param {Function} callback - callback function to invocation with result
 */
export const countQuestionByQuizId = (quizId, callback) => {
    const request = DB();

    request.onerror = onRequestError;

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([questionStore], "readonly");
        const store = transaction.objectStore(questionStore);
        store.getAll().onsuccess = (ev) => {
            const questions = ev.target.result;
            let payload = [];
            if (Array.isArray(questions)) {
                payload = questions.filter(
                    (question) => question.quizId === quizId
                ).length;
            }
            callback(payload);
        };
    };
};
