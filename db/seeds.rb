# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

products = [
  {
    name: '5 元 1 张',
    count: 1,
    status: :publish,
    price: 5
  },
  {
    name: '10 元 3 张',
    count: 3,
    status: :publish,
    price: 10
  }
]

products.each do |p|
  product = Product.find_or_initialize_by(count: p[:count], price: p[:price])
  next unless product.new_record?

  product.name = p[:name]
  product.status = p[:status]
  product.save
end
