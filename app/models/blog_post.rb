class BlogPost < ApplicationRecord
  validates :title,
            presence: true

  validates :content,
            presence: true

  validates :desc,
            length: {maximum: 256},
            presence: true

  has_many :blog_post_tags, dependent: :destroy
  default_scope -> { order(created_at: :desc) }
end
