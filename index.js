const Discord = require("discord.js");
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const fs = require("fs");

// ? Command Handling
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// ? Event Handling

client.on("ready", () => {
  const date = new Date();
  console.log(`Client logged in as ${client.user} at ${date}`);
});

client.on("error", () => {
  console.log(console.error());
});

client.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (!client.commands.has(commandName)) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(TOKEN);
