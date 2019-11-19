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
we'll cover that in Deployment. If you're a Docker fan, we can install that way too.

The super-cool SCMPE React Native app makes use of the Activ8or Javascript API for super-simple registration and Experience creation. For example,
when the app wants to register a new guest, the SCMPE coders simply:
```javascript
    const newGuest = await a8api.guests.create({ firstName: "Jane", lastName: "Dough", 
        email: "jane.dough@test.com", legal: { acceptedWaiver: true }, metadata: { iPadNumber: 2 },
        demographics: { hasNaturalMustache: false }});
```
<br/>
Really all you must include is email, the rest of the fields are just to show some of the other fields available. The `newGuest` object
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
    <i class="mb-2"><b>"But I **HATE** Javascript, I use Typescript, I use C#, etc."</b></i>
    <p>No worries! Under this Javascript API is a simple REST API and those docs are coming up. Everything shown
    above can be done with *any* modern language that can do GET, POST, PUT, etc. We'll also provide some libraries in other languages
    as we convert them from Version 1.0 of Activ8or. Just watch our LinkedIn or Twitter feeds.</p>
</aside>
<br/>
OK, Javascript fears behind us, what *happens* to that Experience object now? Well, nothing- unless you've configured Experience completion!

What's that you ask? It's simply sending an email (or SMS) to the Guest that can include the media created and some customizable text about
their experience. Cool! We'll cover the deets later, but basically you create some templates, set up your service (Twilio, SendInBlue, MailMonkey, etc.),
and away you go. Easy peasy.

Oh crap, our producers just added more stuff...

## Case #2: The Producers asked for EVERYTHING

We're sure this has never happened to you, but imagine the producers decided to add a metric crap ton of new features to the
Super Cool Mustache Experience activation:
- Pull guest registration from SCMPE Pro and make it it's own app. The registration app must take a 
  photo of the guest for an avatar and capture a legal release signature. The registration app will also let Guests
  add themselves to the Queue for SCMPE Pro and the new game described below. 
- Guests will enter their email address now on SCMPE to start the experience since they have already registered.
- A head to head game, **Super Facial Hair Battle** (SFHB) where two guests battle over growing the best facial hair.
- The ability to text registered Guests when they should return to the tent for their turn on the game.
- All Experiences, when complete, will email the guest with a multimedia takeaway.

Woah, that's a lot. Glad our producers push back on the customer. Good thing we have 48 hours to get this done!

### The Registration App

Let's start here. Actually a great place to start is with the Activ8or Registration Sample App which does about 75% of this. Tweak
the colors, backgrounds, logo and you can look like a wunderkind in no time.

But let's not cheat too much, here are the relevant registration steps:
- Have the Guest fill out a form with name, email and zip code (why not, we can collect anything!)
- Take a pic of the guest using the tablet's camera
- Have the guest sign an on-screen release using their finger

Let's now take all that and register the guest, once again in Javascript:

```javascript
    // Push up the media created first since we will need to reference it when creating the guest. Alternatively
    // we could create a guest, then upload, then modify the guest, but thats a few more calls.
    const guestAvatar =  await a8api.media.upload(avatarMediaFile, { source: 'REG'});
    const releaseSig = await a8api.media.upload(guestReleaseSigFile, { source: 'REG'});
    const newGuest = await a8api.guests.create({ 
            firstName: "Jane", 
            lastName: "Dough", 
            email: "jane.dough@test.com", 
            legal: { acceptedWaiver: true }, 
            avatar: guestAvatar.uuid,
            releaseSig: releaseSig.uuid,
            metadata: { iPadNumber: 2 },
            address: { postalCode: zipCode },
            mobilePhone: '+14085551212'
    });
```

And that's it. (At this point you might be thinking that AppDelegates doesn't care much for error handling, but you'd be wrong! We cover
that in detail elsewhere and all our examples include it.)

