# Structure / Documentation
## Step 1
```url
https://www.quill.org/connect/#/play/lesson/{$id}?activities={00}&student={00}
```
- Returns questions
- jsonData.questions = {Objects}
- Example structure: jsonData.questions[0].key
- Question key is then used for requests for json files regarding the individual question

<!-- Not Needed: https://www.quill.org/api/v1/questions/{$questionId}.json
	Returns question data
-->

## Step 2
### Written Responses
```url
https://cms.quill.org/questions/{$questionId}/responses
```
### Multiple Choice Responses
https://cms.quill.org/questions/{$questionId}/multiple_choice_options