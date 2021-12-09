const { db } = require('../db');
const { User, Item, Cart } = require('../index')

describe('Item Object Test', () => {

    beforeAll(async () => {
        await db.sync({ force: true});
    });
    
    test('Item can be added to cart', async () => {
        const newUser = await User.create({ username: 'Your Fav Customer', fullName: 'Customer Test2', email: 'newCust2@gmail.com', password: 'password2', isAdmin: false});


        const macBook = await Item.create({ 
            title:'Macbook', 
            stock: 4, 
            price: 1230.90, 
            description: 'Brand New Used', 
            category: 'Electronics', 
            image: '', 
            clickCount: 0,
        });

        const cart = await Cart.create({ totalPrice: 0, UserUsername: newUser.username});
        await cart.addItem(macBook);
        let cartItem = await Item.findByPk(macBook.id);
        
        expect(cartItem.CartId).toBe(cart.id);
    });
});