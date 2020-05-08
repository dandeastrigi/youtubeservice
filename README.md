#### YoutubeService

This is a search tool using youtube API and JavaScript

You have to configure youtube data api on *./service/.env.json*.

The configured key has a quotas, take care when your running into development.

See more at
[Google api console](https://googleapis.dev/)
[Youtube Data API](https://developers.google.com/youtube/v3)


#### Before start
```
Enter on front-end and service directories and run
$ npm install
```

#### Running application
```
On root repo directory run
$ npm run dev
```

#### Configurations
This project has some configurations, we see about *youtube api key* and *.env.json* file before, if you take a look on
*.env.json* file inside of service directory you see the follow content:
```
{
  "youtubeApiKey": "YOUR_YOUTUBE_API_KEY",
  "port": 4000,
  "logPath": "./cache",
  "logFile": "youtube-service.log",
  "maxResults": 2
}
```

Inside of front-end directory you see this config:
```
REACT_APP_SERVICE_PORT=4000
REACT_APP_SERVICE_URL=http://localhost
```

You can change any of this content, or add more for features


#### To do
```
1. Use some database on service to
    1.1 Save user and userConfig on service
    1.2 Save and load additional informations

2. Play video on list following the userConfig rules

3. Video listing improvements UI/UX

4. Load informations from video list on information modal
```

#### Monitoring
Take a look to log file of you have configured on the *.env.json* file