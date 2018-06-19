class Api::V1::FlatironEventsController < ApplicationController


    def index
        flatiron_events = FlatironEvent.all
        render json: flatiron_events
    end

end
  