const dbVersion = 1;
/**
 * Creating a Quiz database on IndexDB
 */
export default () => {
    const dbName = "Quiz";
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (e) => {
        console.log(`Database error for ${dbName}`, e);
    };

    request.onsuccess = () => {
        console.log(`Database Opened for ${dbName}`);
    };

    request.onupgradeneeded = (e) => {
        const db = e.target.result;
        // Collection name (we've two collection one for quiz and other one for question)
        db.createObjectStore("quiz", {
            keyPath: "id",
        });
        db.createObjectStore("question", {
            keyPath: "id",
        });
    };

    return request;
};