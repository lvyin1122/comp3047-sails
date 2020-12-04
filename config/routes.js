/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },

  // Homepage
  'GET /': 'CouponController.home',

  // Create
  'GET /coupon/create': 'CouponController.create',
  'POST /coupon/create': 'CouponController.create',

  // Read
  'GET /coupon/read/:id': 'CouponController.read',

  // Admin
  'GET /coupon/admin/': 'CouponController.admin',

  // Update
  'GET /coupon/update/:id': 'CouponController.update',
  'POST /coupon/update/:id': 'CouponController.update',

  // Delete
  'POST /coupon/delete/:id': 'CouponController.delete',

  // Search
  'GET /coupon/search': 'CouponController.search',

  // Redeem
  'GET /user/redeem': 'UserController.redeem',
  // 'POST /coupon/redeem': 'CouponController.redeem',

  // User
  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',

  // Associations
  'GET /coupon/:id/holders': 'CouponController.populate',
  'GET /user/:id/coupons': 'UserController.populate',
  'POST /user/coupons/add/:fk': 'UserController.add',
  'POST /user/coupons/remove/:fk': 'UserController.remove',
  'GET /user/coupon/:fk': 'UserController.ifAdded',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
