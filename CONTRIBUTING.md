- Разработка верстки ведется по методологии БЭМ
- Блоки двух типов - (а) модульные и (б) сеточные
- Блоки уровня сетки - прописаны в layoute'е
- Блоки уровня модулей - прописаны в директории blocks
- Директория конкретного блока называется в точности по имени блока
- Элементы - вынесены в отдельные файлы по имени элемента в папке блока
- Медиа - отдельные папки для каждой рейперной точки внутри каждой папки блока
- Медиа для блока / элемента импортируется из соответствующей папки медиа в соответствующий файл (импорт разного уровня медиа в одном файле - в верхнем файле)
- Транслит в названиях не использовать - только полное английсское слово
- Внешние размеры (width/margin) прописываются только в на уровне родителя/layout - дабы блок можно было поместить в любой сектор и он занял все пространство сектора..
- Верстка должна проходить валидацию и не иметь грубых ошибок.