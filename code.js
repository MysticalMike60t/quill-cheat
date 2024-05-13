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

    document.addEventListener("DOMContentLoaded", function() {
        const quillButton = document.querySelector(".regen-button");
        if (quillButton) {
            quillButton.addEventListener("click", start);
        } else {
            console.error("Quill button not found.");
        }
    });

    function getUrlParams(url) {
      const params = new URLSearchParams(url);
      const studentId = params.get("student");
      return { studentId };
    }

    function displayQuestionsAndAnswers(questionSet) {
      const contentDiv = document.querySelector(".student-container");
      const question = questionSet.question;
        const attempts = questionSet.attempts;
        const questionDiv = document.createElement("div");
        questionDiv.textContent = `Question: ${question}`;
        contentDiv.appendChild(questionDiv);
        const regenButton = document.createElement("button");
        regenButton.className = "regen-button";
        contentDiv.appendChild(regenButton);
        const separator = document.createElement("hr");
        contentDiv.appendChild(separator);
    }

    function start() {
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
                    const contentDiv = document.querySelector(".student-container");
                    const answerDiv = document.createElement("div");
                    answerDiv.textContent = `Answer: ${answer.text}`;
                    contentDiv.appendChild(answerDiv);
                });
            })
                .catch((error) => {
                console.error("Error fetching data:", error);
            });

            const questionSet = jsonData.currentQuestion;
            displayQuestionsAndAnswers(questionSet);
        })
            .catch((error) => {
            console.error("Error fetching JSON data:", error);
        });
    }

    start();
  })();
