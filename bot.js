/*jshint esversion: 6 */

const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    let author = new Discord.User(client, msg.author);
    console.log(author.presence);
    msg.reply(author.presence);
  }

  if(msg.content.toLowerCase() ==='!currentgame') {
    replyCurrentGame(msg);
  }
});


//ServerID newMember.guild.id
//UserID newmember.userID
//applicationID newmember.activities[i].applicationID
//applicationName newmember.activities[i].name

//username of user by ID newMember.guild.members.fetch(newMember.userID).then(user => console.log(user.user.username));
//nickname of user by ID newMember.guild.members.fetch(newMember.userID).then(user => console.log(user.nickname));

//Check if start time has changed or if that activity is gone
client.on('presenceUpdate', (oldMember, newMember) => {
  let oldActivities = oldMember.activities;
  let newActivities = newMember.activities;
  let oldActivity;
  let newActivity;
  let foundMatch;
  let msPlayed = 0;




  //Check new activities vs old activities 
  for(let i = 0; i < oldActivities.length; i++) {
    oldActivity = oldActivities[i];
    foundMatch = false;
    for(let j = 0; j < newActivities.length; j++) {
      newActivity = newActivities[j];
      let oldActivityId  = oldActivity.applicationID ? oldActivity.applicationID : oldActivity.name;
      let newActivityId  = newActivity.applicationID ? newActivity.applicationID : newActivity.name;
      if(oldActivityId == newActivityId) {
        if(oldActivity.createdTimestamp != newActivity.createdTimestamp) { //Check if start time is different
          //Update Time played here with NEW - OLD
          msPlayed = newActivity.createdTimestamp - oldActivity.createdTimestamp;
          console.log('Not even timestamps');
          console.log("You played " + oldActivity.name + " for " + msPlayed);
          msPlayed = 0;
          
        }
        foundMatch = true;
        break;
      }
    }
    if(!foundMatch) { //The game is no longer being played
      //Update time played here with currenttime - OLD
      //let startTime = new Date(oldActivity.createdTimestamp).getTime();
      let endTime = Date.now();
      msPlayed = endTime - oldActivity.createdTimestamp;
      console.log('ended activity');
      console.log("You played " + oldActivity.name + " for " + msPlayed);
      msPlayed = 0;
    }
  }
});






client.login(auth.token);



function replyCurrentGame(msg) {
  let author = new Discord.User(client, msg.author);
  let currentGame, startTime, message;
  if(author.presence.activities.length > 0) {
    let currentGame = author.presence.activities[0].name;
    let startTime = new Date(author.presence.activities[0].timestamps.start).getTime();
    let endTime = new Date().getTime();

    let difference_ms = endTime - startTime;
    //take out milliseconds
    difference_ms = difference_ms/1000;
    let seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    let minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms/60; 
    let hours = Math.floor(difference_ms % 24);  

    message = " You have been playing " + currentGame + " for "
    if(hours > 0) {
      message += hours + " hours " + minutes + " minutes and " + seconds + " seconds.";
    } else if ( minutes > 0) {
      message += minutes + " minutes and " + seconds + " seconds.";
    } else {
      message += seconds + " seconds.";
    }
  } else {
    message = " You are not currently playing a game.";
  }
  msg.reply(message);
}