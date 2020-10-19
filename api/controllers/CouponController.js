/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - homepage
    homepage: async function (req, res) {

        var hkisland = await Coupon.find({
            where: {region: "HK Island"},
            sort: "exdate"
        });

        var kowloon = await Coupon.find({
            where: {region: "Kowloon"},
            sort: "exdate"

        });

        var nt = await Coupon.find({
            where: {region: "New Territories"},
            sort: "exdate"
        });

        hkisland = hkisland.slice(0, 2);
        kowloon = kowloon.slice(0, 2);
        nt = nt.slice(0, 2);
        
        return res.view(
            'coupon/homepage', 
            { coupons: [
                {
                    name: "HK Island",
                    query: hkisland,
                },
                {
                    name: "Kowloon",
                    query: kowloon,
                },
                {
                    name: "New Territories",
                    query: nt,
                }
              ]
            }
        );
    },


    // action - create
    create: async function (req, res) {

        if (req.method == "GET") return res.view('coupon/create');
        
        var coupon = await Coupon.create(req.body).fetch();

        return res.status(201).json({ id: coupon.id });
    },

};

