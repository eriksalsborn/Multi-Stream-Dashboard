# Multistream

This project aims to get rid of the headache of having too many tabs open at the same time. We aim to give users the possibility to collect its favorite streamers from Youtube and Twitch on the same plattform and website.

## Functional and technological specification

### Functional

Allow users to register an account and login. The user will then get a screen which they can add different streams from youtube and twitch to watch at the same time. These streams are to be moveable for the user to place them where they want. The user will also be able to save different layouts, for example, a "gaming" layout, a "sports" layout and a "talkshow" layout. These layouts will have the streams set up in the way that the user saved them as. The user will be able to quickly change between different layouts. All of the user information will be stored in a database.

**This is our quick prototype:**
![alt text](https://cdn.discordapp.com/attachments/712218313396060281/961188710043508746/unknown.png)

### Technological

We intend to use React for the frontend framework. We also intend to use NodeJS, bcryptJS, jasonwebtoken. We will create a serverless setup using AWS lambda with its RESTful web API that uses DynamoDB to manage state. The user information will be stored in a DYnamoDB database. We will also use a s3 bucket to host our website.

### Project Screencast

Project Screencast: [Click Here](https://youtu.be/cKFGyBlBQqk)

### Individual oral code screencast

Anders Lundkvist: [Click Here](https://youtu.be/xyVFqTWphyo)

Erik Salsborn: [Click Here](https://youtu.be/oAYUOCNWOHY)
