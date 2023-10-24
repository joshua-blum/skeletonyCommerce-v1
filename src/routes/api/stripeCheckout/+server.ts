// localhost:5173/api/stripeCheckout

//POST /stripeCheckout  data: items
// return -> url created by Stripe for our user to use

import type { RequestHandler } from './$types';
import Stripe from 'stripe';

const SECRET_STRIPE_KEY = "sk_test_51O2MD1KQ9sDN5lZwWkNb7dZJGgxtH1oYHhphdlqCqqPQ9ny6HcT6xuo81QpP1v7Rfc4eQDNcyrtvaAo1WNa7TGfT00lm14RcP1";
const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: '2023-10-16'
});

export const POST: RequestHandler = async ( {request} ) => {
    // frontend will pass data to request
    const data = await request.json();
    const items = data.items;

    /*
        we have [ {id: "1", quantity: 6}, {id: "2", quantity: 5}, {id: "3", quantity: 4} ]
        stripe wants id to become price --> [ {price: "1", quantity: 6}, {price: "2", quantity: 5}, {price: "3", quantity: 4} ]
    */ 

    let lineItems : StripeItem[] = [];
    items.forEach((item: CartItem) => {
        lineItems.push( { price: item.id, quantity: item.quantity });
    });

    // it gives us a URL for the person to checkout
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://skeletony-commerce-v1.vercel.app/success",
        cancel_url: "http://skeletony-commerce-v1.vercel.app/cancel"
    })

    return new Response(
        JSON.stringify({ url: session.url }),
        {
            status: 200,
            headers: {'content-type': 'application/json'}
        }
    )
}