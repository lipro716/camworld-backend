require('./models/Associations')

dotenv.config()

const sequelize = require('./utils/database')

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
        console.log('Data Imported!')
        process.exit()
    } catch (e) {
        console.log(e)
        process.exit()
    }
}

const destroyData = async () => {
    try {
        console.log('Data Destroyed!')
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}