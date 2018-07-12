/**
 * @author flyerjay
 * @desc 图片实体类
 * @since 2018-05-17
 */

'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;

  const Picture = app.model.define('Picture', {
    picId: {
      type: INTEGER,
      primaryKey: true,
    },
    albumId: {
      type: INTEGER,
      allowNull: false,
      comment: '相册ID'
    },
    picUrl: {
      type: STRING,
      allowNull: false,
      comment: '图片地址'
    },
    width: {
      type: INTEGER,
      comment: '图片宽度'
    },
    height: {
      type: INTEGER,
      comment: '图片高度'
    }
  }, {
    freezeTabName: true,
    tableName: 'picture',
    timestamps: false
  });

  Picture.list = async function(options) {
    const rs = await this.findAndCountAll({
      where: {
        albumId: {
          $eq: options.id
        }
      }
    });
    return {
      code: 200,
      data: rs.rows || [],
    };
  };

  return Picture;
};