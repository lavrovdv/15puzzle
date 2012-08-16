$(function(){
    // [5, 2, 3, 1, 9, 10, 6, 4, 13, 0, 7, 8, 14, 15, 11, 12]
    //  [5,1,2,3,4,0,6,7,8,9,10,11,12,13,14,15]
//    start_state = [
//        [5,1,2,3],
//        [4,0,6,7],
//        [9,8,10,11],
//        [13,12,14,15]];
   // [3,7,11,15,2,13,9,4,5,14,6,12,8,1,10,0]

    //[2,3,1,4,5,6,7,8,9,10,11,12,13,14,15,0];//[1,2,3,4,5,6,7,8,9,0,11,12,13,14,15,10];
//    start_state = [5,1,2,3,4,0,6,7,8,9,10,11,12,13,14,15];
    start([5,1,2,3,4,0,6,7,8,9,10,11,12,13,14,15]);
//    $(".sell").click(function(){step($(this))});
});

function bind_sell(){
    $(".sell").unbind('click');
    $(".sell").click(function(){step($(this))});
}

function start(start_state){
    STEP_COUNT = 0;
    new_states = A([5,1,2,3,4,0,6,7,9,8,10,11,13,12,14,15]);
    timer = null;

    STATE = start_state || generate_field();
    STATE = STATE.flatten();

    $("#new_game").click(function(){new_game();});

    if(!is_valid(STATE)){
        print_message('Неверные данные.',true);
        return;
    }

    if(!is_has_solution(STATE)){
        print_message('Состояние не имеет решения.',true);
        return
    }
    $("#automatic_game").click(function(){automatic_game();});

    print_state(STATE);
//    $(".sell").click(function(){step($(this))});
}

function step(element){
    print_message('');
    var clicked = element.attr('v');
    var clicked_index = STATE.indexOf(parseInt(clicked));
    var zero_index = STATE.indexOf(0);
    var n_indexes = neighbors_indexes(STATE);

    if(n_indexes.indexOf(clicked_index) > -1){
        STATE[zero_index] = STATE[clicked_index];
        STATE[clicked_index] = 0;
        STEP_COUNT++;
        $("#score_value").html(STEP_COUNT);
        print_state(STATE);

        if(is_equal(STATE, get_terminate_state())){
            print_message('Поздравляем вы выйграли.');
            $(".sell").unbind('click');
//        }else{
//            $(".sell").click(function(){step($(this))});
        }

    }else{
        if(clicked != '0') print_message('Так ходить нельзя.',true);
    }
}

function new_game(){
    STATE = generate_field();
    STEP_COUNT = 0;
    if (timer) {clearTimeout(timer)}

    print_state(STATE);
    $("#score_value").html(STEP_COUNT);
//    $(".sell").click(function(){step($(this))});
    $("#automatic_game").unbind('click');
    $("#automatic_game").click(function(){automatic_game();});
    print_message('');
}

function automatic_game(){
    $("#automatic_game").unbind('click');
    print_state(STATE);
    print_message('Поиск решения...');
//    var solution = A(STATE);
    setTimeout(function(){print_states(A(STATE), 0)}, 100);
//    print_message('');
//    print_states(solution, 0);
}

function print_message(text, error){
    if (error){
        $("#messages").html('<span class="error">' + text + '</span>');
    }else{
        $("#messages").html(text);
    }
}

function print_state(state){
    var template_puzzle_field = "<table id='field' border='1'>{{#.}}<tr>{{#.}}<td><div class='sell' v='{{.}}'><span>{{.}}</span></div></td>{{/.}}</tr>{{/.}}</table>";
    var t = [];
    for (var i = 0; i < 4; i++) {t.push(state.slice(0).splice(i*4, 4)); }
    render("#content", template_puzzle_field, t);
    bind_sell();
}

function print_states(solutions, index){
    var speed = 800;

    $("#score_value").html(index);
    print_message('');
    print_state(solutions[index]);

    // Запускаем функцию еще раз пока не отрисуеим последнее состояние.
    if(index < solutions.length - 1) {
        var self_func = function(){print_states(solutions, index + 1)};
        timer = setTimeout(self_func, speed);
    }else{
        print_message('Игра закончена.');
    }
}

function render(container_id, template_string, params){
    $(container_id).html('');
    $(container_id).append(Mustache.render(template_string, params));
}

function generate_field(){
    return new_states[random(0, new_states.length-2)];
}