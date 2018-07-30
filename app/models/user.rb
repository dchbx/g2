class User
  include Mongoid::Document
  include Mongoid::Timestamps

  devise :database_authenticatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: ::RenewableJwtBlacklistStrategy

  field :email, type: String
  field :encrypted_password, type: String
  
  index({:email => 1})

  def self.primary_key
    :_id
  end

  def jwt_payload
    {
      email: email,
      jti: self.class.generate_jti
    }
  end

  def self.generate_jti
    SecureRandom.uuid.gsub("-", "")
  end
end