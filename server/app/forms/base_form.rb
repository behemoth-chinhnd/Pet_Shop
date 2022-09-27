class BaseForm < ActiveType::Object
  MAX_INTEGER = ((1 << 32) / 2) - 1
  MAX_BIGINT = ((1 << 64) / 2) - 1
  MAX_STRING = 255
  MAX_TEXT = 65_535
  MAX_FREE_TEXT = 16.megabytes - 1
  attr_accessor :model

  delegate :persisted, to: :model

  def assign_model(model, params = {})
    @model = model
    @params = params.with_indifferent_access

    attributes.each do |k, _|
      self[k] = @params.key?(k) ? @params[k] : model.try(k)
    end

    self
  end

  def error_messages
    errors.messages.each_with_object({}) do |(k, messages), h|
      key = k.to_s.split(".").last.to_sym

      messages.each do |message|
        h[k.to_sym] = h[k.to_sym].to_a + [self.class.human_attribute_name(key) + message]
      end
    end
  end
end
