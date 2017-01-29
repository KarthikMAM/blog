class ProjectTag < ApplicationRecord
  validates :project_id,
            presence: true

  validates :tag_id,
            presence: true

  validates_uniqueness_of :tag_id,
                          scope: [:project_id]

  belongs_to :project, touch: true
  belongs_to :tag
end
