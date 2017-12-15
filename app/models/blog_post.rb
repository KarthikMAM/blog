# frozen_string_literal: true

class BlogPost < ApplicationRecord
  validates :title,
            presence: true

  validates :content,
            presence: true

  validates :desc,
            length:   { maximum: 256 },
            presence: true

  def name
    title
  end

  def to_param
    title.parameterize
  end

  after_save do
    Slug['blog_posts', to_param] = id
  end

  has_many :blog_post_tags, dependent: :destroy
  default_scope -> { order(updated_at: :desc) }
end
