require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder,ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`🗿 ${c.user.tag} is online`);

  //setting on activity type
  client.user.setActivity({
    name:'😎🔥🔝',
    //you can set activity like watching playing...
     type: ActivityType.Custom,
  })
});

//auto reply
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

  //logic claiming role
  client.on("interactionCreate", async (interaction) => {
    try {
      if (!interaction.isButton()) return;

      await interaction.deferReply({ ephemeral: true });

      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.editReply({
          content: "I couldnt find that role ",
        });
        return;
      }
      const hasRole = interaction.member.roles.cache.has(role.id);

      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The ${role} has been removed.`);
        return;
      }

      await interaction.member.roles.add(role);
      await interaction.editReply(`The ${role} has been added.`);
    } catch (error) {
      console.log(error);
    }
  });
});

client.login(process.env.TOKEN);
