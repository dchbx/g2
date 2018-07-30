class JwtRenewer
  def self.create_exp_revocation(payload, user)
    BlacklistedToken.create_exp_revocation(user.id.to_s, payload['jti'],payload['exp'])
    BlacklistedToken.destroy_old_tokens(Time.now - 1.minute)
  end
end