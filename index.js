// make bluebird default Promise
const app = require('./express');
const { PORT } = process.env;

(async () => {
  try {
    app.listen(PORT || 4004, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(`Failed to init mongo or kafka ${e.message}`);
  }
})();
