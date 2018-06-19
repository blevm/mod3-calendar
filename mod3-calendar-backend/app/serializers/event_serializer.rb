class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :time

  belongs_to :user
  belongs_to :tag
end
