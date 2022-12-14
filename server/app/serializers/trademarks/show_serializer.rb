module Trademarks
  class ShowSerializer < ActiveModel::Serializer
    attributes :id,
               :name,
               :description,
               :image_url,
               :created_at,
               :updated_at

    belongs_to :species
    belongs_to :category

    class SpeciesSerializer < ActiveModel::Serializer
      attributes :id, :name
    end

    class CategorySerializer < ActiveModel::Serializer
      attributes :id, :name
    end
  end
end
