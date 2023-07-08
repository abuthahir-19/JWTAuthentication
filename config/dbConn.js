const mongoose = require ('mongoose');

// kORF0qbPhVHV42s4

const connectDB = async () => {
    try {
        await mongoose.connect (process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser : true,
        });
    } catch (err) {
        console.error (err);
    }
};

module.exports = connectDB;