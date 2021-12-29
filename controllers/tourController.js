const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is : ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid ID"
        });
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'failed',
            message: 'Missing name or price'
        });
    }
    next();
}

// Get All Tours Function
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
}
// Get Tour Function
exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}
// Create Tour Function
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        });
}
// Update Tour Function
exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
}
// Delete Tour Function
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
}

// // Get All Tours
// app.get('/api/v1/tours', getAllTours);
// // Get Tour
// app.get('/api/v1/tours/:id', getTour);
// // Create Tour
// app.post('/api/v1/tours', createTour);
// // Update Tour
// app.patch('/api/v1/tours/:id', updateTour);
// // Delete Tour
// app.delete('/api/v1/tours/:id', deleteTour);