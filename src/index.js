const app = require("./app");

const PORT = 3000;

const start = async () => {
  try {
    await app.listen({ port: PORT });
    app.log.info(`Server is running on http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();