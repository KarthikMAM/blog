# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

99.times do |n|
  name = Faker::Name.name
  github = "example-#{n + 1}"
  desc = Faker::Lorem.sentence(5)
  content = '<p>' + Faker::Lorem.paragraphs(5).join('</p>  <p>') + '</p>'

  Project.create!(
    name:    name,
    github:  github,
    desc:    desc,
    content: content
  )

  BlogPost.create!(
    title:   name,
    desc:    desc,
    content: content
  )
end
