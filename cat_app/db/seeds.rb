# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

facts = Fact.create([{info: "some text", user: "Heidi Powers"},
                      {info: "some more text", user: "Celeste G"}])

images = Image.create([{url: "http://24.media.tumblr.com/tumblr_lm8g7zDqqY1qabm53o1_500.jpg", user: "Person1"},
                      {url: "http://28.media.tumblr.com/tumblr_m2zw6mVVWK1rtuomto1_500.jpg", user: "Person2"}])
