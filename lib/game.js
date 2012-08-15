$(function(){
    // [5, 2, 3, 1, 9, 10, 6, 4, 13, 0, 7, 8, 14, 15, 11, 12]
    //  [5,1,2,3,4,0,6,7,8,9,10,11,12,13,14,15]
    start_state = [5,1,2,3,4,0,6,7,9,8,10,11,13,12,14,15];//[2,3,1,4,5,6,7,8,9,10,11,12,13,14,15,0];//[1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,10];
//    start_state = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    start();
});

function start(){
    step_count = 0;
    start_state = start_state.flatten();

    if(!is_valid(start_state)){
        print_message('Неверные данные.',true);
        return;
    }
    if(!is_has_solution(start_state)){
        print_message('Состояние не имеет решения.',true);
    }

    print_state(start_state);
    $("#automatic_game").click(function(){automatic_game();});
    $("#new_game").click(function(){new_game();});
    $(".sell").click(function(){step($(this))});
}

function step(element){
    print_message('');
    var clicked = element.attr('v');
    var clicked_index = start_state.indexOf(parseInt(clicked));
    var zero_index = start_state.indexOf(0);
    var n_indexes = neighbors_indexes(start_state);

    if(n_indexes.indexOf(clicked_index) > -1){
        start_state[zero_index] = start_state[clicked_index];
        start_state[clicked_index] = 0;
        step_count++;
        $("#score_value").html(step_count);
        print_state(start_state);

        if(is_equal(start_state,get_terminate_state())){
            print_message('Поздравляем вы собрали пятнашки.');
        }else{
            $(".sell").click(function(){step($(this))});
        }

    }else{
        print_message('Так ходить нельзя.',true);
    }
}

function new_game(){
    start_state = generate_field();
    step_count = 0;
    print_state(start_state);
    $("#score_value").html(step_count);
    $(".sell").click(function(){step($(this))});
    print_message('');
}

function automatic_game(){
    $("#automatic_game").unbind('click');
    var state = start_state;
    print_state(state);
    print_message('Поиск решения...');
    var solutions = A(state);
    print_message('');
    print_states(solutions, 0);
}

function print_message(text, error){
    if (error){
        $("#messages").html('<span class="error">' + text + '</span>');
    }else{
        $("#messages").html(text);
    }
}

function print_state(state){
    var template_puzzle_field = "<table id='field' border='1'>{{#.}}<tr>{{#.}}<td><div class='sell' v='{{.}}'>{{.}}</div></td>{{/.}}</tr>{{/.}}</table>";
    var SIZE = 4;
    var t = [];
    for (var i = 0; i < SIZE; i++) {t.push(state.slice(0).splice(i*4, 4)); }
    render("#content", template_puzzle_field, t);
}

function print_states(solutions, index){
    $("#score_value").html(index);
    var speed = 800;
    print_state(solutions[index]);

    // Запускаем функцию еще раз пока не отрисуеим последнее состояние.
    if(index < solutions.length - 1) {
        var self_func = function(){print_states(solutions, index + 1)};
        setTimeout(self_func, speed);
    }else{
        print_message('Игра закончена.');
    }
}

function render(container_id, template_string, params){
//    $(container_id).html(Mustache.render(t, params));
    $(container_id).html('');
    $(container_id).append(Mustache.render(template_string, params));
}

function generate_field(){
//    var t = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
//    var t = [5,1,2,3,4,0,6,7,9,8,10,11,13,12,14,15];

    var solutions = A([5,1,2,3,4,0,6,7,9,8,10,11,13,12,14,15]);

    return solutions[random(0, solutions.length-1)];

//    var result = [];
//    while (t.length > 0) {
//        var index = random(0, t.length-1);
//        result.push(t[index]);
//        t.splice(index, 1);
//    }
//
//
//    var i = 0;
//    while(!is_has_solution(result)){
//        var temp = result[i];
//        result[i] = result[i+1];
//        result[i+1] = temp;
//        i++;
//    }
//
//    return result;
}