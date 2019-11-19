---
permalink: rest-api-guests
---

## REST API: Guests
The `guests` endpoint provides CRUD operations for Guest entities.

<aside class="alert-light mb-3">
<div class="container">
<div class="row">
<div class="col-12">
<h6 class="mt-4">Summary of Endpoints</h6>
    <ul>
        <li><code>GET /guests</code></li>
        <li><code>GET /guests/:uuid</code></li>
        <li><code>POST /guests</code></li>
        <li><code>PATCH /guests/:uuid</code></li>
        <li><code>DELETE /guests/:uuid</code></li>
        <li><code>PATCH /guests/:guuid/experience</code></li>
        <li><code>PATCH /guests/:guuid/experience/:euuid</code></li>
        <li><code>DELETE /guests/:guuid/experience/:euuid</code></li>
        <li><code>POST /guests/:guuid/enqueue/:eKeyOrUuid</code></li>
        <li><code>POST /guests/:guuid/dequeue/:eKeyOrUuid</code></li>
        <li><code>GET /guests/:guuid/queueentries</code></li>
        <li><code>GET /guests/:guuid/qentries</code></li>
     </ul>
    </div>
</div>
</div>
</aside>

## GET /guests
Returns all guests. Guests can be filtered per the query parameters.

<table class="table table-light">
<tr>
<td>Response Format</td>
<td>JSON</td>
</tr>
<tr>
<td>Requires Authentication?</td>
<td>Only when security enabled</td>
</tr>
</table>

### Query Parameters

Query parameters are passed in the URL. Example:

`GET /guests?orderBy="email ASC"&limit=50`

<table class="table table-striped">
<thead>
    <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>email</td>
        <td>Search for a specific email address</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>limit</td>
        <td>Limit count of search results</td>
        <td></td>
        <td>10</td>
    </tr>
    <tr>
        <td>object fields</td>
        <td>Search for guests with matching object fields. See "Query Parameters".</td>
        <td></td>
        <td></td>
    </tr>
</tbody>
</table>

### Example Requests

`GET /guests`
`GET /guests?email=john.smith@test.com`
`GET /guests?limit=10000`

### Example Response

```javascript
[
  {
    "headshot": {},
    "createdAt": 1572397517467,
    "updatedAt": 1574185933176,
    "id": "5db8e1cd20dcb8a833781567",
    "email": "guest-auto@test.com",
    "firstName": "Guest",
    "middleName": "",
    "lastName": "McActivated",
    "metadata": {},
    "mobilePhone": "",
    "legal": {},
    "address": {},
    "demographics": {},
    "avatar": {},
    "signature": {},
    "registeredAt": "Wed, 30 Oct 2019 01:05:17 GMT",
    "experiences": [
      "a9cdfc65-0608-4a5f-a010-1eb3d5332652",
      "14f9d70a-7981-4064-af4c-8101770a63e6",
      "96678dcf-b70f-41a2-b838-d0254e1820d3",
      "6b0861e9-ec53-40ef-b18e-f0bf6ca26749",
      "568cba70-9a84-4bb6-88f8-1086d54d74f3",
      "5dad3c1b-59e2-493d-bd68-e2ba81a9b9cb",
      "8a7b3f65-5e7a-47fe-9d68-b8e2ca1e13b8",
      "b19d5125-c0d5-4229-b530-cd5930cc10bd",
      "3384e89c-0033-48c2-9a13-2fae833ba43b",
      "ff8890fc-3a78-4694-9c99-704d0f1b7a2f",
      "bc40cb74-4f8e-43e3-bef5-743eb393ccb0",
      "12a1ea59-c438-4903-a56a-00dbe7d6c4e6"
    ],
    "uuid": "d5eb580a-ec07-4489-97c2-ad5103bdefe6"
  },
  {
    "headshot": {},
    "createdAt": 1572397535175,
    "updatedAt": 1572397535175,
    "id": "5db8e1df20dcb8a833781568",
    "email": "rhea.kuphal@demotest.com",
    "firstName": "Rhea",
    "middleName": "",
    "lastName": "Kuphal",
    "metadata": {},
    "mobilePhone": "(503) 050-7516 x673",
    "legal": {
      "signedRelease": true
    },
    "address": {},
    "demographics": {},
    "avatar": {},
    "signature": {},
    "registeredAt": "Wed, 30 Oct 2019 01:05:35 GMT",
    "experiences": [],
    "uuid": "6e778d3e-5d93-48ed-8e3d-d789ee29e31a"
  },
...
]
```
***

## GET /guests/:uuid
Returns a single guest matching the `uuid`.

<table class="table table-light">
<tr>
<td>Response Format</td>
<td>JSON</td>
</tr>
<tr>
<td>Requires Authentication?</td>
<td>Only when security enabled</td>
</tr>
</table>

### Query Parameters

None

### Example Request

`GET /guests/d5eb580a-ec07-4489-97c2-ad5103bdefe6`

### Example Response

