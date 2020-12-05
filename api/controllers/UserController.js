/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");

        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username;
            req.session.uid = user.id;
            req.session.role = user.role;
            return res.json(user);
        }

        // Start a new session for the new login user
        req.session.regenerate(function (err) {
            if (err) return res.serverError(err);
            req.session.username = user.username;
            req.session.uid = user.id;
            req.session.role = user.role;
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            return res.redirect("/");
        });

    },

    populate: async function (req, res) {

        var user = await User.findOne(req.params.id).populate("coupons");

        if (!user) return res.notFound();

        return res.json(user);
    },

    ifAdded: async function (req, res) {
        
        var thatCoupon = await Coupon.findOne(req.params.fk).populate("holders", { id: req.session.uid });

        if (!thatCoupon) return res.status(404).json("Coupon not found.");

        if (thatCoupon.holders.length > 0)
            return res.status(409).json("Already added.");
        
        return res.ok();

    },

    add: async function (req, res) {

        var thatUser = await User.findOne(req.session.uid);

        if (!thatUser) return res.status(404).json("User not found.");

        var thatCoupon = await Coupon.findOne(req.params.fk).populate("holders", { id: req.session.uid });

        if (!thatCoupon) return res.status(404).json("Coupon not found.");

        if (thatCoupon.holders.length > 0)
            return res.status(409).json("Already added.");   // conflict

        if (thatCoupon.quota <= 0)
            return res.status(409).json("No quota left.");

        if (thatCoupon.coins > thatUser.coins)
            return res.status(409).json("Your coins are not enough.");

        await User.addToCollection(req.session.uid, "coupons").members(req.params.fk);

        await Coupon.updateOne(req.params.fk)
            .set({
                quota: thatCoupon.quota - 1
            });

        await User.updateOne(req.session.uid)
            .set({
                coins: thatUser.coins - thatCoupon.coins
            });


        return res.ok("success");
    },

    remove: async function (req, res) {

        if (!await User.findOne(req.session.uid)) return res.status(404).json("User not found.");

        var thatCoupon = await Coupon.findOne(req.params.fk).populate("holders", { id: req.session.uid });

        if (!thatCoupon) return res.status(404).json("Coupon not found.");

        if (thatCoupon.holders.length == 0)
            return res.status(409).json("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.session.uid, "coupons").members(req.params.fk);

        return res.ok();
    },

    redeem: async function (req, res) {

        var user = await User.findOne(req.session.uid).populate("coupons");
    
        if (!user) return res.notFound();
    
        if(req.wantsJSON) {
            return res.json(user.coupons);
        }else {
            return res.view('user/redeem', { coupons: user.coupons, coins: user.coins});
        }
    },

};

