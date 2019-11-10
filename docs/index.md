# Introducing Activ8or

Activ8or is a series of open-source apps and tools designed to simplify the implementation of interactive event marketing installations. Activ8or provides:
- Guest registration.
- Queueing and queue place notification via SMS and Email.
- Experience (activation) logging and email/SMS outreach on completion.
- Experience real-time data sharing (think head-to-head racing game) using websockets or polling.
- Media storage and retrieval for experiences, guest avatars and more.
- Source platform agnostic print queueing.
- Collection of statistics, demographic info, etc. for a given activation.
- Suite of example applications such as tablet-based registration, scoreboards, digital signage and more.

Activ8or is open source and fully documented. You can use it as is or add to it as you wish. Deployment is easy on any NodeJS-capable supported platform:

- Mac and Linux OS systems including systems as inexpensive as Raspberry Pi and Wandboard.
- PCs running Windows should work, but this is not fully tested (give it a shot).
- Google Cloud Marketplace single click implementation (4Q2019).
- A Dockerized implementation is available for testing and/or deployment.

## Activ8or Components

- **A8Local:** a NodeJS (based on SailsJS) server application that provides a REST API for Guest registration, logging Experiences, managing Queues, uploading Media, sending digital takeaways, etc.
- **A8UI:** a React based UI for managing A8Local. A8UI allows you to add/manage Guests, Experiences, Queues and Media. It also shows basic reporting such as Guests-per-hour, sent emails, etc.
- **Activ8or Sample Apps:** a suite of React and React-native apps for handling common digital experiential use cases. Included are a Guest Registration app for iPad/iPhone, a digital scoreboard and queue app aimed at 16:9 displays, and a Queueing app.
- **Activ8or API Libraries**: initially ES6 Javascript which can be used for React, Angular, Vue, React Native and Ionic. We'll be offering native libs for Swift and Kotlin down the road a bit :). 

Activ8or components are all stand-alone. If you don't like our UI, roll your own. You don't like our apps, ditto. Want to write it in C? Go for it!



