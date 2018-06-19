# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(username: 'mb', display_name: 'Michelle')
u2 = User.create(username: 'mw', display_name: 'Mendy')

tag1 = Tag.create(name: 'Fun', class_name: "alert alert-info")
tag2 = Tag.create(name: 'Birthdays', class_name: "alert alert-warning")
tag3 = Tag.create(name: 'School', class_name: "alert alert-success")

Event.create(title: 'Code Challenge', description: 'This won\'t be fun', time: '2018-06-15 2:21PM', user: u1, tag: tag3)
Event.create(title: 'MVP of Project Due', description: 'This will be fun', time: '2018-06-20 3:00PM', user: u1, tag: tag3)
Event.create(title: 'The Weekend!', description: 'Take a break!', time: '2018-06-22 6:00PM', user: u1, tag: tag1)
Event.create(title: 'Ryan\'s Birthday', description: 'We have to get him a cake!', time: '2018-06-27 4:00PM', user: u1, tag: tag2)
Event.create(title: 'Start of Mod 4', description: 'Ready for React!', time: '2018-06-25 9:00PM', user: u1, tag: tag3)
Event.create(title: 'Frank Lloyd Wright\'s Birthday', description: 'You know, the guy with the coolest buildings', time: '2018-06-08 12:00AM', user: u1, tag: tag2)
