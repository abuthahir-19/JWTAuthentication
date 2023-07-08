const whiteList = [
    'https://www.bing.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3000'
];

const corsOptions = {
    origin : (origin, callback) => {
        if (whiteList.includes (origin)) {
            callback (null, true);
        } else {
            callback (new Error ('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;