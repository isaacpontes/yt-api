const app = require("./app");

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`Server is running on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();