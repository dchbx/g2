module RenewableJwtBlacklistStrategy
  def self.jwt_revoked?(payload, user)
    # Does something to check whether the JWT token is revoked for given user
    revocation_time = Time.now
    BlacklistedToken.token_revoked?(user.id.to_s, payload['jti'], revocation_time)
  end

  def self.revoke_jwt(payload, user)
    # Revoke this and all active tokens for the user
    revocation_time = Time.now
    BlacklistedToken.destroy_old_tokens(revocation_time - 1.minute)
    BlacklistedToken.revoke_all(user.id.to_s, revocation_time)
  end
end