The other requirement for the Reg App was to queue Guests for SCMPE or SFHB (or both!). The calls are the same, and also super-simple.

```javascript
    // Enqueue guest for Super Cool Mustache
    const queueEntry =  await a8api.queues.enqueueGuest({ 
            guestUUID: newGuest.uuid, 
            experienceConfigKey: 'SCM'
        });
   
```

You may be saying, what is this `experienceConfigKey` magic? This is simply a short key **you** create for each Experience Configuration to
uniquely identify it. We chose "SCM" for Super Cool Mustache Photo Pro, but you could have chosen whatever you wanted. You could even use
the UUID, but this can and will change between installations, so this gets messy during setup. Much more on this later.

### Mods to Super Cool Mustache Photo Experience
Our intrepid producers wanted us to take out registration from SCMPE, but how do we get that info into the app now? Easy peasy,
we ask A8local for it.

```javascript
    // Search for matching email
    const guest =  await a8api.guests.getByEmail(inputEmail);
   
```

If the guest isn't found, an Error is thrown. Handling is up to you!

<aside class="alert-info p-3 mb-3">A clever
programmer might build an autopopulate field for the UI using the query APIs. But we don't recommend that. It's simply
not cool to reveal other folk's email addresses, ever. Don't do it!
</aside>

## Super Facial Hair Battle

Right, so now we have a head-to-head game where two Guests battle it out over growing awesome facial hair. You have some
architectural choices to work out with the producer:
- Do we auto-assign Guests based on Queue position in each of the two stations or does the brand ambassador 
do that through a tablet app?
- Do we let the Guests just sit down and enter their email and we check the queue position then let them play?

How you do it is, of course, between you and your producer. Either way, Activ8or can handle it. Let's start with something
they haven't asked for yet, but we know is coming: a digital sign showing the queue. 

### Queue Digital Sign

Let's grab the Queue Entries:


```javascript
    // Get queue entries by wait time. "FHB" is the Experience Config Key
    const queueEntries =  await a8api.queues.getQueueForExperienceConfigKey("FHB");
   
```
<span class="mb-3"></span>

And once again, that's it. You have the queue in an array with Guest info populated. Now it's just a little HTML and CSS, right?

### Notifying Guests by Text When It's Time to Play

This is dead simple. Just configure your texting provider in a8local. Twilio is one of the easiest and directly supported. Then turn
on Queue Notifications in the Experience Config, set a time threshold (say 5 minutes before) and that's it. Activ8or monitors approximate
wait time and sends out a text (and/or email) when a Guest's expected wait time is less than the threshold.  

### Sharing Realtime Data Between the Two SFHB Systems

As developers, we've tackled sharing data between systems running head-to-head games in lots of ways:
- TCP connections
- UDP messages
- HTTP polling
- Websockets

Using A8local, we make the websocket approach as easy as subscribing to the data you're interested in. For SFHB, we want to send and
receive score updates in realtime. We offer a nice RxJS wrapper on SocketIO callbacks, so let's code this:

```javascript
    // First, let's set up the realtime listeners
    // Get an RxJS Observable listening for any CRUD for Data Objects with the key "sfhb_score_update"
    const scoreObservable =  await a8api.dataobjects.getDataObservableForKey("sfhb_score_update");
    // set the callbacks for changes, errors or observable closed
    scoreObservable.subscribe( handleScoreEvent, handleScoreError, handleScoreObservableClosed);

    // ....
    
    // Elsewhere in the code we might update a score thus:
    const newScore = await a8api.dataobjects.create({ key: "shfb_score_update", 
        data: { length: 5, density: 7, shine: "high", gameNumber: 27822, guest: currentGuest }});
    
    // POSTING this score will result in callbacks on all systems listening to the observable.
   
```

Of course, we've left out the implementation of the handlers, but you can check out the samples for that. Also, a super-cool
thing to note: if A8local is running in the cloud (say a one-click Google Cloud implementation) then these notifications can happen almost
instantly, worldwide.









