module Users
  class UserListSerializer < ActiveModel::Serializer
    attributes :id,
               :email,
               :name,
               :phone,
               :user_type,
               :birthday,
               :sex_id
  end
end
