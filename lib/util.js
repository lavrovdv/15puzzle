/**
 * Created with JetBrains RubyMine.
 * User: I
 * Date: 12.08.12
 * Time: 9:08
 * To change this template use File | Settings | File Templates.
 */

/**
 * @return {Array} [1,2,3,[4,5,[6,7,8]]] => [1,2,3,4,5,6,7,8]
 */
Array.prototype.flatten = function () {
    var result = [];
    function iter(array) {
        for (var i = 0; i < array.length; i++) {
            if (isArray(array[i])) {
                iter(array[i]);
            } else {
                result.push(array[i]);
            }
        }
    }
    iter(this);
    return result;
};


function isArray(x) {
    return ((typeof x == "object") && (x.constructor == Array));
}