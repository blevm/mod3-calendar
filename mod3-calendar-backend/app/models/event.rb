class Event < ApplicationRecord
  belongs_to :user
  belongs_to :tag
  belongs_to :day
end
