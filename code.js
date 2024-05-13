// ==UserScript==
// @name         Quill.org Cheat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Get answers for Quill.org
// @author       Caden Finkelstein
// @match        https://www.quill.org/connect/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
  
    function getUrlParams(url) {
      const params = new URLSearchParams(url);
      const studentId = params.get("student");
      return { studentId };
    }
  
    function displayQuestionsAndAnswers(questionSet) {
      const contentDiv = document.querySelector(".student-container");
      questionSet.forEach(questionData => {
        const question = questionData.prompt;
        const attempts = questionData.attempts;
        const answers = attempts.map(attempt => attempt.response.text);
        const questionDiv = document.createElement("div");
        questionDiv.textContent = `Question: ${question}`;
        contentDiv.appendChild(questionDiv);
        answers.forEach(answer => {
          const answerDiv = document.createElement("div");
          answerDiv.textContent = `Answer: ${answer}`;
          contentDiv.appendChild(answerDiv);
        });
        const separator = document.createElement("hr");
        contentDiv.appendChild(separator);
      });
    }
  
    const currentUrl = window.location.href;
    const { studentId } = getUrlParams(currentUrl);
    const jsonUrl = `https://www.quill.org/api/v1/active_activity_sessions/${studentId}.json`;
  
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        const questionId = jsonData.currentQuestion.question;
        const apiUrl = `https://cms.quill.org/questions/${questionId}/responses`;
  
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log("Response:", data);
            data.forEach(answer => {
                console.log("Answer: ", answer.text);
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
  
        const questionSet = jsonData.questionSet;
        displayQuestionsAndAnswers(questionSet);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  })();
  