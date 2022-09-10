const Event = require('../../structures/interactions/event')
const Embed = require('../../structures/builders/embed')

module.exports = new Event({
  name: 'messageCreate',
  async callback (client, message) {
    const channel = message.channel

    if (channel.id !== process.env.SOURCE_CHANNEL_ID) return

    const guild = client.guilds.cache.find(guild => guild.id === process.env.TARGET_GUILD_ID)
    if (!guild) return console.log('No guild found!')
    const targetChannel = guild.channels.cache.find(channel => channel.isText() && channel.id === process.env.TARGET_CHANNEL_ID)
    if (!targetChannel) return console.log('No channel found!')

    const content = message.content
    const author = message.author
    const files = message.attachments

    const attachments = []
    files.forEach((a, k) => attachments.push(a.attachment))

    await targetChannel.send({ content: `*Message de **${author.tag}***\n~~                                                       ~~\n${content}`, files: attachments })
  }
})
