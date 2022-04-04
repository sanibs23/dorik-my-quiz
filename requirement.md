## Quiz App Builder

There will be two views of the application. Dashboard view for quiz creator and a visitor view.

## Requirements

**Dashboard:**

1.  The homepage shows a list of all quizzes by the titles that have been created by me.
2.  Take me to another page to create a new quiz providing a quiz title and its questions and answers (A quiz can have multiple questions and answers).  
    For example:
    1.  Title: Quiz 1
        \=> Question 1  
          Answer 1  
          Answer 2  
          Answer 3
        \=> Question 2  
          Answer 1  
          Answer 2  
          Answer 3
        \=> Question 3  
          Answer 1  
          Answer 2  
          Answer 3
        So on...
3.  I should be able to add text and optionally an image to the quiz questions. No need to handle file upload, just allow adding images by URL.
4.  Based on the question type, I should be able to add my options/choices for the answer.
    1.  Handle single selection, multiple selections
    2.  Add a checkbox with the option input to mark it/them as a correct answer(s).
    3.  Each option will contain a text and optionally an image
    4.  An input field to add points for correct answers.
    5.  I should be allowed to add as many options as I can but not less than two.
5.  Should store config for layout eg: one question per page or all questions on the same page.
6.  The questions should be sortable by dragging up and down
7.  I should be able to edit the questions/answers/points/quiz title

**Quiz View**

1.  Visiting a view URL (\`/view/{quizId}\`) I should view the quiz as a visitor
2.  The layout can be either all questions on a single page or one question per page based on the config you stored while making the quiz.
3.  I should see my score at the end of answering all questions. No need to store scores into a user profile.

Use any of the CSS UI libraries to make the layout look nice. Or you can use any React UI Component library. We expect you to use React Router, React Hooks, React DnD, etc.  
Use localStorage/indexedDB to persist data on page reload.
