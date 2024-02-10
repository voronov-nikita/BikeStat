# BikeStat

![mosh-image](https://predprof.olimpiada.ru/images/logo-predporf.svg)

##### проект московской предпроффессиональной олимпиады

<br>

## Содержание

1. [Разработчики проекта](README.md#разработчики)
2. [О проекте](README.md#о-проекте)
3. [Описание кода](README.md#описание-кода)
4. [Видео работы приложения](README.md#видео-работы-приложения)
5. [Ссылки](README.md#ссылки)

## Разработчики

1. [Воронов Никита](https://github.com/voronov-nikita)

    Функционал приложения. Обеспечение стабильной связи между сервером и клиентом. Обучение и обеспечение связи с нейронной сетью. Обеспечение стабильного обмена данными и защита систем. Поднятие собственного сервера в домашних условиях.

2. [Мандрыка Арина](https://github.com/mandrykarina)

    Обеспечение визуальной части приложения. Составление DataSet файла. Съемка и обработка видео приложения.

3. [Коротков Иван](https://github.com/lolllp3d)

    Разработка дизайна приложения. Составление DataSet файла. Работа с документацией. Составление схем продукта.

4. [Комаров Матвей](https://github.com/matvey754)

    Серверная часть. Обеспечение хранения и обработки данных в реальном времени. Полная работа с базой данных.

5. [Назарова Анастасия](https://github.com/Anastasia67890)

    Разработка тестирующей системы. Тестирование функциональных особенностей и выявление проблем приложения.

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

Файлы сервера и backend части описаны в папке [server](/server/), весь код логики сервера описан на
языке программирования **python**. На сервере происходят основные вычисления, сохранение базы данных пользователей и их данных. Для запуска сервера необхрдимо иметь при себе интерпритатор python версии, не менее **_python3.9_**. Перед запуском компонентов, установите все необходимые модули на свое устройство с помощью команды

```bash
pip install -r requirements.txt
```

После чего все модули будут догружены в вашу среду. Файл [requirements.txt](./requirements.txt) располагается в корневом каталоге приложения.

<br>

Среди каталогов репозитория есть отдельный, называемый [AI](./AI/). В этом файле расположены основные файлы для равертывания собственной нейронной сети. При разработке нейросети, использовался язык программирования Python версии 3.11.6.

#### Запуск проекта

Перед началом работы, необходимо сделать так, чтобы пользователь имел связь с сервером и со своими данными соответственно. Для этого нужно запустить код сервера. В зависимости от разных моментов (выбор IDE для python, аппаратной архитекуры, версии python) запуск одного и того же кода на разных устройствах может выглядеть по разному. Вот пример того, как запустить проект:

```bash
python3 server.py
```

При этом в терминале должна выйти информация об IP адресе сервера и персональном порте удаленного подключения. Вот пример **нормального** вывода информации:

```bash
> python3 server.py

IP: 192.168.0.22
PORT: 8090

```

### Клиентская часть (приложение)

Приложение написано с использованием framework [React Native](https://reactnative.dev/) в формате WEB приложения. Для запуска приложение с файлами из репозитория, необходимо выполнить команду:

#### Запуск проекта

```bash
npm start
```

Или, если возникли ошибки

```bash
npx expo start -с
```

Причем предварительно необходимо установить все зависимости, хранящиеся в файле _packege.json_. Чтобы упростить себе задачу, можно выполнить команду:

```bash
nmp install
```

И все зависимости установятся автоматически. Таким образом можно запустить
проект без установки самого приложения.

### Тесты

Для тестирование функций и отказоустойчивости приложения и сервера были написаны unit тесты. Все тесты описаны в папке [tests](/tests/).

Каждый тест проходит автоматическую проверку и сопровождается ответом в виде **"THE TEST IS PASSED"** или **"THE TEST FAILED"**

Тесты разделены на два типа - тестирование базы данных и тестированрие отдельных функций обработки.

## Лицензии

Исходный код распространяется под лицензией открытого исходного кода - [MIT](https://ru.wikipedia.org/wiki/Лицензия_MIT).
[Файл лицензии](/LICENSE) расположен в репозитории.

## Видео работы приложения

-- None --

## Ссылки

1. [python.org](https://python.org)
2. [pypi.org](https://pypi.org/)
3. [reactnative.dev](https://reactnative.dev/)
4. [expo.dev](https://expo.dev/)

<br><br>

###### 04.02.2024 - last global change.
