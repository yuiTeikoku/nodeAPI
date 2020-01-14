'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController');

	app.route('/api/products')
		.get(todoList.list_all_products)

	app.route('/api/products/:productsId')
		.get(todoList.read_a_product)

	app.route('/api/getUserBySession')
		.post(todoList.user_by_session)

	app.route('/api/addProductToCart')
		.post(todoList.add_to_cart)

	app.route('/api/removeProductFromCart')
		.post(todoList.remove_from_cart)

	app.route('/api/getCartByUser/:userId')
		.get(todoList.get_cart_by_userId)

	app.route('/auth/authenticate')
		.post(todoList.authenticate)

	app.route('/auth/registration')
		.post(todoList.registration)	
};
