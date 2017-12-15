# frozen_string_literal: true

require 'test_helper'

class TagTest < ActiveSupport::TestCase
  def setup
    @tag = Tag.new(name: 'hello')
  end

  test 'tag should not exceed 32 chars' do
    @tag.name = 'a' * 33
    assert_not @tag.valid?

    @tag.name = 'a' * 32
    assert @tag.valid?
  end

  test 'tag should not have duplicates' do
    @tag_dup = @tag.dup
    @tag.save
    @tag_dup.name = @tag_dup.name.upcase
    assert_not @tag_dup.valid?
  end

  test 'tag should be present' do
    @tag.name = ''
    assert_not @tag.valid?
  end
end
