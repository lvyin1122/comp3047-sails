/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('coupon/create');
        
        var coupon = await Coupon.create(req.body).fetch();

        return res.status(201).json({ id: coupon.id });
    },

};

