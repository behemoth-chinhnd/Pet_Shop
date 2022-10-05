require "uuidtools"

module RandomNumberGeneratorConcern
  extend ActiveSupport::Concern

  included do
    before_create :generate_random_number
  end

  def generate_random_number
    number = UUIDTools::UUID.random_create.to_s.split("-").last

    self.number = if self.class.exists?(number:)
                    generate_random_number
                  else
                    number
                  end
  end
end
