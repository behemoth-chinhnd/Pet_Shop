module Users
  class ShowSerializer < ActiveModel::Serializer
    attributes :id,
               :email,
               :name,
               :user_type,
               :phone,
               :address,
               :point,
               :sex_id,
               :birthday,
               :avatar_url,
               :created_at,
               :updated_at,
               :deleted_at,
               :shipping_fee,
               :store_name
  end
end
