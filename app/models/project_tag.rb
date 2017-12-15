# frozen_string_literal: true

class ProjectTag < ApplicationRecord
  validates :project_id,
            presence: true

  validates :tag_id,
            presence: true

  validates :tag_id,
            uniqueness: { scope: [:project_id] }

  belongs_to :project, touch: true
  belongs_to :tag
end
