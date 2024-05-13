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

  function getQuestionId(jsonData) {
    return jsonData.currentQuestion.question;
  }

  const currentUrl = window.location.href;

  const { studentId } = getUrlParams(currentUrl);
  const jsonUrl = `https://www.quill.org/api/v1/active_activity_sessions/${studentId}.json`;

  fetch(jsonUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      const questionId = getQuestionId(jsonData);

      const apiUrl = `https://cms.quill.org/questions/${questionId}/responses`;

      fetch(apiUrl)
        .then((response) => response.text())
        .then((data) => {
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
})();
