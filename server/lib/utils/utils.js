import _ from 'lodash';

/**
 * 判断`array`是否是空数组
 * @param  {Object} array
 * @return {Boolean}
 */
export function isEmptyArray(array) {
    return !array || (Object.prototype.toString.call(array) === '[object Array]' && array.length === 0);
}

/**
 * 字符串转换为下划线连接
 * @param {String} str
 * @return {String}
 */
export function strToUnderscored(str) {
    const reg = /[(|)]|\//g;
    const underscored = /[\s\-]+/g;

    return String.trim(str).replace(reg, '').replace(underscored, '_').toLowerCase();
}

/**
 * 对象转换
 * @param {Object} obj
 * @return {Object}
 */
export function objFormat(obj) {
    return {
        id: _.get(obj, 'id'),
        handle: _.get(obj, 'handle'),
        declare_name_cn: _.get(obj, 'title', '默认标题'),
        declare_name_en: _.get(obj, 'product_name_en'),
        feature: _.get(obj, 'body_html'),
        character_ids: _.get(obj, 'character_ids'),
        special_remarks: _.get(obj, 'special_remarks', ''),
        buy_url: _.get(obj, 'buy_url'),
        category_id: _.get(obj, 'category_id'),
        image_path: _.get(obj, 'variant_image'),
        color: _.get(obj, 'color', ''),
        size: _.get(obj, 'size', ''),
        min_order: _.get(obj, 'min_order', 0),
        purchase_price: _.get(obj, 'purchase_price', 0),
        product_weight: _.get(obj, 'product_weight'),
        actual_weight: _.get(obj, 'actual_weight'),
        sales_weight: _.get(obj, 'sales_weight'),
        package_num: _.get(obj, 'package_num'),
        package_length: _.get(obj, 'package_length'),
        package_width: _.get(obj, 'package_width'),
        package_height: _.get(obj, 'package_height'),
        product_name_en: _.get(obj, 'product_name_en'),
        currency_code: _.get(obj, 'currency_code'),
        sale_price_base: _.get(obj, 'sale_price_base'),
        price_limit: _.get(obj, 'price_limit', []),
        display_alone: _.get(obj, 'display_alone'),
        delivery_average_day: _.get(obj, 'delivery_average_day'),
        is_edit_same_price: _.get(obj, 'is_edit_same_price'),
        custom_size_data: _.get(obj, 'custom_size_data', []),
        size_chart_template_id: _.get(obj, 'size_chart_template_id'),
        standard_size_chart_id: _.get(obj, 'standard_size_chart_id'),
        has_chinese: _.get(obj, 'has_chinese', 0),
        from_platform: _.get(obj, 'from_platform', ''),
        method: _.get(obj, 'method', ''),
        charger_spec: _.get(obj, 'charger_spec', 1),
        product_source: _.get(obj, 'product_source', 0),
        product_label: _.get(obj, 'product_label', ''),
        recommend_level: _.get(obj, 'recommend_level', 'o'),
        supplier_sn: _.get(obj, 'supplier_sn', ''),
    };
}

/**
 * 对象转换
 * @param {Object} obj
 * @return {Object}
 */
export function specFormat(obj) {
    return {
        id: _.get(obj, 'id'),
        color: _.get(obj, 'color', ''),
        size: _.get(obj, 'size', ''),
        product_name: _.get(obj, 'title'),
        min_order: _.get(obj, 'min_order', 0),
        image_path: _.get(obj, 'variant_image'),
        purchase_price: _.get(obj, 'purchase_price', 0),
        actual_weight: _.get(obj, 'actual_weight'),
        sales_weight: _.get(obj, 'sales_weight'),
        package_num: _.get(obj, 'package_num'),
        product_weight: _.get(obj, 'product_weight'),
        package_length: _.get(obj, 'package_length'),
        package_width: _.get(obj, 'package_width'),
        package_height: _.get(obj, 'package_height'),
        product_name_en: _.get(obj, 'product_name_en'),
        currency_code: _.get(obj, 'currency_code'),
        sale_price_base: _.get(obj, 'sale_price_base'),
        price_limit: _.get(obj, 'price_limit', []),
        display_alone: _.get(obj, 'display_alone'),
        delivery_average_day: _.get(obj, 'delivery_average_day'),
        is_edit_same_price: _.get(obj, 'is_edit_same_price'),
        custom_size_data: _.get(obj, 'custom_size_data', []),
        size_chart_template_id: _.get(obj, 'size_chart_template_id'),
        standard_size_chart_id: _.get(obj, 'standard_size_chart_id'),
    };
}
