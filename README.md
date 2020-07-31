## Inspiration

Sailors are alone on the high seas for months at a stretch. And, a lot of these sailors in their journals have expressed their lonesome. Which is big sad. What if someone gave them a text/ voice chat room where nearby people can chat with each other. It's similar to the chat in games like sea of thieves, GTA, and PUBG but the only difference it's IRL and with a lot less bloodshed (maybe - arrrgghhhhh). 

Our inspiration, Jack Sparrow.

## What it does

Ahoy Scallywags enables sailors to communicate with other sailors on nearby ships (radius of ~10km or 5.3 nautical miles). Sailors can hang out, sing pirate songs across ships, or form a floating nation!

It uses the Fetch API to search for geofences near the sailor with Radar.io and if it doesn't find any it creates a geofence around the user. All the users in a geofence will be able to chat.

The app shows you a map where you can see all the other sailors. Once close to another ship it switches to a dual interface where it creates a chat room alongside the map where you can talk to your fellow sailors.

## How we built it

Ahoy Scallywags is built with JavaScript, HTML, and SCSS with the chat server in Node.js and Socket.io. It connects users based on geofences created in Radar.io.

## Challenges we ran into  

We were new to almost every single technology we used, like Radar.io API, Here API, Node.js, Socket.io, and even MongoDB. 

Making HTTP requests to the Radar.io API was tricky. Being new to Node.js, Socket and their documentation wasn't ideal. The learning curve was steep and treacherous. Being new to Node, Mongo DB, and Mongo DB Atlas isn't a fun time - neither is being completely new to the concept of APIs or HTTP requests.

Since we were brand new to a lot of these technologies we had to spend a lot of time working through the errors but in the end we managed to pull through!

## Accomplishments that we're proud of

Some of us who were completely new to most of the exotic stuff (if not all!) we used was able to actually develop an MVP. We learned tonnes about the APIs, technologies, cloud computing, and more. We were complete strangers before the hackathon but we still managed to work cohesively and create a project!

## What we learned

We learned so much about developing web apps with the Radar.io API, making HTTP calls in general and making a server with Node.js. We also learned how to make a real time chat with Socket.io.

## What's next for Ahoy Scallywags!

We hope to add some new features to this project including voice chat!
