module.exports = {
    database: "mmongodb://localhost/amazon",
    secret: 'ABCDEFGHIJKL',
    frontendURL: 'http://localhost:4200',
    port: 3000,
    google: {
        clientId: '957005771254-e9m9buagf66md3v9cvroutnp9hf107hi.apps.googleusercontent.com',
        clientSecret: 'T9ePhbtfAE4OwesB0d3Iu9Rc',
        callbackURL: 'http://localhost:3000/api/auth/google/callback'
    },
    twitter: {
        consumerKey: 'v2lg3KFZS3zKgeiYr3sseK1Uq',
        consumerSecret: 'j7PFARDjHaMrAPdCmICRy22xUt54Kyykj5zoEjvmRR1yGm6K3c',
        callbackURL: 'http://localhost:3000/api/auth/twitter/callback'
    },
    github: {
        clientId: 'fd32f94237997cf3d0f7',
        clientSecret: '743cb9f4d4ff5a026f64db2ba100f4bee84d9d0e',
        callbackURL: 'http://localhost:3000/api/auth/github/callback'
    },
    ethereal: {
        name: 'Chadd Hirthe',
        username: 'chadd.hirthe@ethereal.email',
        password: 'xuwrCeNpCQJVYQdazQ',
        host: 'smtp.ethereal.email',
        port: 587,
    }
}