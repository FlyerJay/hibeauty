/**
 * @author flyerjay
 * @desc 相册实体类
 * @since 2018-05-17
 */

'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;

  const Album = app.model.define('Album', {
    albumId: {
      type: INTEGER,
      primaryKey: true,
    },
    albumName: {
      type: STRING,
      allowNull: false,
      comment: '相册名称'
    },
    albumCover: {
      type: STRING,
      allowNull: false,
      comment: '相册封面'
    },
  }, {
    freezeTabName: true,
    tableName: 'album',
    timestamps: false
  });

  Album.list = async function(options) {
    const rs = await this.findAndCountAll({
      limit: Number(options.pageSize) || 30,
      offset: (options.page - 1) * (Number(options.pageSize) || 30) || 0,
      order: [
        ['albumId', 'DESC']
      ]
    });
    return {
      code: 200,
      data: rs.rows || [],
      pageInfo: {
        pageSize: options.pageSize || 30,
        totalCount: rs.count,
        page: Number(options.page)
      }
    };
  };

  return Album;
};