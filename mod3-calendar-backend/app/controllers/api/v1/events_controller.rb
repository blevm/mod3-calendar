class Api::V1::EventsController < ApplicationController

  # def index
  #   events = Event.all
  #   render json: events
  # end

  def index
    current_user = User.first
    events = current_user.events
    render json: events
  end


end
