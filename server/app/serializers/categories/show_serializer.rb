module Categories
  class ShowSerializer < ActiveModel::Serializer
    attributes :id,
               :name,
               :description,
               :image_url,
               :created_at,
               :updated_at
  end
end
