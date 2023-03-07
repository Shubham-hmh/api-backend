import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());


const port = 5000 || process.env.port;

mongoose.connect(process.env.MONGO_URL);
const postSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sold: {
        type: Boolean,
        required: true,
    },
    dateOfSale: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);
// async function getPosts() {
//     const myPosts = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
//     const response = await myPosts.json();
//     // console.log(response);
//     for (let i = 0; i < response.length; i++) {
//         const post = new Post({
//             id: response[i]['id'],
//             title: response[i]['title'],
//             description: response[i]['description'],
//             image: response[i]['image'],
//             sold: response[i]['sold'],
//             dateOfSale: response[i]['dateOfSale'],
//             category: response[i]['category'],
//             price: response[i]['price'],

//         });
//         post.save();
//     }
// }

// getPosts();

//api -1 --------------------->

app.get("/", async (req, res) => {
    const { month } = req.body;
    const posts = await Post.find();
    let filtered = posts.filter((item) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            (itemDate == month) && item.sold == true
        );
    });

    let filteredNotSold = posts.filter((item) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            (itemDate == month) && item.sold == false
        );
    });


    let sum = filtered.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);
    let totalAmount = Math.round(sum);

    res.json({ totalSoldItem: filtered.length, notSoldItem: filteredNotSold.length, totalSale: totalAmount })

});

// api-4: ------------------> make 3 function to combine api  

async function getapi1(month) {
    const posts = await Post.find();
    let filtered = posts.filter((item) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            (itemDate == month) && item.sold == true
        );
    });

    let filteredNotSold = posts.filter((item) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            (itemDate == month) && item.sold == false
        );
    });


    let sum = filtered.map((item) => item.price).reduce((prev, curr) => prev + curr, 0);
    let totalAmount = Math.round(sum);
    return ({ totalSoldItem: filtered.length, notSoldItem: filteredNotSold.length, totalSale: totalAmount });


}

async function getapi2(month) {
    const posts = await Post.find();
    let a = 0; let b = 0; let h = 0; let i = 0; let j = 0; let c = 0;
    let d = 0; let e = 0; let f = 0;
    let g = 0;
    const category1 = posts.filter((item, index) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            itemDate == month
        )
    });

    category1.forEach((item) => {
        if (item.price > 0 && item.price <= 100) {
            a++;
        }
        else if (item.price > 100 && item.price <= 200) {
            b++;
        }
        else if (item.price > 200 && item.price <= 300) {
            c++;
        }
        else if (item.price > 300 && item.price <= 400) {
            d++;
        }
        else if (item.price > 400 && item.price <= 500) {
            e++;
        }
        else if (item.price > 500 && item.price <= 600) {
            f++;
        }
        else if (item.price > 600 && item.price <= 700) {
            g++;
        }
        else if (item.price > 700 && item.price <= 800) {
            h++;
        }
        else if (item.price > 800 && item.price <= 900) {
            i++;
        }
        else {
            j++;
        }
    })
    const length = category1.length;
    return ({
        // category1, length,
        "0-100": a,
        "101-200": b,
        "201-300": c,
        "301-400": d,
        "401-500": e,
        "501-600": f,
        "601-700": g,
        "701-800": h,
        "801-900": i,
        "900-above": j,

    }
    );

}


async function getapi3(month) {
    const posts = await Post.find();
    const category1 = posts.filter((item, index) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            (itemDate == month) && item.category
        )
    });

    const category2 = category1.map((item, index) => {
        return (
            item.category
        )
    })

    const myArr = [];
    const uniqueCount2 = {};

    for (const element of category2) {
        if (uniqueCount2[element]) {
            uniqueCount2[element] += 1;
        } else {
            uniqueCount2[element] = 1;
        }
    }

    for (const key in uniqueCount2) {
        myArr.push({ category: key, totalItem: uniqueCount2[key] });
    }
    return uniqueCount2;
}


//api-2 ------------->

app.get("/api-1", async (req, res) => {
    const { month } = req.body;
    const posts = await Post.find();
    let a = 0; let b = 0; let h = 0; let i = 0; let j = 0; let c = 0;
    let d = 0; let e = 0; let f = 0;
    let g = 0;
    const category1 = posts.filter((item, index) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            itemDate == month
        )
    });

    category1.forEach((item) => {
        if (item.price > 0 && item.price <= 100) {
            a++;
        }
        else if (item.price > 100 && item.price <= 200) {
            b++;
        }
        else if (item.price > 200 && item.price <= 300) {
            c++;
        }
        else if (item.price > 300 && item.price <= 400) {
            d++;
        }
        else if (item.price > 400 && item.price <= 500) {
            e++;
        }
        else if (item.price > 500 && item.price <= 600) {
            f++;
        }
        else if (item.price > 600 && item.price <= 700) {
            g++;
        }
        else if (item.price > 700 && item.price <= 800) {
            h++;
        }
        else if (item.price > 800 && item.price <= 900) {
            i++;
        }
        else {
            j++;
        }
    })
    const length = category1.length;
    res.json({
        // category1, length,
        "0-100": a,
        "101-200": b,
        "201-300": c,
        "301-400": d,
        "401-500": e,
        "501-600": f,
        "601-700": g,
        "701-800": h,
        "801-900": i,
        "900-above": j,

    }
    );
});

//api-3------------------->

app.get('/api-2', async (req, res) => {
    const { month } = req.body;
    const posts = await Post.find();
    const category1 = posts.filter((item, index) => {
        let itemDate = new Date(item.dateOfSale).toLocaleString('default', { month: 'long' });
        return (
            (itemDate == month) && item.category
        )
    });

    const category2 = category1.map((item, index) => {
        return (
            item.category
        )
    })

    const myArr = [];
    const uniqueCount2 = {};

    for (const element of category2) {
        if (uniqueCount2[element]) {
            uniqueCount2[element] += 1;
        } else {
            uniqueCount2[element] = 1;
        }
    }

    for (const key in uniqueCount2) {
        myArr.push({ category: key, totalItem: uniqueCount2[key] });
    }
    res.json(myArr);

});



// api-4--------------->
app.get("/api-3", async (req, res) => {
    const { month } = req.body;
    let myarr = [];

    const data1 = await getapi1(month);
    const data2 = await getapi2(month);
    const data3 = await getapi3(month);

    myarr.push(data1, data2, data3);
    res.json(myarr);


})


//getPosts();
app.listen(port, (req, res) => {
    console.log(`server is running port : ${port}`);
})