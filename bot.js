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
  console.log(oldMember);
  console.log('------------PRESENCEUPDATE-------------');

});


client.login(auth.token);



function replyCurrentGame(msg) {
  let author = new Discord.User(client, msg.author);
  let currentGame = author.presence.activities;
  console.log('------------ACTIVITIES-------------');
  console.log(currentGame);
  console.log('------------ACTIVITIES-------------');
}