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


function is_equal(array1, array2){
    for (var i = 0; i < array1.length; i++) {
        if(array1[i] != array2[i]){return false;}
    }
    return true
}

function hash(array){
    var hash = 0;
    if (array.length == 0) return hash;
    for (var i = 0; i < array.length; i++) {
        hash = ((hash<<5)-hash) + array[i];
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function test_st(){
//    var a = "1234567891011121314150";
//    var b = "2134567891011121314150";
    var t = {};
//    var start = new Date().getTime();
    for (var i = 0; i < 10000; i++) {
        t[i] = i;
//        console.log(c);
    }
    return t;

//    var end = new Date().getTime();
//    console.log("time = " + (end - start)/1000);
}

function isArray(x) {
    return ((typeof x == "object") && (x.constructor == Array));
}

function manhattan_distance(puzzle_state){
    var manhattan = 0;
    var t_st = get_terminate_state();
    for (var i = 0; i < puzzle_state.length; i++) {
        if (puzzle_state[i] != t_st[i] && puzzle_state[i] != 0){
            manhattan += Math.abs(get_line(i) - get_line(puzzle_state[i]-1)) + Math.abs(get_position(i) - get_position(puzzle_state[i]-1));
        }
    }
    return manhattan;
}

function liner_conflict(puzzle_state){
    //[1,4,3,2,5,6,12,8,9,10,11,7,13,14,15,0] - проверка по строкам = 6
    //[1,2,3,12,5,6,7,8,9,10,11,4,13,14,15,0] - проверка по строкам = 4
    var liner_conflict = 0;
    var t_st = get_terminate_state();
    for (var i = 0; i < puzzle_state.length; i++) {
        if(puzzle_state[i] != 0){
            var current_line = get_line(i);
            var current_position = get_position(i);
            var term_line = get_line(puzzle_state[i]-1);
            var term_position = get_position(puzzle_state[i]-1);

            if (current_line == term_line){
                for (var j = current_position; j < 4; j++) {
                    var compare_line = get_line(puzzle_state[i+1]-1);
                    if(compare_line == current_line && puzzle_state[i] > puzzle_state[i+1]){
                        liner_conflict += 2;
                    }
                }
            }

            if(current_position == term_position){
                for (var j = current_line + 1; j < 4; j++) {
                    var compare_position = get_position(puzzle_state[get_index(j,current_position)]-1);
                    if(compare_position == current_position && puzzle_state[i] > puzzle_state[get_index(j,current_position)]){
                        liner_conflict += 2;
                    }
                }
            }
        }
    }

    return liner_conflict;
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

function is_has_solution(puzzle_state){
    var e;      // Номер ряда пустой клетки
    var N = 0; // колличество инверсий

    for (var i = 0; i < puzzle_state.length; i++) {
        if (puzzle_state[i] == 0) { e = get_line(i); }
        for (var j = i; j < puzzle_state.length; j++) {
            if(puzzle_state[i] > puzzle_state[j] && puzzle_state[j] != 0){ N++; }
        }
    }
    return ((e + N) % 2 == 0)
}

function get_terminate_state(){
    return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]
}

function get_line(index){
    return 1 + Math.floor((index / 4));
}

function get_position(index){
    return  1 + (index % 4);
}

function get_index(line, position){
    return ((line - 1) * 4 + position) - 1;
}

function is_valid(puzzle_state){
    if(puzzle_state.length % 4 != 0 ){
        console.log("Data not valid");
        return false
    }

    for (var i = 0; i < puzzle_state.length; i++) {
        if(puzzle_state.indexOf(i) == -1) {
            console.log("Data not valid");
            return false;
        }
    }
    return true
}