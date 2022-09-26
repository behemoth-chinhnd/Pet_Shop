class Sex < ActiveHash::Base
  fields :id, :name

  create id: 1, name: "男性"
  create id: 2, name: "女性"

  class << self
    def select_options
      all.map(&:to_select_option)
    end
  end

  def to_select_option
    { text: name, value: id }
  end
end
