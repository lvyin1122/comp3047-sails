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

module.exports.bootstrap = async function() {

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

  if (await Coupon.count() > 0) {
    return;
  }

  await Coupon.createEach([
      { title: "Simply receive a complimentary drink", 
        restaurant: "Greyhound Cafe",
        region: "HK Island",
        mall: "IFC Mall",
        image: "https://user-images.githubusercontent.com/42922524/96556586-ba786900-12eb-11eb-9e5a-0c3ff43ee88c.png",
        quota: 300,
        coins: 500,
        exdate: "2021-03-31",
        detail: "Offers is valid after 6pm for dine-in only."
      },
      { title: "50% discount on Supreme Seafood Feast (for 2 persons)", 
        restaurant: "Mango Tree",
        region: "Kowloon",
        mall: "Elements",
        image: "https://user-images.githubusercontent.com/42922524/96556840-13e09800-12ec-11eb-9e31-f3ce951977e3.png",
        quota: 500,
        coins: 700,
        exdate: "2021-06-16",
        detail: "Orignal price: HK$790 per person."
      },
      { title: "15% Off on Whole Bill", 
        restaurant: "ANA Gura",
        region: "Kowloon",
        mall: "Festival Walk",
        image: "https://user-images.githubusercontent.com/42922524/96557215-86517800-12ec-11eb-85f7-c3154ad4fa25.png",
        quota: 100,
        coins: 800,
        exdate: "2021-01-31",
        detail: "Dine-in only."
      },
      { title: "20% Off on Set Dinner", 
        restaurant: "Achacha Food & Beverage Boutique",
        region: "Kowloon",
        mall: "MegaBox",
        image: "https://user-images.githubusercontent.com/42922524/96558886-e517f100-12ee-11eb-8761-4382c11ba957.png",
        quota: 200,
        coins: 200,
        exdate: "2021-01-15",
        detail: "Only for set dinner."
      },
      { title: "50% Off Yoogane's Chicken Galbi", 
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

};
