module Users
  class UserListSerializer < ActiveModel::Serializer
    attributes :id,
               :email,
               :name,
               :phone,
               :user_type,
               :birthday,
               :avatar_url,
               :sex_id
  end
end
