# Activ8or Version 2.0

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

## Activ8or History, an Aside

Activ8or was born of years of AppDelegates' development for the front and back-ends of Event Marketing installations. We've implemented
systems in a variety of languages and on a variety of platforms. Common requirements came up in many, if not all, of these jobs: guest registration, 
stats, experience completion (electronic and/or physical takeaway), leaderboards and more. We've done jobs where the back-end was in the 
activation itself (especially with notoriously bad venue internet), where the back-end was in the cloud, or a mix of both (relay mode). Activ8or supports
all these modes and more.

## Definitions

The Activ8or architecture involves several entities stored in its database as explained here. All entities include expansion fields ("metadata") to add whatever
information the developer wants to include that we didn't think of.

### Guest

A Guest is exactly that, someone visiting the activation. The guest entity includes fields for name, contact info, email and more. Guests are typically registered
before entering the activation, though this is not a requirement. When a Guest is registered, they are assigned a univerally unique ID (UUID) which is then used
to refer to them throughout the API. This same code could be used in a RFID card or in a barcode for activations that make us of such things.

### Experience

An Experience is a record of one or more guests going through an activation. For example, if jenny@test.com and bob@test.com go through "Sam's Super VR Dunk Tank", then an
Experience entity is created that includes a link to the Experience Configuration (see below), the Guests involved, the date/time, and media generated (e.g. a photo takeaway),
possibly a score, whether the Experience is complete or in process (for multi-stage experiences), etc. Periodically, Activ8or checks for new completed Experiences and
will send an electronic takeaway ("Hey Jenny, hope you had fun in the dunktank!"). Electronic completion is completely optional and configurable.

Experiences that are games will often have scores associated with them. These scores can be read through the API and presented in a digital signage leaderboard. Check out
our Leaderboard Demo for an example.

### Experience Configuration

Each Experience in your activation has a configuration. This includes the name ("Sam's Super VR Dunk Tank"), queueing settings (e.g. how long a queue, whether to notify
Guests when their spot is available) and completion settings (e.g. send email, send sms, do nothing).

### Queue Entry

A Queue Entry includes a pointer to a Guest and an Experience Configuration. Activ8or regularly monitors the length of the queue and can be configured
to send out notification, usually text messages, to let Guests know when they're "up". The Queue Entries can be read via the API to create 
digital signage waiting lists.

### Media

Activ8or supports the uploading of any binary files as Media. Typically this is used for activation photos or videos, but it can be used for Guest avatars and even 
release signatures.

### Data Object

Data Objects are a simple Key/Value store that can be useful to networked experience developers. Data Objects can be subscribed to
via SocketIO (as can other data types) for realtime data sharing between Experiences (think racing data in a VR racing game on multiple
systems).

### Settings

Also a Key/Value store, but Settings are used for Activ8or configuration. This can include information like API keys for
email services, email templates, and more.

### Users

If security is turned on, then Users are entities with login rights to Activ8or.  



