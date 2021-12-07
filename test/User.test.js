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
    test('User can create new item', async () => {
        // This test should normally test the function for adding an item
        // Like call where the func would be located and the test the results
        // now i have to create a user - then item then test if the item belongs to the user

        // there should be a guard that the user is an admin
        // creates new user
        let user = await User.create({
            username: 'little E', 
            fullName: 'Erika D', 
            email: 'ED234@gnail.com', 
            passwod: 'password', 
            isAdmin: true});

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
            UserUsername: 'little E'
        });

        let item2 = await Item.create({
            title: 'New Bush22',
            stock: 42,
            price: 32.0,
            description: 'New type of bush for your front lawn',
            category: 'Electronics',
            image: 'dfgasdfsgfd.jpg',
            clickCount: 3,
            CartId: null,
            UserUsername: 'little E'
        });
        // sequelize helper function to add the association between the item created and user
        await user.addItem(item);
        await user.addItem(item2);
        // loaf all of the users current 
        let userItems = await user.getItems()
       
        expect(userItems[0].UserUsername).toBe(item.UserUsername)
    });



    
});