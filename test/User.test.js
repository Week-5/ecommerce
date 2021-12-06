const { User } = require('../index')
const { seed } = require('../seed')
const { db } = require('../db')

describe('User Object Test', () => {
    // seed();
    beforeAll(async () => {
        await db.sync({ force: true})
    });
    
    test('User can  be created', async () => {
        const newUser = await User.create({ username: 'WhomIsThis', fullName: 'Mike J', email: 'WhoMJ@gmail.com', password: 'password', isAdmin: true})
        const newUser1 = await User.create({ username: 'Whs2', fullName: 'Mik0989', email: 'WhsMJ@gmai==l.com', password: 'password', isAdmin: true})
        const newUser2 = await User.create({ username: 'WhomI000is', fullName: 'M J', email: 'WMJ@gmail.com', password: 'password', isAdmin: false})

        const users = await User.findAll()

        expect(users.length).toBe(3)
    });

    test('user can be an admin', async () => {
        const newUser = await User.create({ username: 'yourFavAdmin', fullName: 'Admin Test', email: 'newAdmin@gmail.com', password: 'password', isAdmin: true})
        expect(newUser.isAdmin).toBeTruthy()
    });

    
});