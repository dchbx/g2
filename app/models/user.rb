class User
  include Mongoid::Document
  include Mongoid::Timestamps

  devise :database_authenticatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  field :email, type: String
  field :encrypted_password, type: String
  
  index({:email => 1})

  def self.primary_key
    :_id
  end

  def jwt_payload
    {
      email: email
    }
  end
end