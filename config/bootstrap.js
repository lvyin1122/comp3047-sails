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
      { title: "50% discount on Supreme Seafood Feast (for 2 persons)", 
        restaurant: "Mango Tree",
        region: "Kowloon",
        mall: "Elements",
        image: "https://3o7tpx32lt6v2lcovs4a53lb-wpengine.netdna-ssl.com/wp-content/uploads/2013/02/383579_314631368577671_1289868602_n-500x500.jpg",
        quota: 500,
        coins: 750,
        exdate: "2020-12-31",
        detail: "Orignal price: HK$790 per person."
      },
      { title: "50% discount on Supreme Seafood Feast (for 2 persons)", 
        restaurant: "Mango Tree",
        region: "Kowloon",
        mall: "Elements",
        image: "https://3o7tpx32lt6v2lcovs4a53lb-wpengine.netdna-ssl.com/wp-content/uploads/2013/02/383579_314631368577671_1289868602_n-500x500.jpg",
        quota: 500,
        coins: 750,
        exdate: "2020-12-31",
        detail: "Orignal price: HK$790 per person."
      },
      { title: "50% discount on Supreme Seafood Feast (for 2 persons)", 
        restaurant: "Mango Tree",
        region: "HK Island",
        mall: "Elements",
        image: "https://3o7tpx32lt6v2lcovs4a53lb-wpengine.netdna-ssl.com/wp-content/uploads/2013/02/383579_314631368577671_1289868602_n-500x500.jpg",
        quota: 500,
        coins: 750,
        exdate: "2020-12-31",
        detail: "Orignal price: HK$790 per person."
      },
      { title: "50% discount on Supreme Seafood Feast (for 2 persons)", 
        restaurant: "Mango Tree",
        region: "New Territories",
        mall: "Elements",
        image: "https://3o7tpx32lt6v2lcovs4a53lb-wpengine.netdna-ssl.com/wp-content/uploads/2013/02/383579_314631368577671_1289868602_n-500x500.jpg",
        quota: 500,
        coins: 750,
        exdate: "2020-12-31",
        detail: "Orignal price: HK$790 per person."
      }
      
  ]);

};
