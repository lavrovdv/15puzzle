Реализация игры пятнашки
=========================
Автор: Лавров Дмитрий, 2012


Описание
------------

Для того чтобы задать стартовое состояние поля нужно в файле 15puzzle.html в строке 17 передать в
функцию start() матрицу 4x4 (или вызвать функцию start() в консоли), дале нажать кнопку "Решить" для автоматического
решения. Для решение пятнашек, использовался алгоритм A*.


Файлы
-----
/css
    - style.css - файл стилей
/lib
    - A.js - реализация алгоритма A*
    - game.js - реализация логики пользовательского интерфейса.
    - jquery-1.8.0.min.js
    - mustache.js - шаблонизатор
    - state.js - обект для хрониения состояний игрового поля.
    - util.js - дополнительные функции.

15puzzle.html - игра
README.TXT - справка