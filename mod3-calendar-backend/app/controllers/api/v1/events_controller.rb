class Api::V1::EventsController < ApplicationController

  def index
    # current_user = User.first
    # events = current_user.events
    events = Event.all.sort { |x, y| (x.time || nil) <=> (y.time || nil)}
    render json: events
  end

  def create
    event = Event.create(event_params)
    render json: event
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
    render json: event
  end

  private
  def event_params
    params.permit(:title, :description, :time, :user_id, :tag_id)
  end


end
