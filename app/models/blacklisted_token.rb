class BlacklistedToken
  include ::Mongoid::Document
  include ::Mongoid::Timestamps

  field :sub, type: String
  field :jti, type: String
  field :exp, type: Time
  field :revoked_at, type: Time

  index({:sub => 1, :exp => 1, :revoked_at => 1})
  index({:jti => 1, :sub => 1, :exp => 1, :revoked_at => 1})
  index({:exp => 1})

  def self.create_exp_revocation(sub, jti, exp)
    self.create!(
      sub: sub,
      jti: jti,
      exp: exp,
      revoked_at: exp
    )
  end

  def self.revoke_all(sub, revocation_time)
    self.where({
      sub: sub,
      exp: {"$gt" => revocation_time},
      revoked_at: {"$gte" => revocation_time}
    }).update_all({
      "$set" => {"revoked_at" => revocation_time}
    })
  end

  def self.token_revoked?(sub, jti, revocation_time)
    self.where({
      sub: sub,
      jti: jti,
      exp: {"$gt" => revocation_time},
      revoked_at: {"$lte" => revocation_time}
    }).any?
  end

  def self.destroy_old_tokens(before_time)
    self.where({
      exp: {"$lt" => before_time}
    }).delete
  end
end