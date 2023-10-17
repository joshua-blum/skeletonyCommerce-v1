import {writable, get} from 'svelte/store';

export const cartItems = writable<CartItem[]>([]);
// [ { id: "1", quantity: 4 }]

// add to cart func
export const addToCart = (id: string) => {
    // cartItems is a writable, NOT a valuable
    let items = get(cartItems);
    let itemPosition = items.findIndex( ( item ) => { return item.id === id } )  // does the current item have an id of "id"
    //item is not in the cart at all, so add obj to cart
    if(itemPosition < 0){
        cartItems.update(() => {
            return [... items, {id: id, quantity: 1}];
        })
    } else {
        cartItems.update(() => {
            let updatedItems = items.map((item) => {
                if(item.id === id) { return {...item, quantity: item.quantity + 1}}
                else return item
                })
            return updatedItems;
        })
    }
    //item is in cart, so add quantity
}

// remove from cart func -> change value of the writable!
export const removeFromCart = (id: string) => {
    let items = get(cartItems);
    let itemPosition = items.findIndex( ( item ) => { return item.id === id } ) 

    // if removing the item brings qty to 0, remove it from array entirely
    if(items[itemPosition]?.quantity - 1 === 0){ items.splice(itemPosition, 1) }
    else {
        cartItems.update(() => {
            let updatedItems = items.map((item) => {
                if(item.id === id) { return {...item, quantity: item.quantity - 1 }}
                else return item
                })
            return updatedItems;
        })
    }

}