var Video = require('../models/video');
var debug = require('debug')('prueba:video_controller')

// Search one video
module.exports.getOne = (req, res, next) => {

    debug("Search Video", req.params);

    Video.findOne({
        videoname: req.params.videoname
    })
        .then((foundVideo) => {
            if (foundVideo)
                return res.status(200).json(foundVideo);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

// Search all videos
module.exports.getAll = (req, res, next) => {

    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Video List", { size: perPage, page, sortby: sortProperty, sort });

    Video.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort })
        .then((videos) => {
            return res.status(200).json(videos)
        }).catch(err => {
            next(err);
        })
}

// Create new video
module.exports.register = (req, res, next) => {

    debug("New Video", {
        body: req.body
    });

    Video.findOne({
        videoname: req.body.videoname
    })
        .then((foundVideo) => {
            if (foundVideo) {
                debug("Video duplicado");
                throw new Error(`Video duplicado ${req.body.videoname}`);
            } else {
                let newVideo = new Video({
                    videoname: req.body.videoname,
                    duration: req.body.duration,
                    owner: req.body.owner,
                    views: req.body.views,
                    likes: req.body.likes,
                    dislikes: req.body.dislikes
                });
                return newVideo.save();
            }
        }).then(video => { // Con el usario almacenado retornamos que ha sido creado con exito
            return res
                .header('Location', '/videos/' + video._id)
                .status(201)
                .json({
                    videoname: video.videoname
                });
        }).catch(err => {
            next(err);
        });
}

// Update video
module.exports.update = (req, res, next) => {

    debug("Update video", {
        videoname: req.params.videoname,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Video.findOneAndUpdate({
        videoname: req.params.videoname
    }, update, {
        new: true
    })
        .then((updated) => {
            console.log(updated);
            if (updated) {
                return res.status(200).json(updated);
            } else {
                return res.status(400).json(null);
            }
        }).catch(err => {
            next(err);
        });
}

// Delete video
module.exports.delete = (req, res, next) => {

    debug("Delete video", {
        videoname: req.params.videoname,
    });

    Video.findOneAndDelete({ videoname: req.params.videoname })
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).send();
            }
        }).catch(err => {
            next(err);
        })
}