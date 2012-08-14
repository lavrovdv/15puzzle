$(function(){
//    console.log(is_has_solution([1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,10]));
//    console.log(is_valid([1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,10]));
//    manhattan_distance([1,7,2,3,5,6,4,8,9,10,11,12,13,14,15,0]);
//    get_neighbors(puzzle3);

    game();


});

function game(puzzle_state){
    var state = puzzle_state || [2,3,1,4,5,6,7,8,9,10,11,12,13,14,15,0]; //generate_field(); //[1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,10];
    var solutions = A(state);

    print_state(solutions, 0);
}

function print_state(solutions, index){

    var template_puzzle_field = " <table id='field' border='1'>{{#.}}<tr>{{#.}}<td><div class='sell' v='{{.}}'>{{.}}</div></td>{{/.}}</tr>{{/.}}</table>";
    var SIZE = 4;
    var speed = 800;
    var t = [];

    for (var i = 0; i < SIZE; i++) {t.push(solutions[index].slice(0).splice(i*4, 4)); }
    render("#content", template_puzzle_field, t);

    // Запускаем функцию еще раз пока не отрисуеи последнее состояние.
    if(index < solutions.length - 1) {
        var self_func = function(){print_state(solutions, index + 1)};
        setTimeout(self_func, speed);
    }
}

function render(container_id, template_string, params){
//    $(container_id).html(Mustache.render(t, params));
    $(container_id).html('');
    $(container_id).append(Mustache.render(template_string, params));
}

function generate_field(){
    var t = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
    var result = [];
    while (t.length > 0) {
        var index = random(0, t.length-1);
        result.push(t[index]);
        t.splice(index, 1);
    }

    var i = 0;
    while(!is_has_solution(result)){
        var temp = result[i];
        result[i] = result[i+1];
        result[i+1] = temp;
        i++;
    }

    return result;
}