```javascript
{
  "headshot": {},
  "createdAt": 1572397517467,
  "updatedAt": 1574185933176,
  "id": "5db8e1cd20dcb8a833781567",
  "email": "guest-auto@test.com",
  "firstName": "Guest",
  "middleName": "",
  "lastName": "McActivated",
  "metadata": {},
  "mobilePhone": "",
  "legal": {},
  "address": {},
  "demographics": {},
  "avatar": {},
  "signature": {},
  "registeredAt": "Wed, 30 Oct 2019 01:05:17 GMT",
  "experiences": [
    {
      "createdAt": 1572397517418,
      "updatedAt": 1572397517484,
      "id": "5db8e1cd20dcb8a833781565",
      "name": "Oktoberfest Tent",
      "configKey": "TNT",
      "config": null,
      "event": "",
      "guests": [
        "d5eb580a-ec07-4489-97c2-ad5103bdefe6"
      ],
      "media": [],
      "completed": false,
      "metadata": {
        "source": "bootstrap1",
        "demo": true
      },
      "completionsLog": [],
      "experiencedAt": "Wed, 30 Oct 2019 01:05:17 GMT",
      "uuid": "a9cdfc65-0608-4a5f-a010-1eb3d5332652"
    }
  ],
  "uuid": "d5eb580a-ec07-4489-97c2-ad5103bdefe6"
}
```
***

## POST /guests
Creates a single guest with the values passed in the POST body.

<table class="table table-light">
<tr>
<td>Response Format</td>
<td>JSON</td>
</tr>
<tr>
<td>Requires Authentication?</td>
<td>Only when security enabled</td>
</tr>
</table>

### POST Body Parameters

<table class="table table-striped">
<thead>
    <tr>
        <th>Field Name</th>
        <th>Type</th>
        <th>Description</th>
        <th>Required</th>
        <th>Default Value</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>email</td>
        <td><pre>string</pre> must be valid email address</td>
        <td>Email address. Must be unique or an error is returned.</td>
        <td>YES</td>
        <td></td>
    </tr>
    <tr>
        <td>firstName</td>
        <td><pre>string</pre></td>
        <td>First name of Guest</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>middleName</td>
        <td><pre>string</pre></td>
        <td>Middle name/initial of Guest</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>lastName</td>
        <td><pre>string</pre></td>
        <td>Last name of Guest</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>mobilePhone</td>
        <td><pre>string</pre></td>
        <td>Mobile phone number Guest</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>legal</td>
        <td><pre>json</pre></td>
        <td>Free-form JSON data reserved for legal releases, etc.</td>
        <td></td>
        <td><pre>{}</pre></td>
    </tr>
    <tr>
        <td>address</td>
        <td><pre>json</pre></td>
        <td>Free-form physical address data for guest.</td>
        <td></td>
        <td><pre>{}</pre></td>
    </tr>
    <tr>
        <td>demographics</td>
        <td><pre>json</pre></td>
        <td>Free-form demographic data for guest.</td>
        <td></td>
        <td><pre>{}</pre></td>
    </tr>
    <tr>
        <td>avatar</td>
        <td><pre>json</pre></td>
        <td>JSON Media object to use as avatar.</td>
        <td></td>
        <td><pre>{}</pre></td>
    </tr>
    <tr>
        <td>signature</td>
        <td><pre>json</pre></td>
        <td>JSON Media object to use as Guest signature. Normally used for legal release.</td>
        <td></td>
        <td><pre>{}</pre></td>
    </tr>
    <tr>
        <td>registeredAt</td>
        <td><pre>string</pre></td>
        <td>ISO time string for the time at which the Guest registered.</td>
        <td></td>
        <td>Server time of POST</td>
    </tr>
    <tr>
        <td>experiences</td>
        <td><pre>json array</pre></td>
        <td>Array of Experience UUIDs for this Guest. This field is not normally updated directly. There are convenience methods for these operations.</td>
        <td></td>
        <td>[ ]</td>
    </tr>
</tbody>
</table>



### Example Request

`POST /guests`
<br/>
Body:
<br/>
`{"firstName" : "Tester", "lastName": "McTestface", "email":"testguest@test.com"}`

### Example Response

```javascript
{
  "createdAt": 1574186973207,
  "updatedAt": 1574186973207,
  "id": "5dd42fdd898ba6493939db43",
  "email": "testguest@test.com",
  "firstName": "Tester",
  "middleName": "",
  "lastName": "McTestface",
  "metadata": {},
  "mobilePhone": "",
  "legal": {},
  "address": {},
  "demographics": {},
  "avatar": {},
  "signature": {},
  "registeredAt": "Tue, 19 Nov 2019 18:09:33 GMT",
  "experiences": [],
  "uuid": "dc59d3d7-06c4-46b4-bd5c-b39850933b45"
}
```
***

## PATCH /guests/:uuid
Modify a single guest with the values passed in the POST body.

<table class="table table-light">
<tr>
<td>Response Format</td>
<td>JSON</td>
</tr>
<tr>
<td>Requires Authentication?</td>
<td>Only when security enabled</td>
</tr>
</table>

### POST Body Parameters

Same as POST parameters.

### Example Request

`PATCH /guests`
<br/>
Body:
<br/>
`{"lastName": "McTestface Jr", metatdata: { "namechange": true }}`

### Example Response

```javascript
{
  "createdAt": 1574186973207,
  "updatedAt": 1574186980093,
  "id": "5dd42fdd898ba6493939db43",
  "email": "testguest@test.com",
  "firstName": "Tester",
  "middleName": "",
  "lastName": "McTestface Jr.",
  "metadata": { "namechange": true },
  "mobilePhone": "",
  "legal": {},
  "address": {},
  "demographics": {},
  "avatar": {},
  "signature": {},
  "registeredAt": "Tue, 19 Nov 2019 18:09:33 GMT",
  "experiences": [],
  "uuid": "dc59d3d7-06c4-46b4-bd5c-b39850933b45"
}
```
***


