class ImagesController < ApplicationController
  def index
    render :json => Image.all
  end

  def destroy
    image = Image.find(params[:id])
    image.destroy
    render :json => true
  end
end
