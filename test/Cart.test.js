const { User, Cart, Item } = require('../index')
const { db } = require('../db');

describe('Cart Object Test', () => {
    beforeAll(async () => {
        await db.sync({ force: true});
    });

    // cart belongs to user
    test('Cart belongs to user', async () => {
        const user = await User.create({ 
            username: 'Cart User', 
            fullName: 'Cart Use', 
            email: 'CUseO@gnail.com', 
            passwod: 'password', 
            isAdmin: true,
        });

        const cart = await Cart.create({ totalPrice: 0 });
        await user.setCart(cart);
        let userCart = await Cart.findByPk(cart.id);
        expect(userCart.UserUsername).toBe(user.username);

    });

    // Add items 
    test('Cart can add items', async () => {
        const user = await User.create({ 
            username: 'BestCartU5er', 
            fullName: 'User OfCarts', 
            email: 'CUUOFCO@gnail.com', 
            passwod: 'password', 
            isAdmin: false,
        });

        const cart = await Cart.create({ totalPrice: 0 });
        await user.setCart(cart);

        const chromebook = await Item.create({ 
            title:'ChromeBook', 
            stock: 94, 
            price: 630.99, 
            description: 'Brand New ', 
            category: 'Electronics', 
            image: '', 
            clickCount: 0,
        });

        await cart.addItem(chromebook);
        let itemInCart = await Item.findByPk(chromebook.id);
        let cartAfterAdd = await Cart.findByPk(cart.id);
        expect(itemInCart.CartId).toBe(cart.id);

    })
    // Remove single item
    
    test('Remove single item from cart', async () => {
        const user = await User.create({ 
            username: 'WorstCartRider', 
            fullName: 'ImReally theBest', 
            email: 'ITBBTWATST@gnail.com', 
            passwod: 'password', 
            isAdmin: false,
        });

        const cart = await Cart.create({ totalPrice: 0 });
        await user.setCart(cart);
        const newShoes = await Item.create({ 
            title:'Men\'s Casual Shoes', 
            stock: 94, 
            price: 56.99, 
            description: 'Size 4 - 15 M', 
            category: 'Men\'s Clothing', 
            image: '', 
            clickCount: 0,
        });

        await cart.addItem(newShoes);
        let inCart = await Item.findByPk(newShoes.id);
        expect(inCart.CartId).toBe(cart.id)

        await cart.removeItem(newShoes);
        let removedItem = await Item.findByPk(newShoes.id);
        console.log(removedItem);
        expect(removedItem.CartId).toBe(null);

    })

    // Remove all items from cart
    test('All items can be removed from the cart at once', async () => {
        const user = await User.create({ 
            username: 'shopAndDontBuy', 
            fullName: 'NuReali Gotmoney', 
            email: 'nrGAM@gnail.com', 
            passwod: 'password', 
            isAdmin: false,
        });

        const cart = await Cart.create({ totalPrice: 0 });
        await user.setCart(cart);

        const womenShoe = await Item.create({ 
            title:'Women\'s High Heels', 
            stock: 100, 
            price: 99.0, 
            description: 'Size 4 - 15 Wm', 
            category: 'Women\'s Clothing', 
            image: '', 
            clickCount: 0,
        });
        const pixelRuby = await Item.create({ 
            title:'Google Pixel 6 - Ruby', 
            stock: 94, 
            price: 956.99, 
            description: 'New straight from google', 
            category: 'Electronics', 
            image: '', 
            clickCount: 0,
        });
        const pullover = await Item.create({ 
            title:'Men\'s Pullover Hoodie', 
            stock: 94, 
            price: 43.99, 
            description: 'S - XXL', 
            category: 'Men\'s Clothing', 
            image: '', 
            clickCount: 0,
        });
        const bracelet = await Item.create({ 
            title:'Express Bracelet', 
            stock: 94, 
            price: 2356.99, 
            description: '8" Men\'s Bracelet', 
            category: 'Jewelry', 
            image: '', 
            clickCount: 0,
        });

        await cart.addItem([womenShoe, pixelRuby, pullover, bracelet]);
        let cartCount = await cart.countItems();
        expect(cartCount).toBe(4);

        await cart.removeItems([womenShoe, pixelRuby, pullover, bracelet]);
        let shouldBeEmpty = await cart.countItems()
        expect(shouldBeEmpty).toBe(0);
    });

    // TODO: Test the total price of the cart after obtaining refactor branch
    // test the total price of the cart 

});