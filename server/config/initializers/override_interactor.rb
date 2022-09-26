module Interactor
  module Organizer
    module InstanceMethods
      def call
        ActiveRecord::Base.transaction do
          self.class.organized.each do |interactor|
            interactor.call!(context)
          end
        end
      end
    end
  end
end

module Interactor
  class Context < OpenStruct
    def fail(context = {})
      context.each { |key, value| self[key.to_sym] = value }
      @failure = true
    end
  end
end
