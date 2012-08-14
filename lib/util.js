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

function manhattan_distance(puzzle_state){
    var p_st = puzzle_state.flatten();
    var manhattan = 0;
    var t_st = get_terminate_state(p_st);
    for (var i = 0; i < p_st.length; i++) {
        if (p_st[i] != t_st[i] && p_st[i] != 0){
            manhattan += Math.abs(get_line(i) - get_line(p_st[i]-1)) + Math.abs(get_position(i) - get_position(p_st[i]-1));
        }
    }
//    console.log("manhattan_distance = " + manhattan);
    return manhattan;
}

/**
 * todo: можно не создавать массив каждый раз.
 * @param puzzle_state
 * @return {Array}
 */
function get_terminate_state(puzzle_state){
    var p_st = puzzle_state.flatten();
    var t_st = [];
    for (var i = 1; i < p_st.length; i++) { t_st.push(i); }
    t_st.push(0);
    return t_st;
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function neighbors_indexes(puzzle){
    var SIZE = 4;
    var neighbors = [];
    for (var i = 0; i < puzzle.length; i++) {
        if(puzzle[i] == 0){
            var line = get_line(i);
            var position = get_position(i);
            var n = [[line-1, position],[line, position+1],[line+1,position],[line,position-1]];

            for (var j = 0; j < n.length; j++) {
                if(n[j][0] > 0 && n[j][1] > 0 && n[j][0] <= SIZE && n[j][1] <= SIZE){
                    neighbors.push(get_index(n[j][0], n[j][1]));
                }
            }
        }
    }
    return neighbors;
}

function neighbors_values(puzzle){
    var indexes = neighbors_indexes(puzzle);
    var values = [];
    for (var i = 0; i < indexes.length; i++) {
        values.push(puzzle[indexes[i]]);
    }
    return values;
}