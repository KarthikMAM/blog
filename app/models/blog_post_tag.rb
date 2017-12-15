# frozen_string_literal: true

class BlogPostTag < ApplicationRecord
  validates :tag_id,
            presence: true

  validates :blog_post_id,
            presence: true

  validates :tag_id,
            uniqueness: { scope: [:blog_post_id] }

  belongs_to :blog_post, touch: true
  belongs_to :tag
end
