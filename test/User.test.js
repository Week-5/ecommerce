const { User, Item } = require('../index')
const { seed } = require('../seed')
const { db } = require('../db')

describe('User Object Test', () => {
    // seed();
    beforeAll(async () => {
        await db.sync({ force: true});
    });
    
    test('User can be created', async () => {
        const newUser = await User.create({ username: 'WhomIsThis', fullName: 'Mike J', email: 'WhoMJ@gmail.com', password: 'password', isAdmin: true});
        
        const users = await User.findAll();
        
        expect(users[0].username).toBe(newUser.username);
    });

    test('User can be an admin', async () => {
        const newUser = await User.create({ username: 'yourFavAdmin', fullName: 'Admin Test', email: 'newAdmin@gmail.com', password: 'password', isAdmin: true});
        expect(newUser.isAdmin).toBeTruthy();
    });

    // This test if a user can create and add an item to the inventory as an admin
    test('Admin user can create new item', async () => {
        let user = await User.create({
            username: 'SomeBodEEE', 
            fullName: 'Erika D', 
            email: 'ED234@gnail.com', 
            passwod: 'password', 
            isAdmin: true
        });

        // guard against unfilled fields on front end
        // creates new item
        let item = await Item.create({
            title: 'New Bush',
            stock: 4,
            price: 3.0,
            description: 'New type of bush for your front lawn',
            category: 'Electronics',
            image: '',
            clickCount: 3,
            CartId: null,
        });
        // sequelize helper function to add the association between the item created and user
        await user.addItem(item);
        let userItem = await Item.findByPk(item.id);

        expect(userItem.UserUsername).toBe(user.username);
    });

    test('Accoun tcan be deleted', async () => {
        let user = await User.create({
            username: 'The New Ghost', 
            fullName: 'Jamie O', 
            email: 'JayO@gnail.com', 
            passwod: 'password', 
            isAdmin: true
        })

        let newUser = await User.findByPk(user.username)
        if (newUser) { existingUser = true } else { existingUser = false }

        expect(existingUser).toBeTruthy()

        await newUser.destroy()
        let userSearch = await User.findByPk(user.username)
        console.log(newUser)
        expect(userSearch).toBe(null)
    })
});