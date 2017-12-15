# frozen_string_literal: true

class Tag < ApplicationRecord
  validates :name,
            presence:   true,
            uniqueness: { case_sensitive: false },
            length:     { maximum: 32 }

  before_save do
    self.name = name.strip.downcase
  end

  has_many :project_tags, dependent: :destroy
  has_many :blog_post_tags, dependent: :destroy
end
