# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(username: 'mb', display_name: 'Michelle')
u2 = User.create(username: 'mw', display_name: 'Mendy')

tag1 = Tag.create(name: 'Fun')
tag2 = Tag.create(name: 'Birthdays')
tag3 = Tag.create(name: 'School')

event1 = Event.create(title: 'Code Challenge', description: 'This won\'t be fun', time: '2018-06-18 2:21PM', user: u1, tag: tag3)
event2 = Event.create(title: 'Project Due', description: 'This will be fun', time: '2018-06-20 3:00PM', user: u1, tag: tag3)
event3 = Event.create(title: 'The Weekend', description: 'Take a break!', time: '2018-06-22 6:00PM', user: u1, tag: tag1)


FlatironEvent.create(title: 'Mod 1 & 2 Mixer Lunch', description: 'Description Here', time: '2018-06-18 12:15PM', location: "Kay")
FlatironEvent.create(title: 'Mod 1 & Mod 4 Mixer Lunch', description: 'Where are we heading in Fintech and Blockchain? We’ll hear from 3 panelits, CEO of    Titan Crypto, CEO of BlockFi and Dev at CryptoNYC. ', time: '2018-06-19 6:00PM', location: "Kay")
FlatironEvent.create(title: 'Flatiron Students Present: Technical Talks', description: 'Three budding developer pairs from our web development program will present for 5-10 minutes on a technical topic of their choice.', time: '2018-06-19 6:15PM', location: "Turing")
FlatironEvent.create(title: 'Career Coach AMA', description: 'Join Jessica Lava, Career Coach, for an AMA. Connect via the zoom link. ', time: '2018-06-21 11:00AM', location: "Borg")
FlatironEvent.create(title: 'Final Projects Science Fair – web-031218', description: 'Come mingle with great people, and see what this semester’s web-web-031218 students have been working on – including a detailed look at some incredible apps they’ve built as their final projects! Drinks and snacks will be provided!', time: '2018-06-21 4:30PM', location: "Kay")
