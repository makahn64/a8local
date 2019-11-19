# Introducing Activ8or

Activ8or is a collection of open-source apps and libraries designed to simplify the implementation of interactive event marketing installations. Activ8or provides:
- Guest registration.
- Queueing and queue place notification via SMS and Email.
- Experience (activation) logging and email/SMS outreach on completion.
- Experience real-time data sharing (think head-to-head racing game) using websockets or polling.
- Media storage and retrieval for experiences, guest avatars and more.
- Source platform agnostic print queueing.
- Collection of statistics, demographic info, etc. for a given activation/event.
- A suite of example applications such as tablet-based registration, scoreboards, digital signage and more.

Activ8or is open source and fully documented. You can use it as is or modify and add to it as you wish. And you're welcome to help us make Activ8or even better through contributing to the project.

![Image of people using Activ8or](/images/stubhub-ss4-300x169.png)

## Activ8or Components

- **A8local:** a NodeJS (based on SailsJS) server application that provides a REST API for Guest registration, logging Experiences, managing Queues, uploading Media, sending digital takeaways, etc. A8Local can run anywhere NodeJS can, which
is pretty much everywhere at this point.
- **A8ui:** a React based UI for managing A8Local. A8UI allows you to add/manage Guests, Experiences, Queues and Media. It also shows basic reporting such as Guests-per-hour, sent emails, etc.
- **Activ8or Client Sample Apps:** a suite of React and React-native apps for handling common digital experiential use cases. Included are a Guest Registration app for iPad/iPhone, a digital scoreboard and queue app aimed at 16:9 displays, and a Queueing app.
- **Activ8or API Libraries**: initially ES6 Javascript which can be used for React, Angular, Vue, React Native and Ionic. We'll be offering native libs for Swift and Kotlin down the road a bit :). 

Activ8or components are all stand-alone. If you don't like our UI, roll your own. You don't like our apps, ditto. Want to write it in C? Go for it!

## But Will It Run in My Environment?

The core of Activ8or, the A8local server is easy to deploy on any NodeJS-capable supported platform:

- Mac and Linux OS systems including systems as inexpensive as Raspberry Pi and Wandboard.
- PCs running Windows should work, but this is not fully tested (give it a shot!).
- Google Cloud Marketplace single click implementation (coming 4Q2019).
- A Dockerized implementation is available for testing and/or deployment on any platform that supports Linux Node containers (Windows folks, you
feel free to donate a Windows version!).

The processor load for A8local is quite low meaning it can easily run on the same physical hardware as an activation app, if you're looking
to further simplify/cost reduce.

As for the clients, the A8local provides a robust REST API meaning **any** http-capable language can make use of it. Out of the box, we provide
an ES6/Javascript client library and have plans to provide Swift, Kotlin and C# in the near future. Want one in Rust? Go for it, but please donate it back!

