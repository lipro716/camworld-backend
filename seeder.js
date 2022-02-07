require('./models/Associations')
const User = require('./models/User');
const Role = require('./models/Role');
const UserRole = require('./models/UserRole');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Taxonomy = require("./models/Taxonomy");
const SubTaxonomy = require("./models/SubTaxonomy");
const ProductSubTaxonomy = require("./models/ProductSubTaxonomy");
const Gallery = require("./models/Gallery");
const Highlight = require("./models/Highlight");
const Review = require("./models/Review");
const Spec = require("./models/Spec");
const dotenv = require('dotenv')
const categories = require('./data/categories')
const products = require('./data/products')

dotenv.config();

const sequelize = require('./utils/database');
const {createProduct} = require('./graphql/resolver/productResolver');
const {createCategory} = require('./graphql/resolver/categoryResolver');

async function db() {
    try {
        await sequelize.sync()
    } catch (e) {
        console.log(e)
    }
}

db()
const importData = async () => {
    try {
        for await (let item of categories) {
            await createCategory(item)
        }
        for await (let item of products) {
            await createProduct(item)
        }
        console.log('Data Imported!')
        process.exit()
    } catch (e) {
        console.log(e)
        process.exit()
    }
}

const destroyData = async () => {
    try {
        await User.destroy({where: {}})
        await Role.destroy({where: {}})
        await UserRole.destroy({where: {}})
        await Product.destroy({where: {}})
        await Category.destroy({where: {}})
        await Taxonomy.destroy({where: {}})
        await SubTaxonomy.destroy({where: {}})
        await ProductSubTaxonomy.destroy({where: {}})
        await Gallery.destroy({where: {}})
        await Highlight.destroy({where: {}})
        await Review.destroy({where: {}})
        await Spec.destroy({where: {}})
        console.log('Data Destroyed!')
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

if (process.argv[2] === '-d') {
    destroyData().then()
} else {
    importData().then()
}