# :nocov:
# rubocop:disable Lint/UselessAssignment
class Current < ActiveSupport::CurrentAttributes
  attribute :user

  resets { user = nil }
end
# rubocop:enable Lint/UselessAssignment
# :nocov:
