const { application } = require('express');
const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const Customer = require('./models/customer');
const customer = require('./models/customer');

// express app
const app = express();

// connect to MONGODB
const dbURI ='mongodb+srv://customer:9849gubba@customer.gqkcm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> app.listen(3000)) // listen for requests
.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')


// middle ware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

var cust1 = {};

// Signup
app.post('/login', (req, res) => {
    const customer = new Customer(req.body);
    console.log(customer);
    Customer.find()
        .then((result) => {
            var flag = 0;
            result.forEach(element =>{
                if (element.email == customer.email){
                    flag+=1;
                }
            })

            // console.log(count)
            if (flag == 0){
                customer.save()
                    .then((result) => {
                        console.log("result : " + result);
                        cust1 = result;
                        res.render('index1',{result});
                    })

                    .catch((err) =>{
                        console.log(err);
                    })
            }
            else
            res.send("<h1> User exits with this email </h1>"); 
        })
});


// Login
app.post('/index', (req,res) =>{
    const customer = new Customer(req.body);
    Customer.find()
        .then((result) =>{
            var there = 0;
            result.forEach(ele =>{
                if (ele.email == customer.email && ele.password==customer.password){
                    there +=1;
                    result = ele;
                    cust1 = ele;
                }
            })

            // console.log(there)
            if (there == 0){
                res.send("user does not exists ");
            }
            else{
                console.log("data is"+cust1)
                res.render('index1',{result:cust1});
            }
        })
});


// send html pages
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index1', (req, res) => {
    res.render('index1');
});

app.get('/medicines', (req, res) => {
    res.render('medicines');
});

app.get('/healthcare_products', (req, res) => {
    res.render('healthcare_products');
});

app.get('/Labtests', (req, res) => {
    res.render('Labtests');
});

app.get('/customer_reviews', (req, res) => {
    res.render('customer_reviews');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/location', (req, res) => {
    res.render('location');
});

// 404
app.use((req, res) => {
    res.status(404).render('404');
});