<script lang="ts">
    import {get} from 'svelte/store';
    import {cartItems, addToCart, removeFromCart} from '../cart';
    export let product : Product = {id: "", name: "", price: 0, image: ""};
    let cart = get(cartItems);
    let cartItemIndex = cart.findIndex((item) => {return item.id === product.id});
    let cartProduct = cart[cartItemIndex];
    // to listen to changes to cartItems...
    cartItems.subscribe((newCartValue) => {
        cart = newCartValue;
        cartItemIndex = cart.findIndex((item) => {return item.id === product.id});
        cartProduct = cart[cartItemIndex];
    })

</script>

<div class="card">
    <header class="card-header">
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
    </header>
    <div class="flex justify-center">
        <img class="product-picture" src={product.image} alt={`Image of ${product.name}`} />
    </div>
    {#if cartProduct}
    <div class="card-body px-4">
        Quantity: <strong>{cartProduct.quantity}</strong>
    </div>
    {/if}
    <footer class="card-footer">
        <button class="p-2 rounded variant-glass-primary" on:click={() => addToCart(product.id)}>Add</button>
        <button class="p-2 rounded variant-glass-error" on:click={() => removeFromCart(product.id)}>Remove</button>
    </footer>
</div>

<style>
    .product-picture {
        display: flex;
        margin: 20px;
        max-width: 90%;
        max-height: 70%;
        background-color:orange;
        border-radius: 25px;
    }
    .card-header, .card-footer {
        display: flex;
        margin: 5px;
        flex-direction: row;
        justify-content: space-between;
    }

</style>