/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // action - home
    home: async function (req, res) {

        var hkisland = await Coupon.find({
            where: {region: "HK Island"},
            sort: "exdate",
            limit: 2
        });

        var kowloon = await Coupon.find({
            where: {region: "Kowloon"},
            sort: "exdate",
            limit: 2
        });

        var nt = await Coupon.find({
            where: {region: "New Territories"},
            sort: "exdate",
            limit: 2
        });

        // hkisland = hkisland.slice(0, 2);
        // kowloon = kowloon.slice(0, 2);
        // nt = nt.slice(0, 2);
        
        return res.view(
            'coupon/home', 
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

    // action - read
    read: async function (req, res) {

        var thatCoupon = await Coupon.findOne(req.params.id);
    
        if (!thatCoupon) return res.notFound();
    
        return res.view('coupon/read', { coupon: thatCoupon });
    },

    // action - admin
    admin: async function (req, res) {

        var coupons = await Coupon.find().sort("id");
        
        return res.view('coupon/admin', { coupons: coupons });
    },

    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var thatCoupon = await Coupon.findOne(req.params.id);

            if (!thatCoupon) return res.notFound();

            return res.view('coupon/update', { coupon: thatCoupon });
            
        } else {
        
            var updatedCoupon = await Coupon.updateOne(req.params.id).set(req.body);

            if (!updatedCoupon) return res.notFound();

            return res.redirect("/coupon/update/" + req.params.id);;
        }
    },

    // action - delete
    delete: async function (req, res) {

        var deletedCoupon = await Coupon.destroyOne(req.params.id);
    
        if (!deletedCoupon) return res.notFound();
    
        return res.redirect("/coupon/admin");; 
    },

    // action - search
    search: async function(req, res) {

        if(req.wantsJSON){
            // Pagination
            var limit = 2;
            // if (!req.query.offset) var
            var offset = Math.max(req.query.offset, 0) || 0;
    
            // Search
            var whereClause = {};
            var searchUrl = "&";
            var query = {};
        
            if (req.query.region) {
                whereClause.region = req.query.region;
                query.region = req.query.region;
                searchUrl += "region=" + req.query.region + "&";
            }
            if (req.query.exdate) {
                whereClause.exdate = req.query.exdate;
                query.exdate = req.query.exdate;
                searchUrl += "exdate=" + req.query.exdate + "&";
            }
            var parsedMin = parseInt(req.query.min);
            if (!isNaN(parsedMin)) {
                if (!whereClause.coins) whereClause.coins = {};
                whereClause.coins['>='] = parsedMin;
                query.min = parsedMin;
                searchUrl += "min=" + parsedMin.toString() + "&";
            }
            var parsedMax = parseInt(req.query.max);
            if (!isNaN(parsedMax)) {
                if (!whereClause.coins) whereClause.coins = {};
                whereClause.coins['<='] = parsedMax;
                query.max = parsedMax;
                searchUrl += "max=" + parsedMax.toString() + "&";
            }
            
            var thoseCoupons = await Coupon.find({
                where: whereClause,
                sort: 'exdate',
                limit: limit,
                skip: offset
            });
    
            var count = await Coupon.count({
                where: whereClause,
            });

            return res.json({ 
                coupons: thoseCoupons, 
                numOfRecords: count, 
                searchUrl: searchUrl,
                query: query
            });

        } else {
            // Pagination
            var limit = 2;
            // if (!req.query.offset) var
            var offset = Math.max(req.query.offset, 0) || 0;
    
            // Search
            var whereClause = {};
            var searchUrl = "&";
            var query = {};
        
            if (req.query.region) {
                whereClause.region = req.query.region;
                query.region = req.query.region;
                searchUrl += "region=" + req.query.region + "&";
            }
            if (req.query.exdate) {
                whereClause.exdate = req.query.exdate;
                query.exdate = req.query.exdate;
                searchUrl += "exdate=" + req.query.exdate + "&";
            }
            var parsedMin = parseInt(req.query.min);
            if (!isNaN(parsedMin)) {
                if (!whereClause.coins) whereClause.coins = {};
                whereClause.coins['>='] = parsedMin;
                query.min = parsedMin;
                searchUrl += "min=" + parsedMin.toString() + "&";
            }
            var parsedMax = parseInt(req.query.max);
            if (!isNaN(parsedMax)) {
                if (!whereClause.coins) whereClause.coins = {};
                whereClause.coins['<='] = parsedMax;
                query.max = parsedMax;
                searchUrl += "max=" + parsedMax.toString() + "&";
            }
            
            var thoseCoupons = await Coupon.find({
                where: whereClause,
                sort: 'exdate',
                limit: limit,
                skip: offset
            });
    
            var count = await Coupon.count({
                where: whereClause,
            });
            
            return res.view(
                'coupon/search', 
            { 
                coupons: thoseCoupons, 
                numOfRecords: count, 
                searchUrl: searchUrl,
                query: query
            });
        }
        
    },

    populate: async function (req, res) {

        var coupon = await Coupon.findOne(req.params.id).populate("holders");
    
        if (!coupon) return res.notFound();
    
        return res.json(coupon);
    },

};

