class ImagesController < ApplicationController
  def index
    render :json => Image.all
  end

  def create
     image = {
       user: params[:user],
       url: params[:url]
     }
     Image.create image
     render :json => Image.last
   end

  def destroy
    image = Image.find(params[:id])
    image.destroy
    render :json => true
  end
end
