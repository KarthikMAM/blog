class BlogPostTag < ApplicationRecord
  validates :tag_id,
            presence: true

  validates :blog_post_id,
            presence: true

  validates_uniqueness_of :tag_id,
                          scope: [:blog_post_id]

  belongs_to :blog_post, touch: true
  belongs_to :tag
end
