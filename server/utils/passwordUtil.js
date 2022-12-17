const crypto = require('crypto')


module.exports = {
    validatePassword: (password, user) => {
        const hashVerify = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
        return user.hash === hashVerify;
    },

    genPassword: (password) => {
        const salt =  crypto.randomBytes(32).toString('hex');
        const genHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    
        return {
            salt,
            hash: genHash,
        };
}
}