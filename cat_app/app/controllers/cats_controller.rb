class CatsController < ApplicationController
  def index
    getCats = {}
    getCats[:pic] = HTTParty.get("http://thecatapi.com/api/images/get?format=xml&results_per_page=1")
    getCats[:quote] = JSON.parse(HTTParty.get("http://catfacts-api.appspot.com/api/facts?number=1"))

    #puts params[:number]
    #JSON.parse(getCats[:quote])
    render json: getCats

    # url = "http://catfacts-api.appspot.com/api/facts?number= "
    # response = HTTParty.get(url)
    # parsed_body = JSON.parse(response.body)
    # render json: parsed_body
    #url = "http://thecatapi.com/api/images/get?format=xml&results_per_page=20"
    #response = HTTParty.get("http://thecatapi.com/api/images/get?format=xml&results_per_page=5")
    #render json: response
  end
end

