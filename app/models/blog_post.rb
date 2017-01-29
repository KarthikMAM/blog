class BlogPost < ApplicationRecord
  def to_param
    title.parameterize
  end

  validates :title,
            presence: true

  validates :content,
            presence: true

  validates :desc,
            length: {maximum: 256},
            presence: true

  def name
    title
  end

  has_many :blog_post_tags, dependent: :destroy
  default_scope -> { order(updated_at: :desc) }
end
