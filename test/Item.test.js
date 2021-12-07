const expectExport = require('expect');
const { User, Item, Cart } = require('../index')

describe('Item Object Test', () => {
    // TODO: 
    // Need to be able to add items to cart -> what is the way it is being added
    //      will it be via cart.addItem(item)  ||  user.items.push(item)

    test('Item can be added to cart', async () => {
        const newUser2 = await User.create({ 
            username: 'yourFavCustomer', 
            fullName: 'Cust Test', 
            email: 'newCustn@gmail.com', 
            password: 'password', 
            isAdmin: false,
            
        })

        // const macBook = Item.create({ 
        //     title:'Macbook', 
        //     stock: 4, 
        //     price: 1230.90, 
        //     description: 'Brand New Used', 
        //     category: 'Electronics', 
        //     image: '', 
        //     clickCount: 0 
        // });

        // const cart = Cart.create({ totalPrice: 0, UserUsername: newUser2.username})
        // await cart.addItem(macBook)
        console.log(newUser2)
        expectExport(newUSer.isAdmin).toBeTruthy()



    });


});