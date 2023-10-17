<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';
	// import axios from 'axios';

	const products : Product[] = [
		{
			id: "price_1O2MLyKQ9sDN5lZw5muc9Dt1",
			name: "Coffee",
			price: 5
		},
		{
			id: "price_1O2MMwKQ9sDN5lZwwZnIbWDi",
			name: "Sunglasses",
			price: 10
		},
		{
			id: "price_1O2MNEKQ9sDN5lZwwNIld2TF",
			name: "Water bottle",
			price: 15
		}
	]

	async function checkout() {
		await fetch("api/stripeCheckout", { //http://localhost:5173/api/stripeCheckout
			method: "POST",
			headers: {
				"Content-Type": "applcation/json"  // allows us to send json in a body
			},
			body: JSON.stringify({
				items: get(cartItems)
			})
		}).then((data) => {
			return data.json()
		}).then((data) => {
			// forward user to the transaction url returned from stripe
			window.location.replace(data.url);
		})
	}

</script>

<div class="container h-full mx-auto py-20 flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>SvelteKit 1.0 Store</h1>
		</div>
		{#each products as product}
		<ProductCard {product}/>
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}>Checkout with Stripe API</button>
		</div>
	</div>
</div>
