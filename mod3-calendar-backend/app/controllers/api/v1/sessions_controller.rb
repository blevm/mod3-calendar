class SessionsController < ApplicationController

    def create
      @user = User.find_by(username: params[:username])
      if @user
        session[:user_id] = @user.id
      end
    end
  
    def destroy
      session.delete(:user_id)
    end

  end