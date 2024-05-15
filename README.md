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

## Additional info
### Concepts
```https
https://www.quill.org/api/v1/concepts.json
```
### Settings
Looking for {$projectId}, but I dont know where it is. This is the value it was for me: `XVeKI40fXyEqHE1Is9btaglTLTAaMHzQ`.
```https
https://cdn.segment.com/v1/projects/{$projectId}/settings
```