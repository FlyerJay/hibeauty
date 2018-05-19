/**
 * @author flyerjay
 * @desc 相册实体类
 * @since 2018-05-17
 */

'use strict';

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const Album = app.model.define('Album', {
        albumId: {
			type: INTEGER,
			primaryKey: true,
		},
		albumName: {
			type: STRING,
			allowNull:false,
			comment:"相册名称"
		},
        albumCover: {
			type: STRING,
			allowNull:false,
			comment:"相册封面"
		},
    }, {
        freezeTabName: true,
		tableName: "album",
		timestamps: false
    })

    Album.list = async function (options) {
        let rs = await this.findAndCountAll({
            limit: options.pageSize - 0 || 60,
            offset: (options.page - 1) * (options.pageSize || 60 - 0) || 0,
        })
        return {
            code: 200,
            data: rs.rows || [],
            pageInfo: {
                pageSize: options.pageSize,
                totalCount: rs.count,
                page: options.page
            }
        }
    }

    return Album;
}