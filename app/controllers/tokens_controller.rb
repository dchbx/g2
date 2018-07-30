class TokensController < ApplicationController
  respond_to :json

  def refresh
    token = Warden::JWTAuth::HeaderParser.from_env(request.env)
    token_payload = Warden::JWTAuth::TokenDecoder.new.call(token)
    JwtRenewer.create_exp_revocation(token_payload,current_user)
    head :ok
  end
end