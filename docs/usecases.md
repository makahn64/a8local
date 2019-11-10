---
permalink: usecases
---

## A Sampling of Use Cases

Activ8or can be used in a wide variety of Event Marketing installations. Let's start with a very simple case and have our never-say-no producer continue to 
add complexity to see how the installation changes.

## Case #1: Register Guests and Manage a Single Photo-Op Experience

For this case we'll assume we've got decent internet at the venue but we want run the Activ8or server and UI on-site. Brand Ambassadors will direct Guests
to the **Super Cool Mustache Photo Experience** (aka SCMPE Pro) that runs as a React Native app on 4 iPads in the activation. This super-sophisticated app super-imposes
a quality hipster-grade mustache on the Guest's face, then emails it to them with a brand appropriate template. Sweet!

The Activ8or local server (**a8local**) and Activ8or UI (**a8ui**) are installed on a Macbook Air that will live in the activation on a local WiFi network. To make life easy on the 
Brand Ambassadors, we've installed the two apps using **pm2** and they auto-start every time the Mac does. If you're not familiar with **pm2**, no worries,
I'll cover that in Deployment. If you're a Docker fan, we can install that way too.

The super-cool SCMPE React Native app makes use of the Activ8or Javascript API for super-simple registration and Experience creation. For example,
when the app wants to register a new guest, the SCMPE coders simply:
```javascript
    const newGuest = await a8api.guests.create({ firstName: "Jane", lastName: "Dough", 
        email: "jane.dough@test.com", legal: { acceptedWaiver: true }, metadata: { iPadNumber: 2 },
        demographics: { hasNaturalMustache: false }});
```
<br/>
Really all you must include is email, the rest of the fields are just to show some of the other fields available. The `newGuest` variable
includes the most important bit about Jane Dough right now, her UUID. We'll get to that in a minutes.

OK, so now Jane is a registered Guest. She takes a few pics in SCMPE and then superimposes an awesome waxed 'stache and hits the
"DONE" button. It is now time to immortalize her experience! This is a two step process:
```javascript
    // mediaFile is a Javascript File object. source is an optional field to identify the source of the media item.
    const newMedia = await a8api.media.upload(mediaFile, { source: 'SCM'});
    // now we've got a media object to include with the Experience. configKey identifies the source of the Experience, more on that
    // later.
    const newExperience = await a8api.experiences.create({ configKey: 'SCM', guests: [newGuest.uuid],
        media:[newMedia.uuid], metadata: { mustacheChoice: 'waxed handlebar'}});
```
<br/>
And that's it, you're done. The Media was uploaded then attached to the Experience when the new Experience was created. The Javascript
API has some convenience calls to save you typing (e.g. `a8api.experiences.createWithMedia`), but the underlying process is the same.

<aside class="alert-info p-3">
    <i><bold>"But I **HATE** Javascript, I use Typescript, I use C#, etc."</bold></i>
    <p>No worries! Under this Javascript API is a simple REST API and those docs are coming up. Everything shown
    above can be done with *any* modern language that can do GET, POST, PUT, etc. We'll also provide some libraries in other languages
    as we convert them from Version 1.0 of Activ8or. Just watch our LinkedIn or Twitter feeds.</p>
</aside>
<br/>
OK, Javascript fears behind us, what -happens- to that Experience object now? Well, nothing. Unless you;ve configured Experience completion!

What's that you ask? It's simply sending an email (or SMS) to the Guest that can include the media created and some customizable text about
their experience. Cool! We'll cover the deets later, but basically you create some templates, set up your service (Twilio, SendInBlue, MailMonkey, etc.),
and away you go. Easy peasy.

Oh crap, our producer just added more stuff...









