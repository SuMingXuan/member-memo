class MembersController < ApplicationController
  def index
    @members = current_user.members.sorted_by_expiry
  end
end
