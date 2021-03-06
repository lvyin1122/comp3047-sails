/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

// const Coupon = require('../api/models/Coupon');
// const User = require('../api/models/User');

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);

  if (await Coupon.count() > 0) {
    return generateUsers();
  }

  await Coupon.createEach([
    {
      title: "Simply receive a complimentary drink",
      restaurant: "Greyhound Cafe",
      region: "HK Island",
      mall: "IFC Mall",
      image: "https://user-images.githubusercontent.com/42922524/96556586-ba786900-12eb-11eb-9e5a-0c3ff43ee88c.png",
      quota: 300,
      coins: 500,
      exdate: "2021-03-31",
      detail: "Offers is valid after 6pm for dine-in only."
    },
    {
      title: "50% discount on Supreme Seafood Feast (for 2 persons)",
      restaurant: "Mango Tree",
      region: "Kowloon",
      mall: "Elements",
      image: "https://user-images.githubusercontent.com/42922524/96556840-13e09800-12ec-11eb-9e31-f3ce951977e3.png",
      quota: 500,
      coins: 700,
      exdate: "2021-06-16",
      detail: "Orignal price: HK$790 per person."
    },
    {
      title: "15% Off on Whole Bill",
      restaurant: "ANA Gura",
      region: "Kowloon",
      mall: "Festival Walk",
      image: "https://user-images.githubusercontent.com/42922524/96557215-86517800-12ec-11eb-85f7-c3154ad4fa25.png",
      quota: 100,
      coins: 800,
      exdate: "2021-01-31",
      detail: "Dine-in only."
    },
    {
      title: "20% Off on Set Dinner",
      restaurant: "Achacha Food & Beverage Boutique",
      region: "Kowloon",
      mall: "MegaBox",
      image: "https://user-images.githubusercontent.com/42922524/96558886-e517f100-12ee-11eb-8761-4382c11ba957.png",
      quota: 200,
      coins: 200,
      exdate: "2021-01-15",
      detail: "Only for set dinner."
    },
    {
      title: "50% Off Yoogane's Chicken Galbi",
      restaurant: "Yoogane",
      region: "New Territories",
      mall: "New Town Plaza",
      image: "https://user-images.githubusercontent.com/42922524/96557968-97e74f80-12ed-11eb-8993-e4f6b04654d6.png",
      quota: 600,
      coins: 500,
      exdate: "2020-12-31",
      detail: "Orignal price: HK$790 per person."
    }

  ]);

  return generateUsers();

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    var hash = await sails.bcrypt.hash('123456', salt);

    await User.createEach([
      { username: "admin", password: hash, role: "admin" },
      { username: "Member1", password: hash, role: "member", coins: 50},
      { username: "Member2", password: hash, role: "member", coins: 5000},
      { username: "Visitor1", password: hash, role: "visitor" },
      { username: "Visitor2", password: hash},
      // etc.
    ]);

    const coupon1 = await Coupon.findOne({title: "Simply receive a complimentary drink"});
    const coupon2 = await Coupon.findOne({title: "50% discount on Supreme Seafood Feast (for 2 persons)"});
    const admin = await User.findOne({username: "admin"});
    const member1 = await User.findOne({username: "Member1"});
    const member2 = await User.findOne({username: "Member1"});

    await User.addToCollection(admin.id, 'coupons').members(coupon1.id);
    await User.addToCollection(member1.id, 'coupons').members([coupon1.id, coupon2.id]);
    await User.addToCollection(member2.id, 'coupons').members([coupon2.id]);
  }

};
