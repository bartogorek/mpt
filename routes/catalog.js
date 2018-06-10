const express = require('express');
const router = express.Router();

// Require controller modules.
const order_controller = require('../controllers/orderController');
const order_instance_controller = require('../controllers/orderinstanceController');
const admin_controller = require('../controllers/adminController');
const dashboard_controller = require('../controllers/dashboardController');
const help_controller = require('../controllers/helpController');
const fileupload_controller = require('../controllers/fileuploadController');
const selection_page = require('../controllers/selectionPage');
// const labour_planner = require('../controllers/labourPlanner');

// GET selection page
router.get('/', selection_page.select);
// ****

// Routes for progress tracker
// GET catalog home page.
router.get('/index', order_instance_controller.orderinstance_list);
// GET - index all works orders with order date matching input field.
router.get('/date/index/', order_instance_controller.orderinstance_list_by_date);
// GET - show dashboard data based on date selection.
router.get('/date/dashboard/', dashboard_controller.dashboard_date_selection);
// GET order instance view.
router.get('/orderinstance/:id', order_instance_controller.orderinstance_detail);
// POST order instance view - qauntity update.
router.post('/orderinstance/:id', order_instance_controller.orderinstance_detail_post);
// GET delete order instance.
router.get('/orderinstance/delete/:id', order_instance_controller.orderinstance_delete);
// GET roll order instance (not sure if should be post but not sending data from form so get should be fine!)
router.get('/orderinstance/roll/:id', order_instance_controller.orderinstance_roll);
// GET admin page.
router.get('/admin', admin_controller.admin_index);
// GET dashboard page.
router.get('/dashboard', dashboard_controller.dashboard_index);
// GET help page.
router.get('/help', help_controller.help_index);
// GET file upload page.
router.get('/fileupload', fileupload_controller.fileupload_index);
// POST - upload csv file.
router.post('/fileupload/upload', fileupload_controller.fileupload_post);
// GET admin : view data.
router.get('/admin/view-data', order_instance_controller.admin_view_data);
// GET admin : view data.
router.get('/admin/add-order', order_instance_controller.admin_add_orderinstance);
// POST request for creating order.
router.post('/admin/add-order', order_instance_controller.orderinstance_create_post);
//****

// Routes for Labour planner
// GET start page for labour planner
// router.get('/labour', labour_planner.start);

module.exports = router;
