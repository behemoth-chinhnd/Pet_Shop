module Addresses
  class ListSerializer < ActiveModel::Serializer
    attributes :id,
               :city,
               :county,
               :street,
               :apartment_number,
               :description,
               :is_default
  end
end
