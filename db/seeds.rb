# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
user1 = User.create(username: 'testing', password: 'testing')



Level.destroy_all
level1 = Level.create(level_difficulty: 'Easy')
level2 = Level.create(level_difficulty: 'Medium')
level3 = Level.create(level_difficulty: 'Hard')
level4 = Level.create(level_difficulty: 'Expert')

Score.destroy_all
score1 = Score.create(points: 0, user: User.first, level: level1)