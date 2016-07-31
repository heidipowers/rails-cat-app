class FactsController < ApplicationController

  def index
      render :json => Fact.all
  end

  def create
     fact = {
       user: params[:user],
       info: params[:info]
     }
     Fact.create fact
     render :json => Fact.last
   end

   def update
    @fact = Fact.find(params[:id])
    @fact.update({
                      #:user => params[:user],
                      :info =>  params[:info]
                    })
    render :json => @fact
  end

  def destroy
    fact = Fact.find(params[:id])
    fact.destroy
    render :json => true
  end

end


