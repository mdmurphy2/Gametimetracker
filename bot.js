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


client.on('presenceUpdate', (oldMember, newMember) => {
  console.log('------------PRESENCEUPDATE-------------');
  //console.log(oldMember);
  console.log('------------PRESENCEUPDATE-------------');

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
 
  console.log('------------ACTIVITIES-------------');
  console.log(currentGame);
  console.log('------------ACTIVITIES-------------');
  //let message = ", You have been playing " + currentGame + " for " + time " "
  //msg.reply()
}