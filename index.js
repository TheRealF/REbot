//REbot made by [WAF] TheRealF#0001 aka Federico Boggia
// Import the discord.js module
const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();
//Required for reading editing external txt file
var fs = require('fs');
//Logging the bot
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//Increment function
function increment(n){
  n++;
  return n;
}

//Commands start here
client.on('message', function(message){
  if(!message.content.startsWith("!")) { //check if command starts with !
     return;
  }
  if(message.author.bot === true) { //ignores other bots
     return;
  }
if (message.content ===('!support-ticket')) { //Create a new channel under IT tickets category
  var idticket2 = fs.readFileSync('id2.txt', 'utf-8'); //read txt file
  console.log(idticket2);
  var idprint = ("it" + idticket2);
  message.guild.createRole({ //create new role
    name: idprint,
    color: 'GREEN',
  })
    .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
    .catch(console.error)



message.guild.createChannel(idprint, "text") //create the new channel
.then(m => {
    m.overwritePermissions(message.guild.id, { //visibilty set to false for everyone
        VIEW_CHANNEL: false
    })

    m.overwritePermissions(message.author.id, { //visibilty set to true for the ticket creator
        VIEW_CHANNEL: true
    })
   m.overwritePermissions(message.guild.roles.find(role => role.name === "IT Department"), { //visibilty set to true for IT department people
        VIEW_CHANNEL: true
    })
    let category1 = message.guild.channels.find(c => c.name == "IT tickets" && c.type == "category"), //Find the category name to append the channel
    channel1 = message.guild.channels.find(c => c.name == idprint && c.type == "text"); //Find the channel name
    if (category1 && channel1) channel1.setParent(category1.id); //Set IT Ticket as parent category of the new channel
    else console.error(`One of the channels is missing:\nCategory: ${!!category1}\nChannel: ${!!channel1}`);
    const embed = new RichEmbed() //Create the embed message to send as a reply
          // Set the title of the field
          .setTitle('New Support ticket created')
          // Set the color of the embed
          .setColor(0x4bb84b)
          // Set the main content of the embed
          .setDescription('Generated Ticket id is: '+ idprint);
        // Send the embed to the same channel as the message
        message.channel.send(embed);

})
var temp2 = increment(idticket2);
var newid2 = String(temp2);
try {
    fs.writeFileSync('id2.txt', newid2, 'utf-8') //write the txt file with the next id to be used for the new ticket channels

} catch(err) {
    console.error(err);
}

  }

  // Admin Ticket Follow the same structure as support ticket
  else if (message.content ===('!admin-ticket')) {
    var idticket = fs.readFileSync('id.txt', 'utf-8');
    console.log(idticket);
    var idprint2 = ("ad" + idticket);
    message.guild.createRole({
      name: idprint2,
      color: 'RED',
    })
      .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
      .catch(console.error)

  message.guild.createChannel(idprint2, "text")
  .then(m => {
      m.overwritePermissions(message.guild.id, {
          VIEW_CHANNEL: false
      })

      m.overwritePermissions(message.author.id, {
          VIEW_CHANNEL: true
      })
     m.overwritePermissions(message.guild.roles.find(role => role.name === "Administration Department"), {
          VIEW_CHANNEL: true
      })
    let category = message.guild.channels.find(c => c.name == "Admin Tickets" && c.type == "category"),
    channel = message.guild.channels.find(c => c.name == idprint2 && c.type == "text");
    if (category && channel) channel.setParent(category.id);
    else console.error(`One of the channels is missing:\nCategory: ${!!category}\nChannel: ${!!channel}`);

            const embed = new RichEmbed()
            // Set the title of the field
            .setTitle('New Admin ticket created')
            // Set the color of the embed
            .setColor(0xFF0000)
            // Set the main content of the embed
            .setDescription('Generated Ticket id is: ' + idprint2);
          // Send the embed to the same channel as the message
          message.channel.send(embed)
  })
  var temp = increment(idticket);
  var newid = String(temp);
  try {
      fs.writeFileSync('id.txt', newid, 'utf-8')

  } catch(err) {
      console.error(err);
  }


}
  //IT delete Ticket
  else if (message.content ===('!IT-resolved')&& message.member.roles.some(r=>["Administration Department", "IT Department"].includes(r.name))&&(message.channel.parentID==="IT-TICKETS-ID")) { //Insert It tickets category ID here after message.channel.parentID
    let channelIT = message.channel.name; //find the channel name
    let roleIT = message.guild.roles.find(r => r.name == channelIT); //Find the role to be deleted name
    roleIT.delete('The role needed to go') //Deletes the role
  .then(deleted => console.log(`Deleted role ${deleted.name}`))
  .catch(console.error);
    message.channel.delete('Resolved, making room for new tickets') //Deletes the channel
    .then(deleted => console.log(`Deleted ${deleted.name}`))
    .catch(console.error);

  }
  //Admin delete Ticket
  else if (message.content ===('!AD-resolved')&& message.member.roles.some(r=>["Administration Department"].includes(r.name))&&(message.channel.parentID==="ADMIN-TICKETS-ID")) { //Insert Admin tickets category ID here after message.channel.parentID
     let channelAD = message.channel.name;
     let roleAD = message.guild.roles.find(r => r.name == channelAD);
     roleAD.delete('The role needed to go')
   .then(deleted => console.log(`Deleted role ${deleted.name}`))
   .catch(console.error);
     message.channel.delete('Resolved, making room for new tickets')
    .then(deleted => console.log(`Deleted ${deleted.name}`))
    .catch(console.error)

  }
  else if(message.content ===('!help')){
    const embed = new RichEmbed()
    // Set the title of the field
    .setTitle('Here is the list of REbot commands')
    // Set the color of the embed
    .setColor(0x76ecde)
    // Set the main content of the embed
    .setDescription("```" + "| Command | Properties | Roles|" + "\n" + "\n" +
                     "| !admin-ticket | add admin channel | everyone|" + "\n" + "\n" +
                     "| !support-ticket | add support channel | everyone|" + "\n" + "\n" +
                     "| !IT-resolved | remove support channel | Administration Department, IT Department|"+ "\n" + "\n" +
                     "| !AD-resolved | add admin channel |"+ "\n" +"Administration Department|"+ "\n" + "```");
  // Send the embed to the same channel as the message
  message.channel.send(embed)

  }
  else {
  console.log("Invalid Command")
  }
});

// Insert RE token here
client.login('TOKEN-HERE');
