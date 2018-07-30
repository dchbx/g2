class TokensController < ApplicationController
  respond_to :json

  def refresh
    token = Warden::JwtAuth::HeaderParser.from_env(request.env)
    head :ok
  end
end