class Api::V1::TagsController < ApplicationController

  def index
    tags = Tag.all
    render json: tags
  end

  def create
    tag = Tag.create(tag_params)
    render json: tag
  end

  private
  def tag_params
    params.permit(:name, :class_name)
  end

end
