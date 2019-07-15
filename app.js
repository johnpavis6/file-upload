var express = require('express')
var app = express()

var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

var upload = multer({ storage: storage });

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('./public'))

app.get('/', (req, res) => {
	res.render('upload')
})

app.post('/upload', upload.single('file'), (req, res) => {
	if (!req.file) {
		res.sendStatus(400)
		return
	}
	console.log(req.file)
	res.sendStatus(200)
})

const port = 8080;
app.listen(port, (err) => {
	console.log(`App runs on http://localhost:${port}`)
})