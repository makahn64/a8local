# Activ8or Local

## Models
Activ8or makes use of the following models.

| Model  | Usage |
| ---------- | ----- |
| Guest | Information about a single guest including name, email address, demographic info, etc. |
| Experience | Information about an experience. This could be an activation a guest has gone through (game played, photo op, etc.). Experiences can be assigned to a guest either before or after they occur.
| Media | Media are any media file such as a photo, video, or audio clip. Media can be assigned to a variety of models including guests and experiences.
| ExperienceConfig | An experience config are the settings for each experience in your activation. It includes information such as the experience name (e.g. "Super Photo Op"), outreach templates for email, SMS, etc.
| QueueEntry | Each queue entry describes a Guest waiting for an Experience. It includes a pointer to the Guest, their queuing time, and which Experience they are waiting for. |
| QueueConfig | The settings for each Queue managed by Activ8or. This can include name, notification mechanism (SMS, email), etc. |
| Event | Event entries include the information for a particular event at which an activation is run and includes things like the date, event name, a pointer to the venue  and more. |
| User | User entries are for administrative and client users of Activ8or. These are logins to access the UI, typically.
| Venue | A specific venue for the activation. Typically includes the name and possibly location within the venue, when appropriate



## UDP System Identification
In many cases, it is preferable to have the Activ8or server use a dynamic IP address. In these cases, determining the
IP address of the server can be a hassle, especially with non-technical folks working the install. To make life easy,
Activ8or includes a UDP based discovery protocol, sort of a simplified SSDP. It works like this:
- Activ8or listens on port 0xA8A8 (of course!) for a multicast UDP message of the form `{ action: 'identify'}`. 
- After receiving such a message, Activ8or responds with `{ ipV4Address: <ipaddr>, systemName: <system name>}`, also sent to UDP port 0xA8A8.

You can change the UDP port and the system name in the `config/activ8or.js` file.

Using this technique, it is very easy to create auto-configuring installations where each experience or app on the
local network can learn where Activ8or is, and auto configure to use it. Examples of this code can be found in every
example client app we provide.

### Real SSDP
We thought about adding SSDP as the discovery protocol, but it seemed overly complex, especially for native iOS and Android apps. If you
think we're wrong and should add it, drop us a line.


## Appendix
### Sails Links

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Fri Sep 13 2019 16:51:52 GMT-0700 (Pacific Daylight Time) using Sails v1.1.0.
