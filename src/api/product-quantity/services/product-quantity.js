'use strict';

/**
 * product-quantity service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-quantity.product-quantity');
