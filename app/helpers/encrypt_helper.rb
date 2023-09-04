module EncryptHelper
  def encrypt_phone_number(phone_number)
    return unless phone_number.match?(/\A\d{11}\z/)

    prefix = phone_number[0..2]
    suffix = phone_number[7..10]

    encrypted_middle = '****'

    "#{prefix}#{encrypted_middle}#{suffix}"
  end
end
