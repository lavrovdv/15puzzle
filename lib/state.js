function State(puzzle, parrent){
    this.puzzle = puzzle;
    this.parent_state = parrent;
    this.hash = hash(puzzle);
    this.G = this.set_G();
    this.H = this.set_H();
    this.F = this.G + this.H;
}

State.prototype.set_G = function(){
    var G = 0;
    var parent = this.parent_state;
    while(parent){
        G++;
        parent = parent.parent_state;
    }
    this.G = G;
    return this.G;
};

State.prototype.set_H = function(){
    this.H = manhattan_distance(this.puzzle) + liner_conflict(this.puzzle) + last_move(this.puzzle);
    return this.H;
};

State.prototype.get_solution = function(){
    var solution = [this.puzzle];
    var parent = this.parent_state;
    while(parent){
        solution.push(parent.puzzle);
        parent = parent.parent_state;
    }
    return solution.reverse();
};

State.prototype.get_neighbors = function(){
    var p_st = this.puzzle;
    var SIZE = 4;
    var neighbors_state = [];
    for (var i = 0; i < p_st.length; i++) {
        if(p_st[i] == 0){
            var line = get_line(i);
            var position = get_position(i);
            var n = [[line-1, position],[line, position+1],[line+1,position],[line,position-1]];

            for (var j = 0; j < n.length; j++) {
                if(n[j][0] > 0 && n[j][1] > 0 && n[j][0] <= SIZE && n[j][1] <= SIZE){
                    var neighbor_index = get_index(n[j][0] ,n[j][1]);
                    var zero_index = i;
                    var neighbor_value = p_st[neighbor_index];
                    var neighbor_puzzle = p_st.slice(0);
                    neighbor_puzzle[neighbor_index] = 0;
                    neighbor_puzzle[zero_index] = neighbor_value;
                    neighbors_state.push(new State(neighbor_puzzle, this));
                }
            }
        }
    }

    return neighbors_state;
};