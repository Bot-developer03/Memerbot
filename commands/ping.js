//  + args

module.exports = {
  name: "ping",
  description: "Ping!",
  async execute(message) {
    message.channel.send("Pong.");
  },
};
