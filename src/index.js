require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

//auto reply
client.on("ready", (c) => {
  console.log(`🗿 ${c.user.tag} is online`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "hello") {
    message.reply("hey!");
  }
});

//interaction with sclash commands
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`the sum is ${num1 + num2}`);
  }

  //Embed creation 
  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("This is an Embed Description")
      .setColor("Random")
      .addFields({
        name: "1st Field Title",
        value: "Some random value",
        inline: true,
      })
      .addFields({
        name: "2nd Field Title",
        value: "Some random value",
        inline: true,
      });

    interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
