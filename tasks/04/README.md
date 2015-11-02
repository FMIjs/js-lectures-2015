# ES2015 Задачи

## Async Execution and Promises

* Направете функция която изчаква 1000ms след което записва във файл произволен стринг. След това изчаква още 1000ms и записва в друг файл отново произволен стринг. След още 1000ms изчакване отваря първия файл, отново изчаква 1000ms, отваря втория файл, изчаква отново 1000ms и накрая записва в трети файл конкатениран резултатa от четенето на двата предходни файла. 
Използвайте функции [writeFile](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) и [readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback) и _не използвайте_ Promises.


* Направете предната задача използвайки Promises

