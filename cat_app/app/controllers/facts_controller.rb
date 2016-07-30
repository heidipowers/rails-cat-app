class FactsController < ApplicationController
  def index
      render :json => Fact.all
  end

  def destroy
    fact = Fact.find(params[:id])
    fact.destroy
    render :json => true
  end

end
