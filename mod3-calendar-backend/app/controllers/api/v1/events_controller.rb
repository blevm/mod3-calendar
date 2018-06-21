class Api::V1::EventsController < ApplicationController

  def index
    events = Event.all
    render json: events
    # current_user = User.first
    # events = current_user.events
    # events = Event.all.sort { |x, y| (x.time || nil) <=> (y.time || nil)}
    # user = User.find_by(username:  params[:user][:username])
    # if user
    #   events = user.events
    #   render json: events
    # else
    #   user = User.create(username:  params[:user][:username])
    #   events = user.events
    #   render json: events
    # end
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
