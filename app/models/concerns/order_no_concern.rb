module OrderNoConcern
  extend ActiveSupport::Concern

  included do
    before_create :set_order_no

    private

    def set_order_no
      self.order_no ||= begin
        payment_method_str = payment_method_before_type_cast.to_s.ljust(2, '0')
        payment_scene_str = payment_scene_before_type_cast.to_s.ljust(2, '0')
        user_str = user_id.to_s.ljust(7, '0')
        product_str = product_id.to_s.ljust(3, '0')
        timestamp_str = Time.current.to_i.to_s
        payment_method_str + payment_scene_str + user_str + product_str + timestamp_str
      end
    end
  end
end
