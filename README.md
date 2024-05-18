<pre>
  ____        _  _ _       ____ _                    _   
 / __ \      (_)| | |    / ____| |                  | |  
| |  | |_   _ _ | | |   | |    | |__   ___   __ _ __| |_ 
| |  | | | | | || | |   | |    | '_ \ / _ \ / _` |__  __|
| |__| | |_| | || | |   | |____| | | |  __/| (_| |  | | 
 \___\_\\__,_|_||_|_|    \_____|_| |_|\___| \__,__|  \__|
</pre>
<hr />

# Structure / Documentation
## Requirements
1. Google chrome or FireFox (only tested it on these two)
2. [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
	- If you cannot get Tampermonkey, use a "Bookmarklet", which is described [here](#bookmarklet)
## Key
> `>` = Setting a value instead of using it
> <br/>
> `00` = Value not important
> <br/>
> `{$*}` = Inputted value
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

## Bookmarklet
In development....

# Other Projects
[Edpuzzle skipper](https://cadenmf.com/api) (adding2210 made it, but I edited it for other use)
