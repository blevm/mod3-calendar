class Api::V1::Users::EventsController < ApplicationController

    def index
      user = User.find(params[:user_id])
      events = user.events
      render json: events
    end
  
    # def create
    #   event = Event.create(event_params)
    #   render json: event
    # end
  
    # def destroy
    #   event = Event.find(params[:id])
    #   event.destroy
    #   render json: event
    # end
  
    # private
    # def event_params
    #   params.permit(:title, :description, :time, :user_id, :tag_id)
    # end
  
  
  end
  