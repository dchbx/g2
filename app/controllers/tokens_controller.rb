class TokensController < ApplicationController
  respond_to :json

  def refresh
    head :ok
  end
end