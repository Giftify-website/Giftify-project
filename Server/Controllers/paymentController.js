const { Users, Role, Products , ContactUs , Reaction, Order, Wishlist, Payments ,Recipient } = require('../Models');
const Stripe = require('stripe');
const { route } = require('../Routes/pagesRoutes');
const router = require('../Routes/pagesRoutes');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function addRecipientInfo(req, res){
    try{
        const userID = req.user.id;
        const { recipien_name,
                recipien_phone_number,
                recipien_card_id,
                card_text,
                recipien_location,
                order_id,
            } = req.body;
        const recipient = Recipient.create({
            recipien_name : recipien_name,
            recipien_phone_number : recipien_phone_number,
            recipien_card_id : recipien_card_id,
            card_text : card_text,
            recipien_location : recipien_location,
        });
        const order_for = recipient.recipient_id;
        const theOrder = await Order.update(
            {order_for}, 
            {
                where: { order_id: order_id },
                returning: true,
            });
    }catch(error){
        res.status(500).json('error in Recipient Info');
    }
};

async function getPayment(req, res){
    // const userID = req.user.id;
    // let total = 0;
    // const line_items = req.body.cart.map((product) =>{
            // total = total + (product.price * product.count);
    //     return {
    //         price_data : {
    //             currency : "usd",
    //             product_data : {
    //                 name : product.product_name,
    //                 images : [product.imgurl],
    //                 description : product.description,
    //             },
    //             unit_amount : product.price,
    //         },
    //         quantity: product.count,
    //     }
    // });
    const session = await stripe.checkout.sessions.create({
        // shipping_address_collection: {
        //     allowed_countries: ['US', 'JO'],
        //   },
        //   shipping_options: [
        //     {
        //       shipping_rate_data: {
        //         type: 'fixed_amount',
        //         fixed_amount: {
        //           amount: 0,
        //           currency: 'usd',
        //         },
        //         display_name: 'Free shipping',
        //         delivery_estimate: {
        //           minimum: {
        //             unit: 'business_day',
        //             value: 5,
        //           },
        //           maximum: {
        //             unit: 'business_day',
        //             value: 7,
        //           },
        //         },
        //       },
        //     },
        //     {
        //       shipping_rate_data: {
        //         type: 'fixed_amount',
        //         fixed_amount: {
        //           amount: 1500,
        //           currency: 'usd',
        //         },
        //         display_name: 'Next day air',
        //         delivery_estimate: {
        //           minimum: {
        //             unit: 'business_day',
        //             value: 1,
        //           },
        //           maximum: {
        //             unit: 'business_day',
        //             value: 1,
        //           },
        //         },
        //       },
        //     },
        //   ],
        line_items: [
          {
            price_data : {
                currency : "usd",
                product_data : {
                    name : "iphone 12 promax",
                    images : ['https://i5.walmartimages.com/seo/Verizon-Apple-iPhone-15-Pro-Max-256GB-Natural-Titanium_43b58742-b6ad-491a-a795-e6c2eb6bcc6f.d6fa026332e1941b129f607c592844ab.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'],
                    description : "this is a phone",
                },
                unit_amount : 10210,
            },
            quantity: 2,
          },
          {
            price_data : {
                currency : "usd",
                product_data : {
                    name : "iphone 12 promax",
                    images : ['https://i5.walmartimages.com/seo/Verizon-Apple-iPhone-15-Pro-Max-256GB-Natural-Titanium_43b58742-b6ad-491a-a795-e6c2eb6bcc6f.d6fa026332e1941b129f607c592844ab.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'],
                    description : "this is a phone",
                },
                unit_amount : 10210,
            },
            quantity: 2,
          },
          {
            price_data : {
                currency : "usd",
                product_data : {
                    name : "iphone 12 promax",
                    images : ['https://i5.walmartimages.com/seo/Verizon-Apple-iPhone-15-Pro-Max-256GB-Natural-Titanium_43b58742-b6ad-491a-a795-e6c2eb6bcc6f.d6fa026332e1941b129f607c592844ab.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'],
                    description : "this is a phone",
                },
                unit_amount : 10210,
            },
            quantity: 2,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:8080/homepage`,
        cancel_url: `http://localhost:8080/notResponding`,
      });

    //   const payment = Payments.create({
    //     user_payment_id : userID,
    //     order_payment_id: orderID,
    //     total : total,
    //     payment_for : payment_for_id
    //   });

    // const is_deleted = true;
    //   const order = await Order.update(
    //     {is_deleted}, 
    //     {
    //         where: { order_id: order_id },
    //         returning: true,
    //     });

      res.redirect(session.url);
};

module.exports = {
    getPayment,
    addRecipientInfo,
};