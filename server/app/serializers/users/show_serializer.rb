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
               :created_at,
               :updated_at,
               :deleted_at
  end
end
