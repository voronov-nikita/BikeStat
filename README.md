# BikeStat


![mosh-image](https://predprof.olimpiada.ru/images/logo-predporf.svg)


###### проект московской предпроффессиональной олимпиады

<br>

## Содержание

1. [Разработчики проекта](README.md#разработчики)
2. [О проекте](README.md#о-проекте)
3. [Описание кода](README.md#описание-кода)
4. [Ссылки](README.md#ссылки)


## Разработчики

1. [Воронов Никита](https://github.com/voronov-nikita)
2. [Мандрыка Арина](https://github.com/mandrykarina)
3. [Коротков Иван](https://github.com/lolllp3d)
4. [Комаров Матвей](https://github.com/matvey754)
5. [Назарова Анастасия](https://github.com/Anastasia67890)


## О проекте

В настоящее время велосипедный спорт становится все более
популярным видом активного отдыха, а велосипед входит в нашу жизнь
как удобное и незаменимое средство передвижения, показавшее свою
эффективность как в городской среде, так и за её пределами. Повышенный
интерес к использованию этого вида транспорта мотивирует инженеров,
занятых проектированием и разработкой решений в области современных
информационных технологий, все больше и больше задумываться над
вопросом усовершенствования информационного обеспечения,
способного сделать процесс передвижения на велосипеде более удобным и
эффективным.

**Наше приложение может быть полезно при составлении маршрутов
передвижения, планировании поездок, составлении графика физической
активности и рекомендаций с учётом индивидуальных особенностей и
целей велосипедиста.**

Целью разработки программного комплекса является повышение
эффективности тренировочного процесса пользователя.


## Описание кода

### Серверная часть
В репозитории представлено несколько папок с файлами разного назначения. По сути весь 
продукт разбит на несколько основных частей: само приложение для пользователей, исходный код для сервера, документацию к проекту, файл лицензирования исходного кода, и т.п

Файлы сервера описаны в папке [server](/server/), весь код логики сервера описан на 
языке программирования python. На сервере происходят основные вычисления, сохранение базы данных пользователей и их данных. Для запуска сервера необхрдимо иметь при себе интерпритатор python версии, не менее python3.9. Перед запуском компонентов, установите все необходимые модули на свое устройство с помощью команды

> pip3 install -r requirements.txt

После чего все модули будут догружены в вашу среду.

### Клиентская часть (приложение)

Приложение написано с использованием framework [React Native](https://reactnative.dev/) в формате WEB приложения


### Тесты

Для тестирование функций и отказоустойчивости приложения и сервера были написаны unit тесты. Все тесты описаны в папке [tests](/tests/)

Каждый тест проходит автоматическую проверку и сопровождается ответом в виде "THE TEST IS PASSED" или "THE TEST FAILED" 


## Лицензии

Исходный код распространяется под лицензией открытого исходного кода - [MIT](https://ru.wikipedia.org/wiki/Лицензия_MIT).
[Файл лицензии](/LICENSE) расположен в репозитории.


## Видео работы 

-- None --

## Ссылки

1. [python.org](https://python.org)
2. [pypi.org](https://pypi.org/)
3. [reactnative.dev](https://reactnative.dev/)
4. [expo.dev](https://expo.dev/)


<br><br>

###### 07.01.2024 - last global change in repo.