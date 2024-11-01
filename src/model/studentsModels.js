const { DataTypes, Model } = require("sequelize");

class Students extends Model {
    static init = (sequelize) => {
        super.init(
            {
                id: {
                    type: DataTypes.NUMBER,
                    autoIncrement: true,
                    primaryKey: true
                },
                sid: {
                    type: DataTypes.BIGINT,
                    allowNull: false
                },
                firstname: {
                    type: DataTypes.STRING(100),
                    allowNull: false
                },
                lastname: {
                    type: DataTypes.STRING(100),
                    allowNull: false
                },
                dni: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(100),
                    allowNull: false
                },
                deleted: {
                    type: DataTypes.TINYINT,
                    defaultValue: 0
                }
            },
            {
                sequelize,
                modelName: 'students',
            }
        );

        return this;
    }

    static getAll = async () => {
        return await this.findAll({
            where: {
                deleted: 0
            },
            attributes: {
                exclude: ['deleted', 'createdAt', 'updatedAt']
            }
        });
    };

    static findByDniOrEmail = async (dni, email) => {
        return await this.findAll({
            where: {
                deleted: 0,
                [Op.or]: [
                    { dni },
                    { email }
                ]
            },
            attributes: {
                exclude: ['deleted', 'createdAt', 'updatedAt']
            }
        });



    };

    static getById = async (id) => {
        return await this.findOne({
            where: {
                deleted: 0,
                id
            },
            attributes: {
                exclude: ['deleted', 'createdAt', 'updatedAt']
            }
        });
    };

    static updateById = async (id, payload) => {
        return await this.update(payload, {
            where: {
                id
            }
        });
    };





    static deleteById = async (id) => {
        return await this.update(
            {
                deleted: 1
            },
            {
                where: {
                    id
                }
            }
        );
    };
}

module.exports = {
    Students
};