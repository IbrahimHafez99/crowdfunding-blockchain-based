import app from '../app.js';

const runSRV = () => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(
      `⏳ Server running in ${process.env.NODE_ENV.bold} on port ${PORT.bold}...`
        .yellow
    );
  });
};

export default runSRV;
