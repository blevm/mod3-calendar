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
