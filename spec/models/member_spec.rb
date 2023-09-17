require 'rails_helper'

RSpec.describe Member, type: :model do
  let(:discount) { 8.8 }
  let(:balance) { 100 }
  let(:recharge_amount) { 50 }
  let(:consumption_amount) { 88 }

  let!(:member) { create(:member, discount:, balance:, expires_at: 1.year.from_now) }
  let!(:expired_member) { create(:member, expires_at: 1.day.ago) }
  let!(:future_member) { create(:member, expires_at: 1.day.from_now) }
  let!(:unexpired_member) { create(:member, expires_at: nil) }

  let!(:old_total_recharge_amount) { member.total_recharge_amount }
  let!(:old_total_consumption_amount) { member.total_consumption_amount }
  let!(:old_total_savings_amount) { member.total_savings_amount }

  describe 'scopes' do
    describe '.sorted_by_expiry' do
      it 'returns members in the correct order' do
        sorted_members = Member.sorted_by_expiry.to_a
        expect(sorted_members).to eq([future_member, member, unexpired_member, expired_member])
      end
    end
  end

  describe '#savings' do
    it {
      expect(member.savings(88)).to eq 12
    }
  end

  describe '#recharge' do
    before do
      member.balance = member.balance + recharge_amount
    end

    it 'balances is 150' do
      member.save
      member.reload

      expect(member.balance).to eq(150)
    end

    it 'generations a recharge_member_order record' do
      member.save
      member.reload

      expect(member.recharge_member_orders.count).to eq(1)
    end

    it 'recharge_member_orders amount is recharge_amount' do
      member.save
      member.reload

      expect(member.recharge_member_orders.first.amount).to eq(recharge_amount)
    end

    it 'members total_recharge_amount is recharge_amount' do
      member.save
      member.reload

      expect(member.total_recharge_amount).to eq(old_total_recharge_amount + recharge_amount)
    end
  end

  describe '#consumption' do
    before do
      member.balance = member.balance - consumption_amount
    end

    it 'balances is 12' do
      member.save
      member.reload

      expect(member.balance).to eq(12)
    end

    it 'generations a consumption_member_order record' do
      member.save
      member.reload

      expect(member.consumption_member_orders.count).to eq(1)
    end

    it 'consumption_member_orders amount is consumption_amount' do
      member.save
      member.reload

      expect(member.consumption_member_orders.first.amount).to eq(consumption_amount)
    end

    it 'consumption_member_orders savings_amount is 12' do
      member.save
      member.reload

      expect(member.consumption_member_orders.first.savings_amount).to eq(12)
    end

    it 'members total_consumption_amount is consumption_amount' do
      member.save
      member.reload

      expect(member.total_consumption_amount).to eq(old_total_consumption_amount + consumption_amount)
    end

    it 'members total_savings_amount is savings_amount' do
      member.save
      member.reload

      expect(member.total_savings_amount).to eq(old_total_savings_amount + 12)
    end
  end

  describe 'force recharge' do
    before do
      member.force_income_or_expense = true
      member.balance = member.balance + recharge_amount
    end

    it 'balances is 150' do
      member.save
      member.reload

      expect(member.balance).to eq(150)
    end

    it 'generations a force_income_member_order record' do
      member.save
      member.reload

      expect(member.force_income_member_orders.count).to eq(1)
    end

    it 'force_income_member_orders amount is recharge_amount' do
      member.save
      member.reload

      expect(member.force_income_member_orders.first.amount).to eq(recharge_amount)
    end

    it 'members total_recharge_amount is no change' do
      member.save
      member.reload

      expect(member.total_recharge_amount).to eq(old_total_recharge_amount)
    end
  end

  describe '#force consumption' do
    before do
      member.force_income_or_expense = true
      member.balance = member.balance - consumption_amount
    end

    it 'balances is 12' do
      member.save
      member.reload

      expect(member.balance).to eq(12)
    end

    it 'generations a force_expense_member_order record' do
      member.save
      member.reload

      expect(member.force_expense_member_orders.count).to eq(1)
    end

    it 'force_expense_member_orders amount is consumption_amount' do
      member.save
      member.reload

      expect(member.force_expense_member_orders.first.amount).to eq(consumption_amount)
    end

    it 'force_expense_member_orders savings_amount is 0' do
      member.save
      member.reload

      expect(member.force_expense_member_orders.first.savings_amount).to eq(0)
    end

    it 'members total_consumption_amount is no change' do
      member.save
      member.reload

      expect(member.total_consumption_amount).to eq(old_total_consumption_amount)
    end

    it 'members total_savings_amount is no change' do
      member.save
      member.reload

      expect(member.total_savings_amount).to eq(old_total_savings_amount)
    end
  end
end
