const Role = require("../../models/Role");

module.exports = {
    async getRoleByName(name) {
        return await Role.findOrCreate({
            where: { name }
        })
    }
}