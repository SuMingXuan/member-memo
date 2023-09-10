class Product < ApplicationRecord
  enum status: { draft: 0, publish: 1 }

  def as_json_list
    as_json only: %i[name count price id]
  end
end
