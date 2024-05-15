# Structure / Documentation
## Key
`>` = Setting a value instead of using it
{$*} = Inputted value
## Step 1
```https
https://www.quill.org/connect/#/play/lesson/{>$id}?activities={00}&student={00}
```
```https
https://www.quill.org/api/v1/lessons/{$id}.json
```
- Returns questions
- jsonData.questions = {Objects}
- Example structure: jsonData.questions[0].key
- Question key is then used for requests for json files regarding the individual question
	- jsonData.question[*].key = {>$questionId}

<!-- Not Needed: https://www.quill.org/api/v1/questions/{$questionId}.json
	Returns question data
-->

## Step 2
### Written Responses
```https
https://cms.quill.org/questions/{$questionId}/responses
```
### Multiple Choice Responses
```https
https://cms.quill.org/questions/{$questionId}/multiple_choice_options
```