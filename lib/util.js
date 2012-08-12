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

/**
 * Работает только для рятнашек
 * @param array1
 * @param array2
 * @return {Boolean}
 */
function is_equal(array1, array2){
    if ((!isArray(array1) || !isArray(array2)) && (array1.length != array2.length)){
        return false;
    }

    var a1 = array1.flatten();
    var a2 = array2.flatten();
    for (var i = 0; i < a1.length; i++) {
        if(a1[i] !== a2[i]){return false;}
    }
    return true
}

function isArray(x) {
    return ((typeof x == "object") && (x.constructor == Array));
}