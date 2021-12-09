const seed = require('../seed');
const { User, Item, Cart } = require('../index')
const { db } = require('../db');

describe('Test seed file works to seed the database', () => {
    beforeAll(async () => {
        await db.sync({ force: true});
    });
    
    test('Seed file seeds the database properly', async () => {
        await seed();
        const seededUsers = await User.findAll();
        const seededItems = await Item.findAll();
        const seededCarts = await Cart.findAll();

        expect(seededUsers.length).toBe(2);
        expect(seededItems.length).toBe(27);
        expect(seededCarts.length).toBe(2);

    });
});