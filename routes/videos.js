var express = require('express');
var router = express.Router();
var videoController = require('../controllers/VideoController');

/* GET videos listing. */
router.get('/:videoname', videoController.getOne);
router.get('/', videoController.getAll);

router.post('/', videoController.register);
router.put('/:videoname', videoController.update);
router.delete('/:videoname', videoController.delete);

module.exports = router;